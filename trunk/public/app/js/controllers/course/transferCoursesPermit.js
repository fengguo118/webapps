function TransferCoursesPermitController($scope, $http,TransferCourses,Course,Schedule,Classroom, Pagination, $timeout, $injector){
  $injector.invoke(BasicController, this, {$scope: $scope});

  $scope.resource = TransferCourses
  $scope.isQuery = false
  $scope.isManage = true
  $scope.itemName = '调课审批'
  $scope.entity = {}
  $scope.times = [];//空闲时间
  $scope.options = {
    courses : {},
    schedules : {},
    classroomes : {},
    dailySchedules : {}
  }

  $scope.$watch('entity.originDate', function(){
    $scope.entity.course = null;
    $scope.options.courses = null;
    if(!!$scope.entity.originDate){
      var param = { date : $scope.entity.originDate.getTime()}
      Course.getAllByWeekAndTeacherID(param,function(result){
        $scope.options.courses = result.entities
      })
    }
  });

  $scope.queryFreeTime = function(){
    var param = {
      date : $scope.entity.newDate.getTime() ,
      courseID :   $scope.entity.course.id
    }
    $http.get('/server/getFreeTime?date=' + $scope.entity.newDate.getTime() +'&courseID='+$scope.entity.course.id).success(function (results) {
      $scope.options.dailySchedules = results.entities;
    });
  }
  $scope.applyTransferCourse = function(entity){
    var startSerial = entity.start.serial_number;
    var endSerial = entity.end.serial_number;
    if((startSerial + 1) !== endSerial){
      alert("开始时间和结束时间不合法！");
      return;
    }
    var params = {
      courseID : entity.course.id,
      evenUsed : entity.course.even_used,
      start : entity.start.id,
      end : entity.end.id,
      classroomID : entity.course.classroom_id,
      destDate : entity.newDate.getTime(),
      srcDate : entity.originDate.getTime(),
      srcID : entity.course.scheduleID
    }
    TransferCourses.save(params,function(err,result){
      if(err){
        console.log(err)
      }else{
        console.log(result)
        $scope.cancelEdit();
      }
    });
    console.log('entity:',entity)
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

  $scope.initSelf = function() {
    $scope.activeView = "views/course/transferCoursesPermit/transferPage.html"
    $scope.pagination.iPage = 1
    $scope.fields = $scope.profileFields.filter(function(field){
      return !field.unlist
    })
  }

  $scope.pass = function(entity){
    console.log(entity)
    var param = {
      transferID : entity.id
    }
    TransferCourses.pass(param,function(err,result){
        console.log("通过成功！")
      refreshCurrent()
    })
  }

  $scope.refused = function(entity){
    var param = {
      transferID : entity.id
    }
    TransferCourses.refused(param,function(err,result){
      console.log("删除成功！")
      refreshCurrent()
    })
  }

  function refreshCurrent(){
    var p = $scope.pagination
    var params = {page:p.iPage, limit:p.iLength}
    if($scope.resource){
      $scope.resource.get(params, function(result){
        console.log('refresh result:', result)
        $scope.entities = result.entities
        $scope.pagination.paginate(result.total)
      })
    }
  }

}