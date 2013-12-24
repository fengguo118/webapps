module.exports = function (app, passport, auth) {

    var users = require('../app/controllers/users');
    var college = require('../app/controllers/college');
    var department = require('../app/controllers/department');
    var campus = require('../app/controllers/campus');
    var staffAdmin = require('../app/controllers/staffAdmin');
    var building = require('../app/controllers/building');
    var classroom = require('../app/controllers/classroom');
    var subject = require('../app/controllers/subject');
    var classes = require('../app/controllers/classes');
    var student = require('../app/controllers/student');
    var teacher = require('../app/controllers/teacher');
    var counsellor = require('../app/controllers/counsellor');
    var schedule = require('../app/controllers/schedule');
    var course = require('../app/controllers/course');
    var courseSchedule = require('../app/controllers/courseSchedule');
    var studentCourse = require('../app/controllers/studentCourse');
    var leave = require('../app/controllers/leave');
    var transferCourses = require('../app/controllers/transferCourses');
    var admin = require('../app/controllers/admin');
    var attendRecord = require('../app/controllers/attendRecord');

    // user routes
    app.post('/users/session', passport.authenticate('local'), users.session);
//    console.log('进入了路由');
    app.post('/users/signout', users.signout);
    app.post('/users/check_password', auth.user.hasAuthorization, users.checkPassword);
    app.post('/users/:userId', auth.user.hasAuthorization, users.update);

    //college routes
    app.get('/college', auth.user.hasAuthorization, college.index);
    app.post('/college', auth.user.hasAuthorization, college.create);
    app.delete('/college/:collegeID', auth.user.hasAuthorization, college.delete);
    app.put('/college/:collegeID', auth.user.hasAuthorization, college.update);
    app.get('/college/get_all', auth.user.hasAuthorization, college.getAll);


    //department routes
    app.get('/department', auth.user.hasAuthorization, department.index);
    app.post('/department', auth.user.hasAuthorization, department.create);
    app.delete('/department/:departmentID', auth.user.hasAuthorization, department.delete);
    app.put('/department/:departmentID', auth.user.hasAuthorization, department.update);
    app.get('/department/get_all', auth.user.hasAuthorization, department.getAll);

    //campus routes
    app.get('/campus', auth.user.hasAuthorization, campus.index);
    app.post('/campus', auth.user.hasAuthorization, campus.create);
    app.delete('/campus/:campusID', auth.user.hasAuthorization, campus.delete);
    app.put('/campus/:campusID', auth.user.hasAuthorization, campus.update);
    app.get('/campus/get_all', auth.user.hasAuthorization, campus.getAll);

    //staffAdmin routes 此路由处理 教务处 学院领导 学校领导和其他部门的CRUD操作
    app.get('/staffadmin/:position', auth.user.hasAuthorization, staffAdmin.index);
//  app.get('/staffadmin/:position/:opration/:type', auth.user.hasAuthorization, staffAdmin.checkDuplication);
    app.get('/staffadmin/:position/:opration', auth.user.hasAuthorization, staffAdmin.getCollegeLeaderByCollegeAndPosition);
    app.post('/staffadmin/:position', auth.user.hasAuthorization, staffAdmin.create);
    app.delete('/staffadmin/:ID/:userID/:position', auth.user.hasAuthorization, staffAdmin.delete);
    app.put('/staffadmin/:ID/:userID/:position', auth.user.hasAuthorization, staffAdmin.update);
    app.post('/staffadmin/:position/check_duplication', auth.user.hasAuthorization, staffAdmin.checkDuplication);


    //building routes
    app.get('/building', auth.user.hasAuthorization, building.index);
    app.post('/building', auth.user.hasAuthorization, building.create);
    app.delete('/building/:buildingID', auth.user.hasAuthorization, building.delete);
    app.put('/building/:buildingID', auth.user.hasAuthorization, building.update);
    app.get('/building/get_all', auth.user.hasAuthorization, building.getAll);
    app.get('/building/get_all_by_campusid', auth.user.hasAuthorization, building.getAllByCampusID);
    app.get('/building/get_by_campus', auth.user.hasAuthorization, building.getByCampus);

    //classroom routes
    app.get('/classroom', auth.user.hasAuthorization, classroom.index);
    app.post('/classroom', auth.user.hasAuthorization, classroom.create);
    app.delete('/classroom/:classroomID', auth.user.hasAuthorization, classroom.delete);
    app.put('/classroom/:classroomID', auth.user.hasAuthorization, classroom.update);
    app.get('/classroom/get_all', auth.user.hasAuthorization, classroom.getAll);
    app.get('/classroom/get_by_campus', auth.user.hasAuthorization, classroom.getByCampus);
    app.get('/classroom/get_by_building', auth.user.hasAuthorization, classroom.getByBuilding);

    //subject routes
    app.get('/subject', auth.user.hasAuthorization, subject.index);
    app.post('/subject', auth.user.hasAuthorization, subject.create);
    app.delete('/subject/:subjectID', auth.user.hasAuthorization, subject.delete);
    app.put('/subject/:subjectID', auth.user.hasAuthorization, subject.update);
    app.get('/subject/get_all', auth.user.hasAuthorization, subject.getAll);
    app.get('/subject/get_all_by_collegeID', auth.user.hasAuthorization, subject.getAllByCollegeID);
    app.get('/subject/get_by_college', auth.user.hasAuthorization, subject.getByCollege);

    //class routes
    app.get('/class', auth.user.hasAuthorization, classes.index);
    app.post('/class', auth.user.hasAuthorization, classes.create);
    app.delete('/class/:classID', auth.user.hasAuthorization, classes.delete);
    app.put('/class/:classID', auth.user.hasAuthorization, classes.update);
    app.get('/class/get_all', auth.user.hasAuthorization, classes.getAll);
    app.get('/class/get_all_by_teacher_id', auth.user.hasAuthorization, classes.getAllByTeacherID);
    app.get('/class/get_all_by_counsellor_id', auth.user.hasAuthorization, classes.getAllByCounsellorID);
    app.get('/class/get_all_by_subjectid_and_grade', auth.user.hasAuthorization, classes.getAllBySubjectIDAndGrade);
    app.get('/class/get_by_college', auth.user.hasAuthorization, classes.getByCollege);
    app.get('/class/get_by_selected_courseID', auth.user.hasAuthorization, classes.getBySelectedCourseID);
    app.get('/class/get_by_subject', auth.user.hasAuthorization, classes.getBySubject);
    app.get('/class/get_by_subject_and_grade', auth.user.hasAuthorization, classes.getBySubjectIDAndGrade);

    //student routes
    app.get('/student', auth.user.hasAuthorization, student.index);
    app.post('/student', auth.user.hasAuthorization, student.create);
    app.delete('/student/:ID/:userID', auth.user.hasAuthorization, student.delete);
    app.put('/student/:ID/:userID', auth.user.hasAuthorization, student.update);
    app.get('/student/get_all', auth.user.hasAuthorization, student.getAll);
    app.get('/student/get_all_by_classID', auth.user.hasAuthorization, student.getAllByClassID);
    app.get('/student/get_all_by_collegeID', auth.user.hasAuthorization, student.getAllByCollegeID);
    app.get('/student/get_all_by_subjectID', auth.user.hasAuthorization, student.getAllBySubjectID);
    app.get('/student/get_all_by_subjectID_and_grade', auth.user.hasAuthorization, student.getAllBySubjectIDAndGrade);
    app.get('/student/get_by_classID', auth.user.hasAuthorization, student.getByClassID);
    app.get('/student/get_student_id_by_userid', auth.user.hasAuthorization, student.getStudentIDByUserID);
    app.get('/student/check_studentid_duplication', auth.user.hasAuthorization, student.checkStudentIDDuplication);

    //teacher routes
    app.get('/teacher', auth.user.hasAuthorization, teacher.index);
    app.post('/teacher', auth.user.hasAuthorization, teacher.create);
    app.delete('/teacher/:ID/:userID', auth.user.hasAuthorization, teacher.delete);
    app.put('/teacher/:ID/:userID', auth.user.hasAuthorization, teacher.update);
    app.get('/teacher/get_all', auth.user.hasAuthorization, teacher.getAll);
    app.get('/teacher/get_all_by_college/:collegeID', auth.user.hasAuthorization, teacher.getAllByCollege);
    app.get('/teacher/get_by_college/:collegeID', auth.user.hasAuthorization, teacher.getByCollege);
    app.get('/teacher/check_teacherid_duplication', auth.user.hasAuthorization, teacher.checkTeacherIDDuplication);


    //counsellor routes
    app.get('/counsellor', auth.user.hasAuthorization, counsellor.index);
    app.post('/counsellor', auth.user.hasAuthorization, counsellor.create);
    app.delete('/counsellor/:ID/:userID', auth.user.hasAuthorization, counsellor.delete);
    app.put('/counsellor/:ID/:userID', auth.user.hasAuthorization, counsellor.update);
    app.get('/counsellor/get_all_by_college', auth.user.hasAuthorization, counsellor.getAllByCollege);
    app.get('/counsellor/get_by_college', auth.user.hasAuthorization, counsellor.getByCollege);
    app.get('/counsellor/check_duplication', auth.user.hasAuthorization, counsellor.checkDuplication);
//  app.get('/counsellor/get_all', auth.user.hasAuthorization, counsellor.getAll)


    //schedule routes
    app.get('/schedule', auth.user.hasAuthorization, schedule.index);
    app.post('/schedule', auth.user.hasAuthorization, schedule.create);
    app.delete('/schedule/:scheduleID', auth.user.hasAuthorization, schedule.delete);
    app.put('/schedule/:scheduleID', auth.user.hasAuthorization, schedule.update);
    app.get('/schedule/get_all', auth.user.hasAuthorization, schedule.getAll);
    app.get('/schedule/get_all_by_campusid', auth.user.hasAuthorization, schedule.getAllByCampusID);
    app.get('/schedule/get_by_season', auth.user.hasAuthorization, schedule.getBySeason);
    app.get('/schedule/get_by_campus', auth.user.hasAuthorization, schedule.getByCampus);
    app.get('/schedule/get_by_campus_and_season', auth.user.hasAuthorization, schedule.getByCampusAndSeason);

    //course routes
    app.get('/course', auth.user.hasAuthorization, course.index);
    app.post('/course', auth.user.hasAuthorization, course.create);
    app.delete('/course/:courseID', auth.user.hasAuthorization, course.delete);
    app.put('/course/:courseID', auth.user.hasAuthorization, course.update);
    app.get('/course/get_all', auth.user.hasAuthorization, course.getAll);
    app.get('/course/get_all_by_collegeID', auth.user.hasAuthorization, course.getByCollegeID);
    app.get('/course/get_all_by_week_and_teacherID', auth.user.hasAuthorization, course.getAllByWeekAndTeacherID);

    //courseSchedule routes
    app.get('/course_schedule', auth.user.hasAuthorization, courseSchedule.index);
    app.post('/course_schedule', auth.user.hasAuthorization, courseSchedule.create);
    app.delete('/course_schedule/:courseScheduleID', auth.user.hasAuthorization, courseSchedule.delete);
    app.put('/course_schedule/:courseScheduleID', auth.user.hasAuthorization, courseSchedule.update);
    app.get('/course_schedule/get_all', auth.user.hasAuthorization, courseSchedule.getAll);
    app.get('/course_schedule/query_course_schedule', auth.user.hasAuthorization, courseSchedule.queryCourseSchedule);
    app.get('/course_schedule/get_is_evenused', auth.user.hasAuthorization, courseSchedule.getIsEvenUsed);
    app.get('/course_schedule/getColleageByName', auth.user.hasAuthorization, courseSchedule.getColleageByName);
    app.get('/course_schedule/getColleageByNameForCounsellor', auth.user.hasAuthorization, courseSchedule.getColleageByNameForCounsellor);

    //courseSchedule routes
    app.get('/student_course', auth.user.hasAuthorization, studentCourse.index);
    app.post('/student_course', auth.user.hasAuthorization, studentCourse.create);
    app.delete('/student_course/:studentCourseID', auth.user.hasAuthorization, studentCourse.delete);
    app.put('/student_course/:studentCourseID', auth.user.hasAuthorization, studentCourse.update);
    app.get('/student_course/get_all', auth.user.hasAuthorization, studentCourse.getAll);
    app.post('/student_course/upload', auth.user.hasAuthorization, studentCourse.upload);

    //leave routes
    app.get('/leave', auth.user.hasAuthorization, leave.index);
    app.post('/leave', auth.user.hasAuthorization, leave.create);
    app.delete('/leave/:leaveID', auth.user.hasAuthorization, leave.delete);
    app.put('/leave/:leaveID', auth.user.hasAuthorization, leave.update);
    app.get('/leave/get_leave_ahead_days', auth.user.hasAuthorization, leave.getLeaveAheadDays)

    //transfer_courses routes
    app.get('/transfer_courses', auth.user.hasAuthorization, transferCourses.index);
    app.post('/transfer_courses', auth.user.hasAuthorization, transferCourses.create);
    app.delete('/transfer_courses/:transferCoursesID', auth.user.hasAuthorization, transferCourses.delete);
    app.put('/transfer_courses/pass', auth.user.hasAuthorization, transferCourses.pass);
    app.put('/transfer_courses/refused', auth.user.hasAuthorization, transferCourses.refused);
    app.get('/transfer_courses/get_transfer_ahead_days', auth.user.hasAuthorization, transferCourses.getTransferAheadDays);
//  app.get('/leave/get_all', auth.user.hasAuthorization, leave.getAll)
//  app.get('/transfer_courses/get_all_freetime', auth.user.hasAuthorization, transferCourses.getAllFreetime)

    app.post('/server/upload', auth.user.hasAuthorization, studentCourse.upload);
    app.get('/server/getFreeTime', auth.user.hasAuthorization, transferCourses.getAllFreetime);
    app.get('/admin/info', admin.getWebsiteInfo);
    app.post('/admin/info', admin.setWebsiteInfo);

    app.get('/attendRecord/get_all', auth.user.hasAuthorization, attendRecord.getQueryAll);
    app.get('/attendRecord/get_by_collegeID', auth.user.hasAuthorization, attendRecord.getByCollegeID);
    app.get('/attendRecord/get_by_subjectID', auth.user.hasAuthorization, attendRecord.getBySubjectID);
    app.get('/attendRecord/get_by_subjectID_and_grade', auth.user.hasAuthorization, attendRecord.getBySubjectIDAndGrade);
    app.get('/attendRecord/get_by_classID', auth.user.hasAuthorization, attendRecord.getByClassID);
    app.get('/attendRecord/get_by_studentID', auth.user.hasAuthorization, attendRecord.getByStudentID);
    app.get('/attendRecord/get_by_teacherID', auth.user.hasAuthorization, attendRecord.getByTeacherID);
    app.get('/attendRecord/get_course_record_detail_in_student_view', auth.user.hasAuthorization, attendRecord.getCourseRecordDetailInStudentView);
    app.get('/attendRecord/get_query_all_in_counsellor_view', auth.user.hasAuthorization, attendRecord.getQueryAllInCounsellorView);
    app.get('/attendRecord/get_query_all_in_counsellor_view', auth.user.hasAuthorization, attendRecord.getQueryAllInCounsellorView);
    app.get('/attendRecord/get_query_all', auth.user.hasAuthorization, attendRecord.getQueryAll);
    app.get('/attendRecord/get_by_collegeid', auth.user.hasAuthorization, attendRecord.getByCollegeID);

}
