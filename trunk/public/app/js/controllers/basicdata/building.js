function BuildingController($scope, Building,Campus, Pagination, $timeout, $injector){
  $injector.invoke(BasicController, this, {$scope: $scope});

  $scope.resource = Building
  $scope.editView ="views/basicdata/building/edit.html"
  $scope.topNaviBar ="views/basicdata/building/naviBar.html"
  $scope.isQuery = false
  $scope.isManage = true
  $scope.itemName = '教学楼'
  $scope.selfPagination = Pagination;
  $scope.campuses = {};

  $scope.condition = {
    campus: ''
  }

  Campus.getAll(function(result){
    console.log('ClassroomController Campus result:', result)
    $scope.campuses = result.entities;
  })

  Campus.getAll(function(result){
    $scope.options = {
      campuses : result.entities
    }
  })

  $scope.$watch('condition.campus', function(){
    $scope.selfPagination.iPage = 1;
    $scope.querySchedule();
  });

  $scope.$watch('selfPagination.iLength', function(){
    $scope.querySchedule();
  });
  $scope.$watch('selfPagination.iPage', function() {
    $scope.querySchedule();
  });

  $scope.initSelf = function() {
    $scope.activeView = "views/basicdata/building/page.html";
    $scope.selfPagination.iPage = 1;
    $scope.fields = $scope.profileFields.filter(function(field){
      return !field.unlist;
    });
    $scope.refreshSelf();
  };


  $scope.querySchedule = function(){
    $scope.activeView = "views/basicdata/building/page.html";
    var params = {};
    if(!$scope.condition.campus){//校区为空，则加载所有教室
      console.log('校区为空，则加载所有教室');
      $scope.refreshSelf();
    }else{
      if(!$scope.condition.building){//校区不为空，教学楼为空，则根据校区，加载所有教室
        console.log('校区不为空，则根据校区，加载所有教室');
        params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength,campusID : $scope.condition.campus.id};
        console.log('params:',params);
        Building.getByCampus(params, function(result){
          console.log('refresh result:', result);
          $scope.entities = result.entities;
          $scope.selfPagination.paginate(result.total);
        });
      }
    }
  }

  $scope.refreshSelf = function(){
    var params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength};
    Building.get(params, function(result){
      console.log('refresh result:', result);
      $scope.entities = result.entities;
      $scope.pagination.paginate(result.total);
    });
  }

  // profile
  $scope.profileFields = [
    {name: "name", title: "名称", creatable:true,required:true}
    , {name: "campusName", title: "所属校区",readonly:true}
  ]
}