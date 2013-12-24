function ScheduleQueryController($scope, $http, Campus, Schedule, $timeout, $injector) {
  $injector.invoke(BasicController, this, {$scope: $scope});
  $scope.topNaviBar = "views/basicdata/scheduleQuery/naviBar.html";
  $scope.campuses = {};
  $scope.summers = [];
  $scope.winters = [];
  $scope.condition = {
    campus: ''
  };

  $scope.$watch('condition.campus', function(){
    $scope.queryAttendData();
  });

  Campus.getAll(function (result) {
    console.log('CourseScheduleQueryController Campus result:', result);
    $scope.campuses = result.entities;
  });

  $scope.queryAttendData = function () {
//    console.log(condition);
    if (!$scope.condition.campus) {
//      alert("请选择校区进行查询！");
      $scope.summers = [];
      $scope.winters = [];
      return;
    } else {
      var param = {
        campusID: $scope.condition.campus.id
      };
      Schedule.getAllByCampusID(param, function (result) {
        console.log('CourseScheduleQueryController Schedule result:', result);
        $scope.summers = result.summers;
        $scope.winters = result.winters;
        console.log('$scope.summers:', $scope.summers);
        console.log('$scope.winters:', $scope.winters);
      });
    }
  };
  $scope.initSelf = function () {
    $scope.activeView = "views/basicdata/scheduleQuery/scheduleQueryPage.html";
    $scope.pagination.iPage = 1;
    $scope.fields = $scope.profileFields.filter(function (field) {
      return !field.unlist;
    });
  }
}