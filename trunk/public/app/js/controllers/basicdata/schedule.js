function ScheduleController($scope, Schedule,Campus, Pagination, $timeout, $injector){
  $injector.invoke(BasicController, this, {$scope: $scope});

  $scope.resource = Schedule
  $scope.editView ="views/basicdata/schedule/edit.html"
  $scope.topNaviBar ="views/basicdata/schedule/naviBar.html"
  $scope.isQuery = false
  $scope.isManage = true
  $scope.itemName = '作息表'
  $scope.campuses = ''
  $scope.selfPagination = Pagination;

  $scope.condition = {
    campus : '' ,
    season : ''
  };

  $scope.entity = {}
  $scope.options = {
    campuses : {},
    seasones :  [
      {
        code : 0 ,
        name : '夏令'
      },
      {
        code : 1 ,
        name : '冬令'
      }
    ]
  }

  Campus.getAll(function(result){
    console.log('ScheduleController campuses result:', result)
    $scope.options.campuses = result.entities
    $scope.campuses = result.entities
  })

  $scope.$watch('condition.campus', function() {
    $scope.querySchedule();
  });

  $scope.$watch('condition.season', function() {
    $scope.querySchedule();
  });


  // profile
  $scope.profileFields = [
    {name: "serial_number", title: "序号", creatable:true,required:true}
    , {name: "name", title: "名称",creatable:true,required:true}
    , {name: "start", title: "开始时间",readonly:true}
    , {name: "end", title: "结束时间",readonly:true}
//    , {name: "seasonName", title: "时令",readonly:true}
    , {name: "campusName", title: "校区",readonly:true}
  ]

  $scope.$watch('selfPagination.iLength', function(){
    $scope.querySchedule();
  });
  $scope.$watch('selfPagination.iPage', function() {
    $scope.querySchedule();
  });

  $scope.refreshSelf = function(){
    var params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength};
    Schedule.get(params, function(result){
      console.log('refresh result:', result);
      $scope.entities = result.entities;
      $scope.pagination.paginate(result.total);
    });
  }

  $scope.initSelf = function() {
    $scope.activeView = "views/basicdata/schedule/page.html";
    $scope.selfPagination.iPage = 1;
    $scope.fields = $scope.profileFields.filter(function(field){
      return !field.unlist;
    });
    $scope.refreshSelf();
  };

  $scope.querySchedule = function(){
    $scope.activeView = "views/basicdata/schedule/page.html";
    console.log('@@@@@@condition:',$scope.condition);
//    $scope.refreshSelf();
    var params;

    //校区和时令都为空，则加载所有的作息表
    if(!$scope.condition.campus && !$scope.condition.season){
      $scope.refreshSelf();
    }

    //校区为空,时令不为空，则根据时令加载所有的作息表
    if(!$scope.condition.campus && !!$scope.condition.season){

      params = {
        page:$scope.selfPagination.iPage,
        limit:$scope.selfPagination.iLength,
        season : $scope.condition.season
      };

      Schedule.getBySeason(params, function(result){
        console.log('refresh result:', result);
        $scope.entities = result.entities;
        $scope.pagination.paginate(result.total);
      });

    }

    //校区不为空,时令为空，则根据校区加载所有的作息表
    if(!!$scope.condition.campus && !$scope.condition.season){
      params = {
        page:$scope.selfPagination.iPage,
        limit:$scope.selfPagination.iLength,
        campusID : $scope.condition.campus.id
      };
      console.log("params:",params)
      Schedule.getByCampus(params, function(result){
        console.log('refresh result:', result);
        $scope.entities = result.entities;
        $scope.pagination.paginate(result.total);
      });
    }

    //校区不为空,时令不为空，则根据校区和时令加载所有的作息表
    if(!!$scope.condition.campus && !!$scope.condition.season){
      params = {
        page:$scope.selfPagination.iPage,
        limit:$scope.selfPagination.iLength,
        season : $scope.condition.season ,
        campusID : $scope.condition.campus.id
      };

      Schedule.getByCampusAndSeason(params, function(result){
        console.log('refresh result:', result);
        $scope.entities = result.entities;
        $scope.pagination.paginate(result.total);
      });
    }
  }
}