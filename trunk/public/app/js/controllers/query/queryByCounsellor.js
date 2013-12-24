function QueryByCounsellorController($scope, $http,College, Counsellor,AttendRecord,$timeout, $injector){
  $injector.invoke(BasicController, this, {$scope: $scope});

  $scope.topNaviBar ="views/query/schoolLeader/byCounsellor/naviBar.html"
  $scope.colleges = {};
  $scope.counsellores = {};
  $scope.profileFields = [
    {name: "counsellorName", title: "辅导员",readonly:true}
    , {name: "attendRate", title: "出勤率",readonly:true}
    , {name: "sickLeaveRate", title: "病假率",readonly:true}
    , {name: "affiarLeaveRate", title: "事假率",readonly:true}
    , {name: "outOfClassRate", title: "旷课率",readonly:true}
    , {name: "lateRate", title: "迟到率",readonly:true}
    , {name: "earlyLeaveRate", title: "早退率",readonly:true}
  ]

//  $scope.condition = {
//    college : '',
//    counsellor : ''
//  }
//
//  College.getAll(function(result){
//    console.log('CourseScheduleQueryController College result:', result)
//    $scope.colleges = result.entities;
//  });

//  $scope.$watch('condition.college', function(){
//    console.log('$watch');
//    try{
//      $scope.condition.Counsellor = null;
//      $scope.Counsellores = null;
//      $scope.condition.Counsellor = null;
//      if(!!$scope.condition.college){
//        var param = { collegeID : $scope.condition.college.id}
//        Counsellor.getAllByCollege(param,function(result){
//          console.log('CourseScheduleQueryController Counsellor result:', result)
//          $scope.counsellores = result.entities;
//        })
//      }
//    }catch(e){
//      console.log(e);
//      return;
//    }
//  });

//  $scope.queryAttendData = function(){
//    console.log($scope.condition)
//    if(!$scope.condition.college){
//      //如果学院为空，则加载所有辅导员负责的课程的考勤信息
//      AttendRecord.getQueryAllInCounsellorView( function(result){
//        console.log('refresh result:', result);
//        $scope.entities = result.entities;
////        $scope.selfPagination.paginate(result.total);
//      })
//    }else if(!$scope.condition.counsellor){
//      //在学院不为空的情况下，辅导员为空，则加载该学院下的所有辅导员负责的课程的考勤信息
//    }
//
//  }

  $scope.initSelf = function() {
    $scope.activeView = "views/query/schoolLeader/byCounsellor/byCounsellorQueryPage.html";
    $scope.pagination.iPage = 1
    $scope.fields = $scope.profileFields.filter(function(field){
      return !field.unlist
    });

    $scope.loadData();

  }

  $scope.loadData = function(){
    AttendRecord.getQueryAllInCounsellorView(function(result){

      console.log("loadData:",result);

      $scope.entities = result.entities;

    });
  }

}