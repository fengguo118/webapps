function StudentQueryController($scope, $http, Pagination,$timeout, $injector){

  $injector.invoke(BasicController, this, {$scope: $scope});

  $scope.editView ="views/query/studentQuery/edit.html"
  $scope.topNaviBar ="views/query/studentQuery/naviBar.html"
  $scope.pagination = Pagination;

  $scope.profileFields = [
    {name: "name", title: "课程名",creatable:true,required:true}
    , {name: "teacherName", title: "任课老师",readonly:true}
    , {name: "attendRate", title: "出勤率",readonly:true}
    , {name: "sickLeaveRate", title: "病假率",readonly:true}
    , {name: "affairLeaveRate", title: "事假率",readonly:true}
    , {name: "outOfClassRate", title: "旷课率",readonly:true}
    , {name: "earlyLeaveRate", title: "早退率",readonly:true}
    , {name: "lateRate", title: "迟到率",readonly:true}
  ]

  $scope.entities = [
    {
      name : 'aaa' ,
      teacherName : 'ssad',
      attendRate : 'sss',
      sickLeaveRate : 'as ',
      affairLeaveRate : 'sssss',
      outOfClassRate : 'rrr',
      earlyLeaveRate : 'rrr',
      lateRate : '234'
    }
  ];

  $scope.initSelf = function() {
    //当前查询列表的自定义页面
    $scope.activeView = "views/query/studentQuery/queryPage.html"
    $scope.pagination.iPage = 1

    $scope.fields = $scope.profileFields.filter(function(field){
      return !field.unlist
    })
    //TO-DO查询初始化
  }


  $scope.queryOne = function(entity){
    //TO-DO根据查询条件查询
    console.log(entity)

    $scope.activeView = "views/query/studentQuery/edit.html"
  }

  $scope.cancel = function(){
    $scope.initSelf();
  }

}

function AllCourseController($scope, $http, Pagination,$timeout, $injector){

  $injector.invoke(BasicController, this, {$scope: $scope});

  $scope.editView ="views/query/allCourse/edit.html"
  $scope.topNaviBar ="views/query/allCourse/naviBar.html"
  $scope.pagination = Pagination;

  $scope.profileFields = [
    {name: "name", title: "课程名",creatable:true,required:true}
    , {name: "teacherName", title: "任课老师",readonly:true}
    , {name: "attendRate", title: "出勤率",readonly:true}
    , {name: "sickLeaveRate", title: "病假率",readonly:true}
    , {name: "affairLeaveRate", title: "事假率",readonly:true}
    , {name: "outOfClassRate", title: "旷课率",readonly:true}
    , {name: "earlyLeaveRate", title: "早退率",readonly:true}
    , {name: "lateRate", title: "迟到率",readonly:true}
  ]

  $scope.teacherFields = [
    {name: "name", title: "课程名",creatable:true,required:true}
    , {name: "teacherName", title: "任课老师",readonly:true}
    , {name: "attendRate", title: "出勤率",readonly:true}
    , {name: "sickLeaveRate", title: "病假率",readonly:true}
    , {name: "affairLeaveRate", title: "事假率",readonly:true}
    , {name: "outOfClassRate", title: "旷课率",readonly:true}
    , {name: "earlyLeaveRate", title: "早退率",readonly:true}
    , {name: "lateRate", title: "迟到率",readonly:true}
  ]

  $scope.entities = [
    {
      name : 'aaa' ,
      teacherName : 'ssad',
      attendRate : 'sss',
      sickLeaveRate : 'as ',
      affairLeaveRate : 'sssss',
      outOfClassRate : 'rrr',
      earlyLeaveRate : 'rrr',
      lateRate : '234'
    }
  ];

  $scope.teacherEntities = [
    {
      name : '老师' ,
      teacherName : 'ssad',
      attendRate : 'sss',
      sickLeaveRate : 'as ',
      affairLeaveRate : 'sssss',
      outOfClassRate : 'rrr',
      earlyLeaveRate : 'rrr',
      lateRate : '234'
    }
  ];

  $scope.initSelf = function() {
    //当前查询列表的自定义页面
    $scope.activeView = "views/query/allCourse/queryPage.html"
    $scope.pagination.iPage = 1

    $scope.fields = $scope.profileFields.filter(function(field){
      return !field.unlist
    })
    //TO-DO查询初始化
  }

  $scope.initTeacherSelf = function(){

    $scope.fields = $scope.teacherFields.filter(function(field){
      return !field.unlist
    })
  }

  $scope.queryItems= function(allCourseConditions) {
    //TO-DO根据查询条件查询
    console.log(allCourseConditions)



    //$scope.activeView = "views/query/studentQuery/edit.html"
  }

  $scope.queryOne = function(entity){
    console.log(entity)

    $scope.activeView = "views/query/allCourse/edit.html"
  }

  $scope.queryOneTeacher = function(oneCondition){
    console.log(oneCondition)
  }

  $scope.cancel = function(){
    $scope.initSelf();
  }

}




function CounsellorQueryController($scope, $http, Pagination,$timeout, $injector){

  $injector.invoke(BasicController, this, {$scope: $scope});

  $scope.editView ="views/query/counsellorQuery/edit.html"
  $scope.topNaviBar ="views/query/counsellorQuery/naviBar.html"
  $scope.pagination = Pagination;

  $scope.profileFields = [
    {name: "name", title: "课程名",creatable:true,required:true}
    , {name: "teacherName", title: "任课老师",readonly:true}
    , {name: "attendRate", title: "出勤率",readonly:true}
    , {name: "sickLeaveRate", title: "病假率",readonly:true}
    , {name: "affairLeaveRate", title: "事假率",readonly:true}
    , {name: "outOfClassRate", title: "旷课率",readonly:true}
    , {name: "earlyLeaveRate", title: "早退率",readonly:true}
    , {name: "lateRate", title: "迟到率",readonly:true}
  ]

  $scope.entities = [
    {
      name : 'aaa' ,
      teacherName : 'ssad',
      attendRate : 'sss',
      sickLeaveRate : 'as ',
      affairLeaveRate : 'sssss',
      outOfClassRate : 'rrr',
      earlyLeaveRate : 'rrr',
      lateRate : '234'
    }
  ];

  $scope.initSelf = function() {
    //当前查询列表的自定义页面
    $scope.activeView = "views/query/counsellorQuery/queryPage.html"
    $scope.pagination.iPage = 1

    $scope.fields = $scope.profileFields.filter(function(field){
      return !field.unlist
    })
    //TO-DO查询初始化
  }


  $scope.queryOneCounsellor = function(entity){
    //TO-DO根据查询条件查询
    console.log(entity)

//    $scope.activeView = "views/query/studentQuery/edit.html"
  }

  $scope.cancel = function(){
    $scope.initSelf();
  }

}
