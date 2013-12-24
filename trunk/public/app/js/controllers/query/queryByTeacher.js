function QueryByTeacherController($scope, $http,College, Teacher,AttendRecord,$timeout, $injector){
  $injector.invoke(BasicController, this, {$scope: $scope});

  $scope.topNaviBar ="views/query/schoolLeader/byTeacher/naviBar.html"
  $scope.colleges = {};
  $scope.teacheres = {};
  $scope.profileFields = [
    {name: "courseName", title: "课程名称",readonly:true}
    , {name: "attendRate", title: "出勤率",readonly:true}
    , {name: "sickLeaveRate", title: "病假率",readonly:true}
    , {name: "affiarLeaveRate", title: "事假率",readonly:true}
    , {name: "outOfClassRate", title: "旷课率",readonly:true}
    , {name: "lateRate", title: "迟到率",readonly:true}
    , {name: "earlyLeaveRate", title: "早退率",readonly:true}
  ]

  $scope.condition = {
    college : '',
    teacher : ''
  }

  College.getAll(function(result){
    console.log('CourseScheduleQueryController College result:', result)
    $scope.colleges = result.entities;
  });

  $scope.$watch('condition.college', function(){
    console.log('$watch');
    try{
      $scope.condition.teacher = null;
      $scope.teacheres = null;
      $scope.condition.teacher = null;
      if(!!$scope.condition.college){
        var param = { collegeID : $scope.condition.college.id}
        console.log('param：',param)
        Teacher.getAllByCollege(param,function(result){
          console.log('CourseScheduleQueryController Teacher result:', result)
          $scope.teacheres = result.entities;
        })
      }

      $scope.queryAttendData();

    }catch(e){
      console.log(e);
      return;
    }
  });

  $scope.$watch('condition.teacher', function(){
    $scope.queryAttendData();
  });

  $scope.queryAttendData = function(){
    console.log($scope.condition)
    if(!$scope.condition.college){
      //如果学院为空，则加载所有老师负责的课程的考勤信息
      AttendRecord.getQueryAll( function(result){
        console.log('refresh result:', result);
        $scope.entities = result.entities;
//        $scope.selfPagination.paginate(result.total);
      })

    }else if(!$scope.condition.teacher){
      //在学院不为空的情况下，老师为空，则加载该学院下的所有老师负责的课程的考勤信息

      var params = {collegeID : $scope.condition.college.id};
      AttendRecord.getByCollegeID(params, function(result){
        console.log('refresh result:', result);
        $scope.entities = result.entities;
//          $scope.selfPagination.paginate(result.total);
      })

    }else{
      //在老师不为空的情况下，加载该老师负责的课程的考勤信息

      var params = {teacherID : $scope.condition.teacher.id};
      AttendRecord.getByTeacherID(params, function(result){
        console.log('refresh result:', result);
        $scope.entities = result.entities;
//          $scope.selfPagination.paginate(result.total);
      })


    }
  }

  $scope.initSelf = function() {
    $scope.activeView = "views/query/schoolLeader/byTeacher/byTeacherQueryPage.html";
    $scope.pagination.iPage = 1
    $scope.fields = $scope.profileFields.filter(function(field){
      return !field.unlist
    });

    $scope.queryAttendData();

  }
}