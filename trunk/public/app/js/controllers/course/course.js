function CourseController($scope, Course,Teacher,College, Pagination, $timeout,Pagination, $injector){
  $injector.invoke(BasicController, this, {$scope: $scope});

  $scope.resource = Course
  $scope.editView ="views/course/course/edit.html"
  $scope.topNaviBar ="views/course/course/naviBar.html"
  $scope.isQuery = false
  $scope.isManage = true
  $scope.itemName = '课程'
  $scope.entity = {}
  $scope.selfPagination = Pagination;

  $scope.colleges = {};
  $scope.teacheres = {};

  $scope.condition = {
    college : '',
    teacher : ''
  }

  $scope.options = {
    teachers : {},
    colleges : {},
    types : [
      {
        code : 0,
        name : '公共必修课'
      },
      {
        code : 1,
        name : '公共任选课'
      },
      {
        code : 2,
        name : '专业必修课'
      },
      {
        code : 3,
        name : '专业选修课'
      }
    ] ,
    attendTypes : [
      {
        code : 0,
        name : '默认'
      },
      {
        code : 1,
        name : '全部'
      },
      {
        code : 2,
        name : '抽查'
      }
    ],
    statuses : [
      {
        code : 0,
        name : '正常'
      },
      {
        code : 1,
        name : '暂停'
      },
      {
        code : 2,
        name : '撤销'
      }
    ]
  }

  $scope.queryOptions = [
    {
      label : '学院',
      ngModelStr : 'entity.college',
      ngOptionsStr : 'college.name for college in options.colleges'
    },
    {
      label : '任课老师',
      ngModelStr : 'entity.teacher',
      ngOptionsStr : 'teacher.name for teacher in options.teachers'
    }
  ]


//  $scope.queryItems = function(){
//    if($scope.entity.teacher){
//      $scope.refreshList({teacherID : $scope.condition.teacher.id});
//    }else{
//      $scope.refreshList();
//    }
//  }

  College.getAll(function(result){
    console.log('ScheduleController college result:', result)
    $scope.options.colleges = result.entities
  })

  $scope.$watch('entity.college', function(){
    $scope.entity.teacher = null
    if(!!$scope.entity.college){
      var param = { collegeID : $scope.entity.college.id }
      Teacher.getAllByCollege(param,function(result){
        $scope.options.teachers = result.entities
      })
    }else{
      Teacher.getAll(function(result){
        $scope.options.teachers = result.entities
      })
    }
  })
  // profile
  $scope.profileFields = [
      {name: "name", title: "课程名",creatable:true,required:true}
    , {name: "typeName", title: "课程类型",readonly:true}
    , {name: "teacherName", title: "任课老师",readonly:true}
    , {name: "collegeName", title: "学院",readonly:true}
    , {name: "takeAttendTypeName", title: "上课考勤方式",readonly:true}
    , {name: "intervalAttendTypeName", title: "课间考勤方式",readonly:true}
    , {name: "dismissAttendTypeName", title: "下课考勤方式",readonly:true}
    , {name: "statusName", title: "状态",readonly:true}
  ]


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
      $scope.refreshList();
    }else if(!$scope.condition.teacher){
      //在学院不为空的情况下，老师为空，则加载该学院下的所有老师负责的课程的考勤信息
      var params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength,collegeID : $scope.condition.college.id};
      Course.getByCollegeID(params, function(result){
        console.log('refresh result:', result);
        $scope.entities = result.entities;
//          $scope.selfPagination.paginate(result.total);
      })
    }else{
      //在老师不为空的情况下，加载该老师负责的课程的考勤信息
      $scope.refreshList({teacherID : $scope.condition.teacher.id});
    }
  }

}