function SchoolAllCourseController($scope, $http, Subject, College, Classes, $rootScope,Student,AttendRecord,Pagination, CourseSchedule, $timeout, $injector) {
  $injector.invoke(BasicController, this, {$scope: $scope});
  $injector.invoke(OneStudentQueryController, this, {$scope: $scope});
  $injector.invoke(AllCourseQueryPageController, this, {$scope: $scope});

    // 辅导员
    if ($rootScope.uuser.role == 3) {

        $scope.topNaviBar = "views/query/schoolLeader/allCourses/naviBar.html"
    }
    //教务处:注意教务处的role不在是数字
    if ($rootScope.uuser.role == "office") {
        $scope.topNaviBar = "views/query/schoolLeader/allCourses/naviBarForOffice.html"
    }


//  $scope.topNaviBar = "views/query/schoolLeader/allCourses/naviBar.html"
  $scope.colleges = {};
  $scope.subjectes = {};
  $scope.grades = [];
  $scope.classes = {};
  $scope.students = {};
  $scope.schdedule = {};
  $scope.changes = null;

  $scope.selfPagination = Pagination;

  $scope.condition = {
    college: '',
    subject: '',
    grade: '',
    class_o: '',
    student: ''
  }

    // 若是辅导员则根据其id获得对应的学院

    getColleageById();
    function getColleageById() {
        var role = $rootScope.uuser.role;
        if (role === 3) {
            var param = {
                id: $rootScope.uuser.id
            };
            CourseSchedule.getColleageForCounsellor(param, function (result) {
                $scope.colleges = result.colleage;
                $scope.condition.college = $scope.colleges[0];
            });

        } else {

            College.getAll(function (result) {
                $scope.colleges = result.entities;

            });

        }

    }

/*
  College.getAll(function (result) {
    console.log('CourseScheduleQueryController College result:', result)
    $scope.colleges = result.entities;
  });
*/


  $scope.$watch('condition.college', function () {
    try {
      $scope.condition.subject = null;
      $scope.subjectes = null;
      $scope.condition.grade = null;
      $scope.grades = null;
      $scope.condition.class_o = null;
      $scope.classes = null;
      $scope.condition.student = null;
      $scope.students = null;

      if (!!$scope.condition.college) {
        var param = { collegeID: $scope.condition.college.id}
        console.log('param：', param)
        Subject.getAllByCollegeID(param, function (result) {
          console.log('CourseScheduleQueryController Subject result:', result)
          $scope.subjectes = result.entities;
        })
      }

      $scope.queryAttendData($scope.condition);

    } catch (e) {
      return;
    }
  });

  $scope.$watch('condition.subject', function () {
    try {
      $scope.condition.grade = null;
      $scope.grades = [];
      $scope.condition.class_o = null;
      $scope.classes = null;
      $scope.condition.student = null;
      $scope.studentes = null;

      if (!!$scope.condition.subject) {
        var num = $scope.condition.subject.years;
        console.log('num:', num)
        for (var i = 0; i < num;) {
          $scope.grades.push(++i);
        }
      }

      $scope.queryAttendData($scope.condition);

    } catch (e) {
      return;
    }
  });

  $scope.$watch('condition.grade', function () {
    try {
      $scope.condition.class_o = null;
      $scope.classes = null;
      $scope.condition.student = null;
      $scope.studentes = null;
      if (!!$scope.condition.grade) {
        var param = {
          subjectID: $scope.condition.subject.id,
          grade: $scope.condition.grade
        };
        console.log('param：', param)
        Classes.getAllBySubjectIDAndGrade(param, function (result) {
          console.log('CourseScheduleQueryController Classes result:', result)
          $scope.classes = result.entities;
        })
      }
      $scope.queryAttendData($scope.condition);
    } catch (e) {
      return;
    }
  });

  $scope.$watch('condition.class_o', function () {
    try {
      $scope.condition.student = null;
      if (!!$scope.condition.class_o) {
        var param = {
          classID: $scope.condition.class_o.id
        };
        console.log('param：', param)
        Student.getAllByClassID(param, function (result) {
          console.log('CourseScheduleQueryController Student result:', result)
          $scope.students = result.entities;
        })
      }
      $scope.queryAttendData($scope.condition);
    } catch (e) {
      return;
    }
  });

  $scope.$watch('condition.student', function () {
    $scope.queryAttendData($scope.condition);
  });

  $scope.initSelf = function () {
    $scope.activeView = "views/query/schoolLeader/allCourses/allCourseQueryPage.html";
    console.log('#############');
  }

  $scope.queryAttendData = function(condition){
    var params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength};
    if(!condition.college){//学院为空，则加载所有
      console.log('学院为空，则加载所有');
      $scope.activeView = "views/query/schoolLeader/allCourses/allCourseQueryPage.html";
      AttendRecord.getQueryAll(params, function(result){
        console.log('refresh result:', result);
        $scope.entities = result.entities;
//        $scope.selfPagination.paginate(result.total);
      })
    }else{
      console.log('学院不为空')
      if(!condition.subject){//学院不为空，专业为空，则根据学院过滤
        console.log('学院不为空，专业为空，则根据学院过滤学生');
        $scope.activeView = "views/query/schoolLeader/allCourses/allCourseQueryPage.html";
        params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength,collegeID : condition.college.id};
        AttendRecord.getByCollegeID(params, function(result){
          console.log('refresh result:', result);
          $scope.entities = result.entities;
//          $scope.selfPagination.paginate(result.total);
        })
      }else{
        if(!condition.grade){//学院不为空，专业不为空，年级为空的，则根据专业过滤
          console.log('学院不为空，专业不为空，年级为空的，则根据专业过滤');
          $scope.activeView = "views/query/schoolLeader/allCourses/allCourseQueryPage.html";
          params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength,subjectID : condition.subject.id};
          console.log("params:",params)
          AttendRecord.getBySubjectID(params, function(result){
            console.log('refresh result:', result);
            $scope.entities = result.entities;
//            $scope.selfPagination.paginate(result.total);
          })
        }else{
          if(!condition.class_o){//学院不为空，专业不为空，年级不为空，班级为空，则根据专业和年级去过滤
            console.log('学院不为空，专业不为空，年级不为空，班级为空，则根据专业和年级去过滤');
            $scope.activeView = "views/query/schoolLeader/allCourses/allCourseQueryPage.html";
            params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength,subjectID : condition.subject.id,grade : condition.grade};
            console.log("params:",params)
            AttendRecord.getBySubjectIDAndGrade(params, function(result){
              console.log('refresh result:', result);
              $scope.entities = result.entities;
//              $scope.selfPagination.paginate(result.total);
            })
          }else{
            if(!condition.student){//学院不为空，专业不为空，年级不为空，班级不为空，则根据班级过滤
              console.log('学院不为空，专业不为空，年级不为空，班级不为空，则根据班级过滤');
              $scope.activeView = "views/query/schoolLeader/allCourses/allCourseQueryPage.html";
              params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength,classID : $scope.condition.class_o.id};
              console.log("params:",params)
              AttendRecord.getByClassID(params, function(result){
                console.log('refresh result:', result);
                $scope.entities = result.entities;
//                $scope.selfPagination.paginate(result.total);
              })
            }
            else{
              //学院不为空，专业不为空，年级不为空，班级不为空，，学生不为空，则根据学生去过滤
                console.log('学院不为空，专业不为空，年级不为空，班级不为空，学生不为空，则根据学生过滤');
                $scope.activeView = "views/query/schoolLeader/allCourses/oneStudentQuery.html";

                params = {page:$scope.selfPagination.iPage, limit:$scope.selfPagination.iLength,studentID : $scope.condition.student.id};
                console.log("params:",params)
                AttendRecord.getByStudentID(params, function(result){
                  console.log('refresh result:', result);
                  $scope.entities = result.entities;
//                  $scope.selfPagination.paginate(result.total);
                  console.log('refresh  $scope.entities:',  $scope.entities);
                })
            }
          }
        }
      }
    }
    console.log(" $scope.activeView:", $scope.activeView);
  }



  $scope.queryOne = function (entity) {
    console.log(entity);
    $scope.activeView = "views/query/schoolLeader/allCourses/oneCourseDetial.html";

    var params = {
      courseID : entity.courseID ,
      studentID : entity.studentID
    };
    console.log("params:",params);

    AttendRecord.getCourseRecordDetailInStudentView(params, function(result){
      console.log('refresh result:', result);
      $scope.courseRateDetails = result.courseRateDetails;
      console.log('refresh  $scope.encourseRateDetailstities:',  $scope.courseRateDetails);
    });
//    $scope.courseRateDetails = [
//      {
//        date: '2013-10-02',
//        statusName: '迟到'
//      }
//      ,
//      {
//        date: '2013-10-03',
//        statusName: '早退'
//      }
//    ]
  }

  $scope.cancel = function () {
    $scope.initSelfOneStudent();
  }

  widthFunctions()

}

function AllCourseQueryPageController($scope,$rootScope, $injector) {
//  $injector.invoke(SchoolAllCourseController, this, {$scope: $scope});



//  $scope.entities = [
//    { courseName: '大学语文',
//      attendRate: 0.0375,
//      outOfClassRate: 0.025,
//      lateRate: 0.0125,
//      earlyLeaveRate: 0,
//      sickLeaveRate: 0.0625,
//      affairLeaveRate: 0.075 },
//    { courseName: '高等数学',
//      attendRate: 0.0375,
//      outOfClassRate: 0.025,
//      lateRate: 0.0125,
//      earlyLeaveRate: 0,
//      sickLeaveRate: 0.0625,
//      affairLeaveRate: 0.075 },
//    { courseName: '大学英语',
//      attendRate: 0.0375,
//      outOfClassRate: 0.025,
//      lateRate: 0.0125,
//      earlyLeaveRate: 0,
//      sickLeaveRate: 0.0625,
//      affairLeaveRate: 0.075 }
//  ];

  if($rootScope.uuser.role === 'schoolLeader' ||$rootScope.uuser.role === 'office' ){
    $scope.profileFields = [
      {name: "courseName", title: "课程名称", readonly: true}
      ,
      {name: "teacherName", title: "任课老师", readonly: true}
      ,
      {name: "collegeName", title: "学院", readonly: true}
      ,
      {name: "attendRate", title: "出勤率", readonly: true}
      ,
      {name: "sickLeaveRate", title: "病假率", readonly: true}
      ,
      {name: "affiarLeaveRate", title: "事假率", readonly: true}
      ,
      {name: "outOfClassRate", title: "旷课率", readonly: true}
      ,
      {name: "lateRate", title: "迟到率", readonly: true}
      ,
      {name: "earlyLeaveRate", title: "早退率", readonly: true}
    ]
  }else{
    $scope.profileFields = [
      {name: "courseName", title: "课程名称", readonly: true}
      ,
      {name: "teacherName", title: "任课老师", readonly: true}
//      ,
//      {name: "collegeName", title: "学院", readonly: true}
      ,
      {name: "attendRate", title: "出勤率", readonly: true}
      ,
      {name: "sickLeaveRate", title: "病假率", readonly: true}
      ,
      {name: "affiarLeaveRate", title: "事假率", readonly: true}
      ,
      {name: "outOfClassRate", title: "旷课率", readonly: true}
      ,
      {name: "lateRate", title: "迟到率", readonly: true}
      ,
      {name: "earlyLeaveRate", title: "早退率", readonly: true}
    ]
  }



  $scope.initSelfAllCourse = function () {
    $scope.pagination.iPage = 1
    $scope.fields = $scope.profileFields.filter(function (field) {
      return !field.unlist
    });
    $scope.queryAttendData($scope.condition);
  }
}

function OneStudentQueryController($scope, $injector) {
//  $injector.invoke(SchoolAllCourseController, this, {$scope: $scope});
//  $injector.invoke(BasicController, this, {$scope: $scope});
  $scope.profileFields = [
    {name: "courseName", title: "课程名称", readonly: true}
    ,
    {name: "shouAttendNum", title: "应到", readonly: true}
    ,
    {name: "attendenceNum", title: "实到", readonly: true}
    ,
    {name: "sickLeaveNum", title: "病假", readonly: true}
    ,
    {name: "affiarLeaveNum", title: "事假", readonly: true}
    ,
    {name: "outOfClassNum", title: "旷课", readonly: true}
    ,
    {name: "lateNum", title: "迟到", readonly: true}
    ,
    {name: "earlyLeaveNum", title: "早退", readonly: true}
  ];

  $scope.statuses = ['出席', '旷课', '迟到', '早退', '病假', '事假'];

//  $scope.entities = [
//    {
//      courseName: '大学语文',
//      shouldAttend: '2',
//      realAttend: '3',
//      sickLeave: '3',
//      affairLeave: '1',
//      outOfClass: '2',
//      late: '3',
//      earlyLeave: '1'
//    }
//  ];

  $scope.initSelfOneStudent = function () {
//    $scope.activeView = "views/query/schoolLeader/allCourses/oneStudentQuery.html";
    $scope.pagination.iPage = 1;
    $scope.fields = $scope.profileFields.filter(function (field) {
      return !field.unlist;
    });

//    $scope.fields = $scope.profileFields.filter(function (field) {
//      return !field.unlist
//    });
    $scope.queryAttendData($scope.condition);

//    console.log(11111111111111111);

  }



//  $scope.courseRateDetails = [
//    {
//      date: '2013-10-02',
//      statusName: '迟到'
//    }
//    ,
//    {
//      date: '2013-10-03',
//      statusName: '早退'
//    }
//    ,
//    {
//      date: '2013-10-04',
//      statusName: '病假'
//    }
//    ,
//    {
//      date: '2013-10-05',
//      statusName: '事假'
//    }
//    ,
//    {
//      date: '2013-10-06',
//      statusName: '旷课'
//    }
//    ,
//    {
//      date: '2013-10-07',
//      statusName: '迟到'
//    }
//    ,
//    {
//      date: '2013-10-08',
//      statusName: '正常'
//    }
//    ,
//    {
//      date: '2013-10-09',
//      statusName: '迟到'
//    }
//  ]

}