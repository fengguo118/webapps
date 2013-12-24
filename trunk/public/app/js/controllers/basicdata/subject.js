function SubjectController($scope, Subject,College, Pagination, $timeout, $injector){
  $injector.invoke(BasicController, this, {$scope: $scope});

  $scope.resource = Subject;
  $scope.editView ="views/basicdata/subject/edit.html";
  $scope.topNaviBar ="views/basicdata/subject/naviBar.html";
  $scope.isQuery = false;
  $scope.isManage = true;
  $scope.itemName = '专业';
  $scope.selfPagination = Pagination;
  $scope.colleges = {};
  $scope.condition = {college : ''};
  
  
  console.log('SubjectController');

  College.getAll(function(result){
    console.log('SubjectController College result:', result);
    $scope.colleges = result.entities;
    $scope.options = {
      colleges : result.entities
    }
  })

  $scope.$watch('selfPagination.iLength', function(){
    $scope.querySchedule();
  });
  $scope.$watch('selfPagination.iPage', function() {
    $scope.querySchedule();
  });

  $scope.refreshSelf = function(){
    var params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength};
    Subject.get(params, function(result){
      console.log('refresh result:', result);
      $scope.entities = result.entities;
      $scope.pagination.paginate(result.total);
    });
  }

  $scope.initSelf = function() {
    $scope.activeView = "views/basicdata/Subject/page.html";
    $scope.selfPagination.iPage = 1;
    $scope.fields = $scope.profileFields.filter(function(field){
      return !field.unlist;
    });
    $scope.refreshSelf();
  };

  $scope.$watch('condition.college', function(){
    $scope.selfPagination.iPage = 1;
    $scope.querySchedule();
  });

  $scope.querySchedule = function(){
    $scope.activeView = "views/basicdata/subject/page.html";
    console.log('condition:',$scope.condition);
    if(!!$scope.condition.college){
      var params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength,collegeID : $scope.condition.college.id};
      console.log('params:',params);
      Subject.getByCollege(params, function(result){
        console.log('refresh result:', result);
        $scope.entities = result.entities;
        $scope.pagination.paginate(result.total);
      });
    }else{
      $scope.refreshSelf();
    }
  }
  
  
  // profile
  $scope.profileFields = [
    {name: "name", title: "名称", creatable:true,required:true}
    , {name: "departName", title: "学院",readonly:true}
    , {name: "code", title: "代号",creatable:true,required:true}
    , {name: "years", title: "年制",readonly:true}
  ];

}