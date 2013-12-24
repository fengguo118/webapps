function MainMenuController($scope,$rootScope,Pagination){

  var adminViews = [
		  {name:"基础数据", icon:"img/custom/icon_basic_data.png", path:"views/basicdata/index.html", submenus:[
					{name:"学生管理", icon:"", path:"views/basicdata/student/student.html"}
				,	{name:"老师管理", icon:"", path:"views/basicdata/teacher/teacher.html"}
				,	{name:"辅导员管理", icon:"", path:"views/basicdata/counsellor/counsellor.html"}
				,	{name:"教务处管理", icon:"", path:"views/basicdata/office/office.html"}
				,	{name:"学院领导管理", icon:"", path:"views/basicdata/collegeLeader/collegeLeader.html"}
				,	{name:"学校领导管理", icon:"", path:"views/basicdata/schoolLeader/schoolLeader.html"}
				,	{name:"学院管理", icon:"", path:"views/basicdata/college/college.html"}
//				,	{name:"系科管理", icon:"", path:"views/basicdata/subject.html"}
				,	{name:"专业管理", icon:"", path:"views/basicdata/subject/subject.html"}
//				,	{name:"年制管理", icon:"", path:"views/basicdata/year/year.html"}
				,	{name:"班级管理", icon:"", path:"views/basicdata/class/class.html"}
//				,	{name:"年级管理", icon:"", path:"views/basicdata/grade.html"}
				,	{name:"行政部门管理", icon:"", path:"views/basicdata/department/department.html"}
				,	{name:"教室管理", icon:"", path:"views/basicdata/classroom/classroom.html"}
				,	{name:"作息表管理", icon:"", path:"views/basicdata/schedule/schedule.html"}
				,	{name:"校区管理", icon:"", path:"views/basicdata/campus/campus.html"}
				,	{name:"教学楼管理", icon:"", path:"views/basicdata/building/building.html"}
				,	{name:"作息表查询", icon:"", path:"views/basicdata/scheduleQuery/index.html"}
			]}
    , {name:"课程", icon:"img/custom/icon_course.png", path:"views/course/index.html",submenus: [
        {name:"课程管理", icon:"", path:"views/course/course/course.html"}
      , {name:"课程表管理", icon:"", path:"views/course/courseSchedule/courseSchedule.html"}
//      , {name:"调课管理", icon:"", path:"views/course/transferCourses/transferCourses.html"}
//      , {name:"调课审批", icon:"", path:"views/course/transferCoursesPermit/transferCoursesPermit.html"}
//      , {name:"请假", icon:"", path:"views/course/leave/leave.html"}
      , {name:"查询课程表", icon:"", path:"views/course/courseScheduleQuery/courseScheduleQuery.html"}
      ]}
    , {name:"管理配置", icon:"img/custom/icon_manage_config.png", path:"views/course/index.html",submenus: [
      {name:"参数配置", icon:"", path:"views/manage/systemManage/manage.html"}
    ]}
	];

  var studentViews = [
    {name:"考勤数据查询", icon:"img/custom/icon_attend_data.png", path:"views/course/index.html",submenus: [
      {name:"学生查询", icon:"", path:"views/query/studentQuery/index.html"}
//      , {name:"所有课程查询", icon:"", path:"views/query/allCourse/allCourse.html"}
//      , {name:"辅导员负责学生查询", icon:"", path:"views/query/counsellorQuery/counsellorQuery.html"}
//      , {name:"所有课程统计", icon:"", path:"views/query/counsellorQuery/counsellorQuery.html"}
    ]}
  ];

  var teacherViews = [
    {name:"课程", icon:"img/custom/icon_course.png", path:"views/course/index.html",submenus: [
      {name:"调课管理", icon:"", path:"views/course/transferCourses/transferCourses.html"},
      {name:"查询课程表", icon:"", path:"views/course/courseScheduleQuery/courseScheduleQuery.html"}
    ]}
//    ,{name:"考勤数据查询", icon:"img/custom/icon_attend_data.png", path:"views/course/index.html",submenus: [
//      {name:"学生查询", icon:"", path:"views/query/studentQuery/studentQuery.html"}
//      , {name:"所有课程查询", icon:"", path:"views/query/allCourse/allCourse.html"}
//      , {name:"辅导员负责学生查询", icon:"", path:"views/query/counsellorQuery/counsellorQuery.html"}
////      , {name:"所有课程统计", icon:"", path:"views/query/counsellorQuery/counsellorQuery.html"}
//    ]}
  ];

  var counsellorViews = [
    {name:"课程", icon:"img/custom/icon_course.png", path:"views/course/index.html",submenus: [
      {name:"请假", icon:"", path:"views/course/leave/leave.html"}
    ]}
    ,{name:"考勤数据查询", icon:"img/custom/icon_attend_data.png", path:"views/course/index.html",submenus: [
      {name:"所有课程查询", icon:"", path:"views/query/schoolLeader/allCourses/index.html"}
//      {name:"学生查询", icon:"", path:"views/query/studentQuery/studentQuery.html"}
//      , {name:"所有课程查询", icon:"", path:"views/query/allCourse/allCourse.html"}
//      , {name:"辅导员负责学生查询", icon:"", path:"views/query/counsellorQuery/counsellorQuery.html"}
//      , {name:"所有课程统计", icon:"", path:"views/query/counsellorQuery/counsellorQuery.html"}
    ]}
  ];

  var officeViews = [
    {name:"课程", icon:"img/custom/icon_course.png", path:"views/course/index.html",submenus: [
      {name:"课程管理", icon:"", path:"views/course/course/course.html"}
      , {name:"课程表管理", icon:"", path:"views/course/courseSchedule/courseSchedule.html"}
//      , {name:"调课管理", icon:"", path:"views/course/transferCourses/transferCourses.html"}
      , {name:"调课审批", icon:"", path:"views/course/transferCoursesPermit/transferCoursesPermit.html"}
//      , {name:"请假", icon:"", path:"views/course/leave/leave.html"}
      , {name:"查询课程表", icon:"", path:"views/course/courseScheduleQuery/courseScheduleQuery.html"}
    ]}
    ,{name:"考勤数据查询", icon:"img/custom/icon_attend_data.png", path:"views/course/index.html",submenus: [
      {name:"所有课程查询", icon:"", path:"views/query/schoolLeader/allCourses/index.html"}
      , {name:"按老师查询", icon:"", path:"views/query/schoolLeader/byTeacher/index.html"}
      , {name:"按辅导员查询", icon:"", path:"views/query/schoolLeader/byCounsellor/index.html"}
    ]}
    ,{name:"管理配置", icon:"img/custom/icon_manage_config.png", path:"views/course/index.html",submenus: [
      {name:"参数配置", icon:"", path:"views/manage/systemManage/manage.html"}
    ]}
  ];

  var collegeLeaderViews = [
    {name:"考勤数据查询", icon:"img/custom/icon_attend_data.png", path:"views/course/index.html",submenus: [
      {name:"学生查询", icon:"", path:"views/query/studentQuery/studentQuery.html"}
      , {name:"所有课程查询", icon:"", path:"views/query/allCourse/allCourse.html"}
      , {name:"辅导员负责学生查询", icon:"", path:"views/query/counsellorQuery/counsellorQuery.html"}
//      , {name:"所有课程统计", icon:"", path:"views/query/counsellorQuery/counsellorQuery.html"}
    ]}
  ];

  var schoolLeaderViews = [
    {name:"考勤数据查询", icon:"img/custom/icon_attend_data.png", path:"views/course/index.html",submenus: [
      {name:"所有课程查询", icon:"", path:"views/query/schoolLeader/allCourses/index.html"}
      , {name:"按老师查询", icon:"", path:"views/query/schoolLeader/byTeacher/index.html"}
      , {name:"按辅导员查询", icon:"", path:"views/query/schoolLeader/byCounsellor/index.html"}
    ]}
  ];

  collegeLeaderViews = schoolLeaderViews;

  console.log("role:",$rootScope.uuser.role)
  $scope.views = [];

  switch ($rootScope.uuser.role){
    case 0: //管理员
      $scope.views = adminViews;
      break;
    case 1: //学生
      $scope.views = studentViews;
      break;
    case 2: //老师
      $scope.views = teacherViews;
      break;
    case 3: //辅导员
      $scope.views = counsellorViews;
      break;
    case 'office': //教务处
      $scope.views = officeViews;
      break;
    case 'collegeLeader': //学院领导
      $scope.views = collegeLeaderViews;
      break;
    case 'schoolLeader': //学校领导
      $scope.views = schoolLeaderViews;
      break;
  }

  $scope.currentView = $scope.views[0].submenus[0];



  // $scope.currentView = $scope.views[0].submenus[1]
	
	$scope.selectView = function(view) {
    widthFunctions();

//    if(view.name !== "基础数据" && view.name !== "课程" && view.name !== "考勤数据查询" && view.name !== "管理配置"){
//      $scope.currentView = view;
//    }

    $scope.currentView = view;

//    Pagination.iLength = 0
//    Pagination.iPage = 1
    console.log('$scope.currentView',$scope.currentView);
	}
	
	$scope.selectViewByPath = function(path) {
		$scope.views.some(function(view){
			if(view.path === path) {
				$scope.currentView = view
				return true
			} else {
				return view.submenus.some(function(submenu){
					if(submenu.path === path) {
						$scope.currentView = submenu
						console.log(submenu, path)
						return true
					} else {
						return false
					}
				})
			}
		})
	}
}