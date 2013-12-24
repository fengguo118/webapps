function LeaveController($scope, Leave,Classes,Student,Pagination, $timeout, $injector){
  $injector.invoke(BasicController, this, {$scope: $scope});

  $scope.resource = Leave
  $scope.editView ="views/course/leave/edit.html"
  $scope.topNaviBar ="views/course/leave/naviBar.html"
  $scope.isQuery = false
  $scope.isManage = true
  $scope.itemName = '请假'
  $scope.entity = {}
  $scope.aheadDays = 0
  $scope.options = {
    classes : {},
    students : []
  }


  Leave.getLeaveAheadDays(function(result){
    console.log('LeaveController getLeaveAheadDays result:', result)
    $scope.aheadDays = Number(result.entities.days);
    console.log('$scope.aheadDays:', $scope.aheadDays)
  })

  var param = {counsellorID : $scope.uuser.id};
  console.log('param:',param)

  Classes.getAllByCounsellorID(param,function(result){
    console.log('LeaveController Classes result:', result)
    $scope.options.classes = result.entities
  })

//  Student.getAll(function(result){
//    console.log('LeaveController students result:', result)
//    $scope.options.students = result.entities
//  })

  $scope.$watch('entity.class_o', function(){
    $scope.entity.students = null
    if(!!$scope.entity.class_o){
      var param = { classID : $scope.entity.class_o.id }
      Student.getAllByClassID(param,function(result){
        $scope.options.students = result.entities
      })
    }else{
//      Student.getAll(function(result){
//        console.log('LeaveController Student result:', result)
//        $scope.options.students = result.entities
//      })
    }
  })
  // profile
  $scope.profileFields = [
    {name: "studentName", title: "学生",readonly:true}
    , {name: "typeName", title: "类型",readonly:true}
    , {name: "startDateTime", title: "开始时间",readonly:true}
    , {name: "endDateTime", title: "结束时间",readonly:true}
    , {name: "reason", title: "原因",readonly:true}
    , {name: "permitName", title: "批准人",readonly:true}
    , {name: "permitDate", title: "批准时间",readonly:true}
  ]
  $scope.now = new Date();

  $scope.validDate = function(){
    if(!$scope.entity.startDateTime) return;

    if(!$scope.entity.endDateTime){
      var startDate = getDay($scope.entity.startDateTime);
      var currentDate = getDay(getDateYMDFromSecond(new Date().getTime()));
      var differDay = startDate.getTime() - currentDate.getTime();
      differDay = differDay / (60 * 60 * 24 * 1000);

      if(differDay<0){
        alert("开始日期必须大于等于当前日期！");
        $scope.entity.startDateTime = null;
        return;
      }
      if(differDay < $scope.aheadDays){
        alert("必须提前"+$scope.aheadDays+"天请假！");
        $scope.entity.startDateTime = null;
        return;
      }
    }else{

      var startDate = getDay($scope.entity.startDateTime);
//      var endDate = getDay($scope.entity.endDateTime);
      var currentDate = getDay(getDateYMDFromSecond(new Date().getTime()));
      var differDay = startDate.getTime() - currentDate.getTime();
      differDay = differDay / (60 * 60 * 24 * 1000);

      if(differDay<0){
        alert("开始日期必须大于等于当前日期！");
        $scope.entity.startDateTime = null;
        return;
      }
      if(differDay < $scope.aheadDays){
        alert("必须提前"+$scope.aheadDays+"天请假！");
        $scope.entity.startDateTime = null;
        return;
      }

      var startTime = new Date($scope.entity.startDateTime).getTime();
      var endTime = new Date($scope.entity.endDateTime).getTime();

      if(startTime >= endTime){
        alert("结束时间必须大于开始时间！");
        $scope.entity.endDateTime = null;
        return;
      }
    }
  }

  $scope.$watch('entity.startDateTimeBing', function () {
    console.log("entity.startDateTimeBing:",$scope.entity.startDateTimeBing)
//    console.log("%%%%%%%%%%%%%%%%%%%:")
    if(!$scope.entity.startDateTimeBing) return;
    $scope.entity.startDateTime = getDateYMDHMSFromSecond($scope.entity.startDateTimeBing.getTime());

    $scope.validDate()

  });

  $scope.$watch('entity.endDateTimeBing', function () {
    console.log("entity.endDateTimeBing:",$scope.entity.endDateTimeBing)
//    console.log("%%%%%%%%%%%%%%%%%%%:")
    if(!$scope.entity.endDateTimeBing) return;
    $scope.entity.endDateTime = getDateYMDHMSFromSecond($scope.entity.endDateTimeBing.getTime());
    $scope.validDate()
  });

  function getDay(time){
    var date = time.substring(0,10) + " 00:00:00";
    return new Date(date);
  }
}