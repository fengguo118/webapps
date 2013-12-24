function CourseScheduleController($scope, CourseSchedule,Course,Schedule,Classroom, Pagination, $timeout,$rootScope, $injector){
  $injector.invoke(BasicController, this, {$scope: $scope});

  $scope.resource = CourseSchedule
  $scope.editView ="views/course/courseSchedule/edit.html"
  $scope.topNaviBar ="views/course/courseSchedule/naviBar.html"
  $scope.isQuery = false
  $scope.isManage = true
  $scope.itemName = '课程表'
  $scope.entity = {}

  //系统配置的单双周


  $scope.options = {
    courses : {},
    schedules : {},
    classroomes : {},
    evenUsedCollectiones : [
      {
        name : '单周',
        code : 0
      },
      {
        name : '双周',
        code : 1
      }
    ],
    weekes : [
      {
        name : '周一',
        code : 1
      },{
        name : '周二',
        code : 2
      },{
        name : '周三',
        code : 3
      },{
        name : '周四',
        code : 4
      },{
        name : '周五',
        code : 5
      },{
        name : '周六',
        code : 6
      },{
        name : '周日',
        code : 7
      }
    ],
    statuses : [
      {
        name : '正常',
        code : 0
      },{
        name : '暂停',
        code : 1
      },{
        name : '撤销',
        code : 2
      },{
        name : '临时调整',
        code : 3
      }
    ]

  }

  CourseSchedule.getIsEvenUsed(function(result){

    console.log("@@@#@#@#@#@#@#@#@#@@@@@@result:", typeof result.entities)

    $rootScope.isEvenUsed = Number(result.entities)
  })

//  $scope.entity.evenUsed =  $scope.options.evenUsedCollectiones[0].code;

  Course.getAll(function(result){
    $scope.options.courses = result.entities
  })

  Schedule.getAll(function(result){
    $scope.options.schedules = result.entities
    console.log("$scope.options.schedules:",$scope.options.schedules);
  })

  Classroom.getAll(function(result){
    $scope.options.classroomes = result.entities
    console.log("$scope.options.classroomes:",$scope.options.classroomes);
  })
  // profile
  $scope.profileFields = [
    {name: "dayOfWeekName", title: "周几",readonly:true}
    , {name: "courseName", title: "课程",readonly:true}
    , {name: "teacherName", title: "老师",readonly:true}
    , {name: "classroomName", title: "教室",readonly:true}
    , {name: "evenUsedName", title: "单双周",readonly:true}
    , {name: "startTime", title: "开始",readonly:true}
    , {name: "endTime", title: "结束",readonly:true}
    , {name: "statusName", title: "状态",readonly:true}
  ]

//  $scope.$watch('entity.dayOfWeek', function(){
//
//    console.log("entity.dayOfWeek:",$scope.entity.dayOfWeek);
//
//  });
  $scope.$watch('entity.classroom', function(){

    console.log("entity.classroom:",$scope.entity.classroom);

  });

}