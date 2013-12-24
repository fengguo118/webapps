function ClassroomController($scope, Classroom,Building, Campus,Pagination, $timeout, $injector){
  $injector.invoke(BasicController, this, {$scope: $scope});

  $scope.resource = Classroom
  $scope.editView ="views/basicdata/classroom/edit.html"
  $scope.topNaviBar ="views/basicdata/classroom/naviBar.html"
  $scope.isQuery = false
  $scope.isManage = true
  $scope.itemName = '教室'
  $scope.selfPagination = Pagination;
  $scope.campuses = {};
  $scope.buildinges = {};

  $scope.condition = {
    building : '',
    campus: ''
  }

  Campus.getAll(function(result){
    console.log('ClassroomController Campus result:', result)
    $scope.campuses = result.entities;
  })

  Building.getAll(function(result){
    console.log('ClassroomController Building result:', result)
    $scope.options = {
      buildings : result.entities
    }
  })

  $scope.$watch('condition.campus', function(){
    try{
      $scope.condition.building = null;
      $scope.buildinges = [];

      if(!!$scope.condition.campus){
        var param = { campusID : $scope.condition.campus.id}
        Building.getAllByCampusID(param,function(result){
          $scope.buildinges = result.entities;
          console.log("$scope.buildinges:",$scope.buildinges);
        })
      }
      $scope.selfPagination.iPage = 1;
      $scope.querySchedule();
    }catch(e){
      return;
    }
  });


  $scope.$watch('selfPagination.iLength', function(){
    $scope.querySchedule();
  });
  $scope.$watch('selfPagination.iPage', function() {
    $scope.querySchedule();
  });

  $scope.$watch('condition.building', function(){
      $scope.selfPagination.iPage = 1;
      $scope.querySchedule();
  });

  $scope.querySchedule = function(){
    $scope.activeView = "views/basicdata/classroom/page.html";
    var params = {};
    if(!$scope.condition.campus){//校区为空，则加载所有教室
      console.log('校区为空，则加载所有教室');
      $scope.refreshSelf();
    }else{
      if(!$scope.condition.building){//校区不为空，教学楼为空，则根据校区，加载所有教室
        console.log('校区不为空，教学楼为空，则根据校区，加载所有教室');
        params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength,campusID : $scope.condition.campus.id};
        console.log('params:',params);
        Classroom.getByCampus(params, function(result){
          console.log('refresh result:', result);
          $scope.entities = result.entities;
          $scope.selfPagination.paginate(result.total);
        });
      }else{//校区不为空，教学楼不为空，则根据教学楼，加载所有教室
        console.log('校区不为空，教学楼不为空，则根据教学楼，加载所有教室');
        params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength,buildingID : $scope.condition.building.id};
        console.log('params:',params);
        Classroom.getByBuilding(params, function(result){
          console.log('refresh result:', result);
          $scope.entities = result.entities;
          $scope.selfPagination.paginate(result.total);
        });
      }
    }
  }
  // profile
  $scope.profileFields = [
    {name: "serial_number", title: "编号", creatable:true,required:true}
    , {name: "buildingName", title: "所属教学楼",readonly:true}
  ]

  $scope.initSelf = function() {
    $scope.activeView = "views/basicdata/classroom/page.html";
    $scope.selfPagination.iPage = 1;
    $scope.fields = $scope.profileFields.filter(function(field){
      return !field.unlist;
    });
    $scope.refreshSelf();
  };

  $scope.refreshSelf = function(){
    var params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength};
    Classroom.get(params, function(result){
      console.log('refresh result:', result);
      $scope.entities = result.entities;
      $scope.pagination.paginate(result.total);
    });
  }

}