function StudentQueryController($scope, $http,College, Teacher,Student,AttendRecord,$rootScope,$timeout, $injector){
  $injector.invoke(BasicController, this, {$scope: $scope});
  $scope.dateBing = '';
  $scope.itemName = '学生';
  var studentID = '';
  $scope.date = {
      dateBing : ''
  }
  $scope.search = {
    date : ''
  }

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


  $scope.initSelf = function() {
    $scope.activeView = "views/query/studentQuery/oneStudentQuery.html";
//    $scope.pagination.iPage = 1
    $scope.fields = $scope.profileFields.filter(function(field){
      return !field.unlist
    });
    loadData();
  }

//  AttendRecord


  $scope.queryOne = function (entity) {
    console.log(entity);
    $scope.activeView = "views/query/studentQuery/oneCourseDetial.html";

    var params = {
      courseID : entity.courseID,
      studentID : studentID
    };
    console.log("params:",params);

    AttendRecord.getCourseRecordDetailInStudentView(params, function(result){
      console.log('refresh result:', result);
      $scope.courseRateDetails = result.courseRateDetails;
      console.log('refresh  $scope.encourseRateDetailstities:',  $scope.courseRateDetails);
    });

  }

      $scope.courseRateDetails = [
      {
        date: '2013-10-02',
        statusName: '迟到'
      }
      ,
      {
        date: '2013-10-03',
        statusName: '早退'
      }
    ]

    $scope.entities = [
    {
      courseID : 'adssads',
      courseName: '大学语文',
      shouldAttend: '2',
      realAttend: '3',
      sickLeave: '3',
      affairLeave: '1',
      outOfClass: '2',
      late: '3',
      earlyLeave: '1'
    }
  ];

  $scope.cancel = function () {
    $scope.initSelf();
  }

  function loadData(){
//    studentID: "b5936d30-3ae0-11e3-aaee-3b4b9b50b3df"

    Student.getStudentIDByUserID({id : $rootScope.uuser.id },function(id){

      console.log("studentID:",id.studentID);
      studentID = id.studentID;
      var params = {studentID : id.studentID };
      console.log("params:",params)
      AttendRecord.getByStudentID(params, function(result){
        console.log('refresh result:', result);
        $scope.entities = result.entities;
//                  $scope.selfPagination.paginate(result.total);
        console.log('refresh  $scope.entities:',  $scope.entities);
      })

    });
  }

//  $scope.open = function() {
//    $timeout(function() {
//      $scope.opened = true;
//    });
//  };

  $scope.$watch('date.dateBing', function () {
    console.log("dateBing:",$scope.date.dateBing)
    console.log("%%%%%%%%%%%%%%%%%%%:")
    if(!$scope.date.dateBing) return;
    $scope.search.date = getDateYMDFromSecond($scope.date.dateBing.getTime());
  });

  $scope.clearDate = function(){
    $scope.search.date = '';
    $scope.date.dateBing = '';
  }

  widthFunctions()
}