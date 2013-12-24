function CollegeLeaderController($scope, CollegeLeader,College, Pagination, $timeout, $rootScope,$injector){
  $injector.invoke(BasicController, this, {$scope: $scope});

  $scope.resource = CollegeLeader;
  $scope.editView ="views/basicdata/collegeLeader/edit.html";
  $scope.topEditView ="views/basicdata/topEditView.html";
  $scope.topNaviBar ="views/basicdata/collegeLeader/naviBar.html";
  $scope.isQuery = false;
  $scope.isManage = true;
  $scope.itemName = '学院领导';
  $scope.options = {};
  $scope.condition = {college : ''};
  $scope.selfPagination = Pagination;
  $scope.selfPagination = Pagination;
  $scope.colleges = {};

  College.getAll(function(result){
    console.log('CollegeLeaderController result:', result)
    $scope.colleges = result.entities;
    $scope.options = {
      departments : result.entities
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
    CollegeLeader.get(params, function(result){
      console.log('refresh result:', result);
      $scope.entities = result.entities;
      $scope.pagination.paginate(result.total);
    });
  }

  $scope.initSelf = function() {
    $scope.activeView = "views/basicdata/CollegeLeader/page.html";
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
    $scope.activeView = "views/basicdata/collegeLeader/page.html";
    console.log('condition:',$scope.condition);
    if(!!$scope.condition.college){
      var params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength,collegeID : $scope.condition.college.id};
      console.log('params:',params);
      CollegeLeader.getByCollege(params, function(result){
        console.log('refresh getByCollege result:', result);
        $scope.entities = result.entities;
        $scope.pagination.paginate(result.total);
      });
    }else{
      $scope.refreshSelf();
    }
  }

  // profile
  $scope.profileFields = [
    {name: "username", title: "用户名", readonly:true},
    {name: "emp_id", title: "工号", readonly:true},
    {name: "staffname", title: "姓名", creatable:true,required:true},
    {name: "phone", title: "手机号", creatable:true,required:true},
    {name: "departmentname", title: "学院",hide:true ,creatable:true}
  ]

  $scope.checkDuplication = function(callback){
    if(!$scope.entity.emp_id) return;
    CollegeLeader.checkDuplication({ emp_id : $scope.entity.emp_id,sid:$scope.entity.id},function(result){
      if(result.message === 'not exist'){
        $scope.Duplication = "";
        if(callback){
          callback();
        }
      }else{
        $scope.entity.emp_id = "";
        $scope.Duplication = "工号已存在！请重新输入。";
      }
    });
  }

  $scope.setPSNID = function(entity){
    $rootScope.psnID = entity.userid;
    console.log("entity.$rootScope.psnID:",$rootScope.psnID)
  }
}