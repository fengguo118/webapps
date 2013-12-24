function TransferCoursesController($scope, $http, TransferCourses, Course, Schedule, Classroom, Pagination, $rootScope,$timeout, $injector) {
  $injector.invoke(BasicController, this, {$scope: $scope});

  $scope.resource = TransferCourses
  $scope.editView = "views/course/transferCourses/edit.html"
  $scope.topNaviBar = "views/course/transferCourses/naviBar.html"
  $scope.isQuery = false
  $scope.isManage = true
  $scope.itemName = '调课管理'
  $scope.entity = {}
  $scope.aheadDays = 0
  $scope.times = [];//空闲时间
  $scope.options = {
    courses: {},
    schedules: {},
    classroomes: {},
    dailySchedules: {}
  }

  TransferCourses.getTransferAheadDays(function(result){
    console.log('LeaveController getLeaveAheadDays result:', result)
    $scope.aheadDays = Number(result.entities.days);
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@$scope.aheadDays:', $scope.aheadDays)
  })


  $scope.$watch('entity.originDate', function () {
    if(!$scope.entity.originDate) return;
//    console.log("$scope.entity.originDate:",$scope.entity.originDate);
//    console.log("$scope.entity.originDate:",typeof $scope.entity.originDate);

    $scope.entity.originDateShow = getDateYMDFromSecond($scope.entity.originDate.getTime());

    //验证原日期大于当前日期而且符合提前请假规定
    var originDate = getDay($scope.entity.originDateShow);
    var currentDate = getDay(getDateYMDFromSecond(new Date().getTime()));
    var differDay = originDate.getTime() - currentDate.getTime();
    differDay = differDay / (60 * 60 * 24 * 1000);
    if(differDay<0){
      alert("开始日期必须大于等于当前日期！");
      $scope.entity.originDateShow = null;
      return;
    }
    if(differDay < $scope.aheadDays){
      alert("必须提前"+$scope.aheadDays+"天调课！");
      $scope.entity.originDateShow = null;
      return;
    }

    try {
      $scope.entity.course = null;
      $scope.options.courses = null;
      if (!!$scope.entity.originDate) {
        var param = { userID : $rootScope.uuser.id,date: $scope.entity.originDate.getTime()}
        console.log('param：', param)
        Course.getAllByWeekAndTeacherID(param, function (result) {
          console.log('getAllByWeekAndTeacherID Course result:', result)
          $scope.options.courses = result.entities
        })
      }
    } catch (e) {
      return;
    }
  });

  $scope.$watch('entity.newDate', function () {
    if(!$scope.entity.originDate) return;
    $scope.entity.newDateShow = getDateYMDFromSecond($scope.entity.newDate.getTime());

    //验证原日期大于当前日期而且符合提前请假规定
    var newDate = getDay($scope.entity.newDateShow);
    var currentDate = getDay(getDateYMDFromSecond(new Date().getTime()));
    var differDay = newDate.getTime() - currentDate.getTime();
    differDay = differDay / (60 * 60 * 24 * 1000);
    if(differDay<0){
      alert("新日期必须大于等于当前日期！");
      $scope.entity.newDateShow = null;
      return;
    }

  });

  $scope.queryFreeTime = function () {
    var param = {};
    try {
      param = {
        date: $scope.entity.newDate.getTime(),
        courseID: $scope.entity.course.id
      }
    } catch (e) {
      return;
    }

    $http.get('/server/getFreeTime?date=' + $scope.entity.newDate.getTime() + '&courseID=' + $scope.entity.course.id).success(function (results) {
      $scope.options.dailySchedules = results.entities;
    });

  }

  $scope.applyTransferCourse = function (entity) {
    var startSerial = entity.start.serial_number;
    var endSerial = entity.end.serial_number;
    console.log("startSerial:", startSerial, " sendSerial:", endSerial)
    if ((startSerial + 1) !== endSerial) {
      alert("开始时间和结束时间不合法！");
      return;
    }

    var params = {
      courseID: entity.course.id,
      evenUsed: entity.course.even_used,
      start: entity.start.id,
      end: entity.end.id,
      classroomID: entity.course.classroom_id,
      destDate: entity.newDate.getTime(),
      srcDate: entity.originDate.getTime(),
      srcID: entity.course.scheduleID
    }
    TransferCourses.save(params, function (err, result) {
      console.log('申请成功！');
      $scope.refreshCurrent();
      $scope.entity = {};
    });
  }
  // profile
  $scope.profileFields = [
    {name: "desDayOfWeekName", title: "周几", readonly: true},
    {name: "desCourseName", title: "课程", readonly: true},
    {name: "desTeacherName", title: "老师", readonly: true},
    {name: "desClassroomName", title: "教室", readonly: true},
    {name: "desStartTime", title: "开始", readonly: true},
    {name: "desEndTime", title: "结束", readonly: true},
    {name: "statusName", title: "状态", readonly: true},
    {name: "dayOfWeekName", title: "周几", readonly: true},
    {name: "courseName", title: "课程", readonly: true},
    {name: "teacherName", title: "老师", readonly: true},
    {name: "classroomName", title: "教室", readonly: true},
    {name: "startTime", title: "开始", readonly: true},
    {name: "endTime", title: "结束", readonly: true}]

  $scope.initSelf = function () {
    $scope.activeView = "views/course/transferCourses/transferPage.html"
    $scope.pagination.iPage = 1
    $scope.fields = $scope.profileFields.filter(function (field) {
      return !field.unlist
    });
    $scope.refreshCurrent();
  }

  $scope.refreshCurrent = function () {
    $scope.activeView = "views/course/transferCourses/transferPage.html"
    var p = $scope.pagination
    var params = {page: p.iPage, limit: p.iLength}
    console.log('refreshCurrent !!!! :,', params)
    TransferCourses.get(params, function (result) {
      console.log('refresh result:', result)
      $scope.entities = result.entities
      $scope.pagination.paginate(result.total)
    })
  }

  function getDay(time){
    var date = time.substring(0,10) + " 00:00:00";
    return new Date(date);
  }

}