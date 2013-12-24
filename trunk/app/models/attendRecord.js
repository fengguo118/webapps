var db = require("../utils/dbUtils");
var connection = require("../utils/dbUtils").connection;
var kit = require("../utils/kit");
var logger = kit.getLogger();
var async = require("async");

exports.getShouldAttendNumByCourse = function(course_id,callback){

//  logger.info('courseItem:',courseItem.course_id)

  var SQL = "select s_value from website_setting \
  where s_key = 'termStart' "

//  var weeks = kit.getWeekNumFromTermStartAndEnd(start,end);

  connection.query(SQL, function (error, starts) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    var start = starts[0].s_value;
    var startDate = new Date(start);
//    logger.info("^&^&&&&^start:",start);
    var weeks = kit.getWeekNumFromTermStartAndEnd(startDate,new Date());
//    logger.info("^&^&&&&^weeks:",weeks);

    var SQL_queryCourseSchedule = "select single,count from \
        ( \
            select count(id) as single from course_schedule \
    where even_used = 1 and course_id = '"+course_id+"'\
    ) m \
    join  ( \
        select count(id) as count from course_schedule \
    where even_used = 0 and course_id = '"+course_id+"'\
    ) n on 1 =1 ";

    connection.query(SQL_queryCourseSchedule, function (error, courseSchedules) {
      if(error){
        logger.error(error,"LOG AT:"+__filename+":"+__line);
        return callback(error, null);
      }
      var courseSchedule  = courseSchedules[0];
      //本学期上课次数，还需要再乘以这门课的上课人数，才能得到该课的应到人数
      var number = weeks * courseSchedule.count + Math.ceil((weeks * courseSchedule.single) /2);

      var SQL_queryStudentNum = "select COUNT(id) as studentNum from student_course \
      where course_id = '"+course_id+"'";

      connection.query(SQL_queryStudentNum, function (error, studentNums) {
        if(error){
          logger.error(error,"LOG AT:"+__filename+":"+__line);
          return callback(error, null);
        }
        logger.info("^&^&&&&^studentNums:",studentNums);
        var studentNum = studentNums[0].studentNum;
        var shouldAttendNumber = number * studentNum;

        logger.info("^&^&&&&^number:",number);
        logger.info("^&^&&&&^shouldAttendNumber:",shouldAttendNumber);
        var obj = {
          course : course_id ,
          num : shouldAttendNumber
        };
        return callback(null,obj);

      })
    });
  })

//  var obj = {
//    course : courseItem ,
//    num : 50
//  };
//  callback(null,obj);
}

exports.getAttendNumByCourse = function(course_id,callback){

  var SQL_getAttendNumByCourse = "SELECT \
  COUNT(status) AS num , \
      'attendNum' as type \
  FROM \
  attendence_record \
  WHERE \
  status = 0 \
  AND course_id = '"+course_id+"' \
  GROUP BY \
  course_id";

  logger.info("SQL_getAttendNumByCourse:",SQL_getAttendNumByCourse);

//  var connection = db.createConnection();

  connection.query(SQL_getAttendNumByCourse, function (error, objs) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
//      connection.end();
      return callback(error, null);
    }
    if (!objs || (objs.length === 0)) {
//      connection.end();
      var obj = {
        type : 'attendNum' ,
        num : 0
      };
      return callback(null,obj);
    }
    logger.info("obj:",objs);
    var obj = objs[0];
//    connection.end();
     return callback(null, obj);
  })

}

exports.getOutOfClassNumByCourse = function(course_id,callback){

  var SQL_getOutOfClassNumByCourse = "SELECT \
  COUNT(status) AS num , \
      'outOfClassNum' as type \
  FROM \
  attendence_record \
  WHERE \
  status = 1 \
  AND course_id = '"+course_id+"' \
  GROUP BY \
  course_id";

  logger.info("SQL_getOutOfClassNumByCourse:",SQL_getOutOfClassNumByCourse);

//  var connection = db.createConnection();

  connection.query(SQL_getOutOfClassNumByCourse, function (error, objs) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
//      connection.end();
      return callback(error, null);
    }
    if (!objs || (objs.length === 0)) {
//      connection.end();
      var obj = {
       type : 'outOfClassNum' ,
       num : 0
      };
      return callback(null,obj);
    }
    logger.info("obj:",objs);
    var obj = objs[0];
//    connection.end();
    return callback(null, obj);
  })

//  var obj = {
//    type : 'outOfClassNum' ,
//    num : 2
//  };
//  callback(null,obj);
}

exports.getLateNumByCourse = function(course_id,callback){

  var SQL_getOutOfClassNumByCourse = "SELECT \
  COUNT(status) AS num , \
      'lateNum' as type \
  FROM \
  attendence_record \
  WHERE \
  status = 2 \
  AND course_id = '"+course_id+"' \
  GROUP BY \
  course_id";

  logger.info("SQL_getOutOfClassNumByCourse:",SQL_getOutOfClassNumByCourse);

//  var connection = db.createConnection();

  connection.query(SQL_getOutOfClassNumByCourse, function (error, objs) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
//      connection.end();
      return callback(error, null);
    }
    if (!objs || (objs.length === 0)) {
//      connection.end();
      var obj = {
        type : 'lateNum' ,
        num : 0
      };
      return callback(null,obj);
    }
    logger.info("obj:",objs);
    var obj = objs[0];
//    connection.end();
    return callback(null, obj);
  })


//  var obj = {
//    type : 'lateNum' ,
//    num : 1
//  };
//  callback(null,obj);
}

exports.getEarlyLeaveNumByCourse = function(course_id,callback){


  var SQL_getOutOfClassNumByCourse = "SELECT \
  COUNT(status) AS num , \
      'earlyLeaveNum' as type \
  FROM \
  attendence_record \
  WHERE \
  status = 3 \
  AND course_id = '"+course_id+"' \
  GROUP BY \
  course_id";

  logger.info("SQL_getOutOfClassNumByCourse:",SQL_getOutOfClassNumByCourse);

//  var connection = db.createConnection();

  connection.query(SQL_getOutOfClassNumByCourse, function (error, objs) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
//      connection.end();
      return callback(error, null);
    }
    if (!objs || (objs.length === 0)) {
//      connection.end();
      var obj = {
        type : 'earlyLeaveNum' ,
        num : 0
      };
      return callback(null,obj);
    }
    logger.info("obj:",objs);
    var obj = objs[0];
//    connection.end();
    return callback(null, obj);
  })


//  var obj = {
//    type : 'earlyLeaveNum' ,
//    num : 0
//  };
//  callBack(null,obj);
}

exports.getSickLeaveNumByCourse = function(course_id,callback){

  var SQL_getOutOfClassNumByCourse = "SELECT \
  COUNT(status) AS num , \
      'sickLeaveNum' as type \
  FROM \
  attendence_record \
  WHERE \
  status = 4 \
  AND course_id = '"+course_id+"' \
  GROUP BY \
  course_id";

  logger.info("SQL_getOutOfClassNumByCourse:",SQL_getOutOfClassNumByCourse);

//  var connection = db.createConnection();

  connection.query(SQL_getOutOfClassNumByCourse, function (error, objs) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
//      connection.end();
      return callback(error, null);
    }
    if (!objs || (objs.length === 0)) {
//      connection.end();
      var obj = {
        type : 'sickLeaveNum' ,
        num : 0
      };
      return callback(null,obj);
    }
    logger.info("obj:",objs);
    var obj = objs[0];
//    connection.end();
    return callback(null, obj);
  })


//  var obj = {
//    type : 'sickLeaveNum' ,
//    num : 5
//  };
//  callBack(null,obj);
}

exports.getAffairLeaveNumByCourse = function(course_id,callback){

  var SQL_getOutOfClassNumByCourse = "SELECT \
  COUNT(status) AS num , \
      'affairLeaveNum' as type \
  FROM \
  attendence_record \
  WHERE \
  status = 5 \
  AND course_id = '"+course_id+"' \
  GROUP BY \
  course_id";

  logger.info("SQL_getOutOfClassNumByCourse:",SQL_getOutOfClassNumByCourse);

//  var connection = db.createConnection();

  connection.query(SQL_getOutOfClassNumByCourse, function (error, objs) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
//      connection.end();
      return callback(error, null);
    }
    if (!objs || (objs.length === 0)) {
//      connection.end();
      var obj = {
        type : 'affairLeaveNum' ,
        num : 0
      };
      return callback(null,obj);
    }
    logger.info("obj:",objs);
    var obj = objs[0];
//    connection.end();
    return callback(null, obj);
  })

//  var obj = {
//    type : 'affairLeaveNum' ,
//    num : 6
//  };
//  callback(null,obj);
}

/**
 * 从学生角度计算某一门课的应到次数
 * @param course_id
 * @param callback
 */
exports.getShouldAttendNumByCourseInStudentView = function(course_id,callback){
//  logger.info('courseItem:',courseItem.course_id)
  var SQL = "select s_value from website_setting \
  where s_key = 'termStart' "

//  var weeks = kit.getWeekNumFromTermStartAndEnd(start,end);

  connection.query(SQL, function (error, starts) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    var start = starts[0].s_value;
    var startDate = new Date(start);
//    logger.info("^&^&&&&^start:",start);
    var weeks = kit.getWeekNumFromTermStartAndEnd(startDate,new Date());
//    logger.info("^&^&&&&^weeks:",weeks);

    var SQL_queryCourseSchedule = "select single,count from \
        ( \
            select count(id) as single from course_schedule \
    where even_used = 1 and course_id = '"+course_id+"'\
    ) m \
    join  ( \
        select count(id) as count from course_schedule \
    where even_used = 0 and course_id = '"+course_id+"'\
    ) n on 1 =1 ";

    connection.query(SQL_queryCourseSchedule, function (error, courseSchedules) {
      if(error){
        logger.error(error,"LOG AT:"+__filename+":"+__line);
        return callback(error, null);
      }
      var courseSchedule  = courseSchedules[0];
      //本学上课次数
      var number = weeks * courseSchedule.count + Math.ceil((weeks * courseSchedule.single) /2);
      logger.info("^&^&&&&^number:",number);
      var obj = {
        course : course_id ,
        num : number
      };
      return callback(null,obj);

    });

  })

//  var obj = {
//    course : courseItem ,
//    num : 50
//  };
//  callback(null,obj);
}

exports.getCourseRecordDetailInStudentView = function (courseID,studentID,callback) {
  if (!courseID) {
    logger.error('null courseID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null courseID'), null);
  }
  if (!studentID) {
    logger.error('null studentID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null studentID'), null);
  }

  var SQL_getCourseRecordDetailInStudentView = "select date_format(time,'%Y-%m-%d') as date, \
  case status \
  when 0 then '出席' \
  when 1 then '旷课' \
  when 2 then '迟到' \
  when 3 then '早退' \
  when 4 then '病假' \
  when 5 then '事假' \
  end as statusName \
  from attendence_record \
  where course_id = '"+courseID+"' and student_id = '"+studentID+"'";


  connection.query(SQL_getCourseRecordDetailInStudentView, function (error, courseDetailes) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!courseDetailes || (courseDetailes.length === 0)) {
      return callback(null, null);
    }

    callback(null, courseDetailes);
  })
}


exports.getQueryAllInCounsellorView = function (callback) {

  var getQueryAllInCounsellorView = "select  \
  CONCAT(ROUND((m.attendenceNum / m.shouAttendNum)*100,2),'%') as attendRate, \
      CONCAT(ROUND((m.outOfClassNum / m.shouAttendNum)*100,2),'%') as outOfClassRate, \
      CONCAT(ROUND((m.lateNum / m.shouAttendNum)*100,2),'%') as lateRate, \
      CONCAT(ROUND((m.earlyLeaveNum / m.shouAttendNum)*100,2),'%') as earlyLeaveRate, \
      CONCAT(ROUND((m.sickLeaveNum / m.shouAttendNum)*100,2),'%') as sickLeaveRate, \
      CONCAT(ROUND((m.affiarLeaveNum / m.shouAttendNum)*100,2),'%') as affiarLeaveRate, \
      m.emp_id,m.counsellorName \
  from ( \
      select \
  count(ar.id) as shouAttendNum, \
      count(case when ar.status=0 then 1 end) as attendenceNum, \
      count(case when ar.status=1 then 1 end) as outOfClassNum, \
      count(case when ar.status=2 then 1 end) as lateNum, \
      count(case when ar.status=3 then 1 end) as earlyLeaveNum, \
      count(case when ar.status=4 then 1 end) as sickLeaveNum, \
      count(case when ar.status=5 then 1 end) as affiarLeaveNum, \
      co.id,co.emp_id,usr.name as counsellorName \
  from attendence_record ar , student stu,class cl,subject sub,department dept,counsellor co,user usr \
  where ar.student_id = stu.id and stu.class_id = cl.id and sub.id = cl.subject_id \
  and dept.id = sub.department_id and co.department_id = dept.id and usr.id = co.user_id \
  group by co.id \
  ) m"


  connection.query(getQueryAllInCounsellorView, function (error, courseDetailes) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!courseDetailes || (courseDetailes.length === 0)) {
      return callback(null, null);
    }

    callback(null, courseDetailes);
  })
}

exports.getQueryAll = function (callback) {

  var SQL_getQueryAll = "select  \
  CONCAT(ROUND((m.attendenceNum / m.shouAttendNum)*100,2),'%') as attendRate, \
      CONCAT(ROUND((m.outOfClassNum / m.shouAttendNum)*100,2),'%') as outOfClassRate, \
      CONCAT(ROUND((m.lateNum / m.shouAttendNum)*100,2),'%') as lateRate, \
      CONCAT(ROUND((m.earlyLeaveNum / m.shouAttendNum)*100,2),'%') as earlyLeaveRate, \
      CONCAT(ROUND((m.sickLeaveNum / m.shouAttendNum)*100,2),'%') as sickLeaveRate, \
      CONCAT(ROUND((m.affiarLeaveNum / m.shouAttendNum)*100,2),'%') as affiarLeaveRate, \
      m.courseName,m.teacherName,m.collegeName \
  from ( \
      select \
  count(ar.id) as shouAttendNum, \
      count(case when ar.status=0 then 1 end) as attendenceNum, \
      count(case when ar.status=1 then 1 end) as outOfClassNum, \
      count(case when ar.status=2 then 1 end) as lateNum, \
      count(case when ar.status=3 then 1 end) as earlyLeaveNum, \
      count(case when ar.status=4 then 1 end) as sickLeaveNum, \
      count(case when ar.status=5 then 1 end) as affiarLeaveNum, \
      cour.id,cour.name as courseName,usr.name as teacherName,dept.name as collegeName \
  from attendence_record ar , student stu,class cl,subject sub,department dept ,course cour,teacher te,user usr \
  where ar.student_id = stu.id and stu.class_id = cl.id and sub.id = cl.subject_id \
  and dept.id = sub.department_id and ar.course_id = cour.id and cour.teacher_id = te.id and te.user_id = usr.id \
  group by cour.id \
  ) m"


  connection.query(SQL_getQueryAll, function (error, courseDetailes) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!courseDetailes || (courseDetailes.length === 0)) {
      return callback(null, null);
    }

    callback(null, courseDetailes);
  })
}

exports.getByCollegeID = function (collegeID,callback) {
  if (!collegeID) {
    logger.error('null collegeID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null collegeID'), null);
  }
  var SQL_getByCollegeID = "select  \
  CONCAT(ROUND((m.attendenceNum / m.shouAttendNum)*100,2),'%') as attendRate, \
      CONCAT(ROUND((m.outOfClassNum / m.shouAttendNum)*100,2),'%') as outOfClassRate, \
      CONCAT(ROUND((m.lateNum / m.shouAttendNum)*100,2),'%') as lateRate, \
      CONCAT(ROUND((m.earlyLeaveNum / m.shouAttendNum)*100,2),'%') as earlyLeaveRate, \
      CONCAT(ROUND((m.sickLeaveNum / m.shouAttendNum)*100,2),'%') as sickLeaveRate, \
      CONCAT(ROUND((m.affiarLeaveNum / m.shouAttendNum)*100,2),'%') as affiarLeaveRate, \
      m.courseName,m.teacherName,m.collegeName \
  from ( \
      select \
  count(ar.id) as shouAttendNum, \
      count(case when ar.status=0 then 1 end) as attendenceNum, \
      count(case when ar.status=1 then 1 end) as outOfClassNum, \
      count(case when ar.status=2 then 1 end) as lateNum, \
      count(case when ar.status=3 then 1 end) as earlyLeaveNum, \
      count(case when ar.status=4 then 1 end) as sickLeaveNum, \
      count(case when ar.status=5 then 1 end) as affiarLeaveNum, \
      cour.id,cour.name as courseName,usr.name as teacherName,dept.name as collegeName \
  from attendence_record ar , student stu,class cl,subject sub,department dept ,course cour,teacher te,user usr \
  where ar.student_id = stu.id and stu.class_id = cl.id and sub.id = cl.subject_id \
  and dept.id = sub.department_id and ar.course_id = cour.id and cour.teacher_id = te.id and te.user_id = usr.id \
  and dept.id = '"+collegeID+"' \
  group by cour.id \
  ) m"



  connection.query(SQL_getByCollegeID, function (error, courseDetailes) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!courseDetailes || (courseDetailes.length === 0)) {
      return callback(null, null);
    }
    callback(null, courseDetailes);
  })
}

exports.getByTeacherID = function (teacherID,callback) {
  if (!teacherID) {
    logger.error('null teacherID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null teacherID'), null);
  }
  var SQL_getByTeacherID = "select  \
  CONCAT(ROUND((m.attendenceNum / m.shouAttendNum)*100,2),'%') as attendRate, \
      CONCAT(ROUND((m.outOfClassNum / m.shouAttendNum)*100,2),'%') as outOfClassRate, \
      CONCAT(ROUND((m.lateNum / m.shouAttendNum)*100,2),'%') as lateRate, \
      CONCAT(ROUND((m.earlyLeaveNum / m.shouAttendNum)*100,2),'%') as earlyLeaveRate, \
      CONCAT(ROUND((m.sickLeaveNum / m.shouAttendNum)*100,2),'%') as sickLeaveRate, \
      CONCAT(ROUND((m.affiarLeaveNum / m.shouAttendNum)*100,2),'%') as affiarLeaveRate, \
      m.courseName \
  from ( \
      select \
  count(ar.id) as shouAttendNum, \
      count(case when ar.status=0 then 1 end) as attendenceNum, \
      count(case when ar.status=1 then 1 end) as outOfClassNum, \
      count(case when ar.status=2 then 1 end) as lateNum, \
      count(case when ar.status=3 then 1 end) as earlyLeaveNum, \
      count(case when ar.status=4 then 1 end) as sickLeaveNum, \
      count(case when ar.status=5 then 1 end) as affiarLeaveNum, \
      cour.id,cour.name as courseName \
  from attendence_record ar , student stu,class cl,subject sub,department dept ,course cour,teacher te,user usr \
  where ar.student_id = stu.id and stu.class_id = cl.id and sub.id = cl.subject_id \
  and dept.id = sub.department_id and ar.course_id = cour.id and cour.teacher_id = te.id and te.user_id = usr.id \
  and te.id = '"+teacherID+"'\
  group by cour.id \
  ) m"


  connection.query(SQL_getByTeacherID, function (error, courseDetailes) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!courseDetailes || (courseDetailes.length === 0)) {
      return callback(null, null);
    }
    callback(null, courseDetailes);
  })
}


exports.getBySubjectID = function (subjectID,callback) {
  if (!subjectID) {
    logger.error('null subjectID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null subjectID'), null);
  }
  var SQL_getBySubjectID = "select  \
  CONCAT(ROUND((m.attendenceNum / m.shouAttendNum)*100,2),'%') as attendRate, \
      CONCAT(ROUND((m.outOfClassNum / m.shouAttendNum)*100,2),'%') as outOfClassRate, \
      CONCAT(ROUND((m.lateNum / m.shouAttendNum)*100,2),'%') as lateRate, \
      CONCAT(ROUND((m.earlyLeaveNum / m.shouAttendNum)*100,2),'%') as earlyLeaveRate, \
      CONCAT(ROUND((m.sickLeaveNum / m.shouAttendNum)*100,2),'%') as sickLeaveRate, \
      CONCAT(ROUND((m.affiarLeaveNum / m.shouAttendNum)*100,2),'%') as affiarLeaveRate, \
      m.courseName,m.teacherName,m.collegeName \
  from ( \
      select \
  count(ar.id) as shouAttendNum, \
      count(case when ar.status=0 then 1 end) as attendenceNum, \
      count(case when ar.status=1 then 1 end) as outOfClassNum, \
      count(case when ar.status=2 then 1 end) as lateNum, \
      count(case when ar.status=3 then 1 end) as earlyLeaveNum, \
      count(case when ar.status=4 then 1 end) as sickLeaveNum, \
      count(case when ar.status=5 then 1 end) as affiarLeaveNum, \
      cour.id,cour.name as courseName,usr.name as teacherName,dept.name as collegeName \
  from attendence_record ar , student stu,class cl,subject sub,department dept ,course cour,teacher te,user usr \
  where ar.student_id = stu.id and stu.class_id = cl.id and sub.id = cl.subject_id \
  and dept.id = sub.department_id and ar.course_id = cour.id and cour.teacher_id = te.id and te.user_id = usr.id \
  and sub.id = '"+subjectID+"' \
  group by cour.id \
  ) m"


  connection.query(SQL_getBySubjectID, function (error, courseDetailes) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!courseDetailes || (courseDetailes.length === 0)) {
      return callback(null, null);
    }
    callback(null, courseDetailes);
  })
}

exports.getBySubjectIDAndGrade = function (subjectID,grade,callback) {
  if (!subjectID) {
    logger.error('null subjectID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null subjectID'), null);
  }
  if (!grade) {
    logger.error('null grade',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null grade'), null);
  }
  var SQL_getBySubjectIDAndGrade = "select  \
  CONCAT(ROUND((m.attendenceNum / m.shouAttendNum)*100,2),'%') as attendRate, \
      CONCAT(ROUND((m.outOfClassNum / m.shouAttendNum)*100,2),'%') as outOfClassRate, \
      CONCAT(ROUND((m.lateNum / m.shouAttendNum)*100,2),'%') as lateRate, \
      CONCAT(ROUND((m.earlyLeaveNum / m.shouAttendNum)*100,2),'%') as earlyLeaveRate, \
      CONCAT(ROUND((m.sickLeaveNum / m.shouAttendNum)*100,2),'%') as sickLeaveRate, \
      CONCAT(ROUND((m.affiarLeaveNum / m.shouAttendNum)*100,2),'%') as affiarLeaveRate, \
      m.courseName,m.teacherName,m.collegeName \
  from ( \
      select \
  count(ar.id) as shouAttendNum, \
      count(case when ar.status=0 then 1 end) as attendenceNum, \
      count(case when ar.status=1 then 1 end) as outOfClassNum, \
      count(case when ar.status=2 then 1 end) as lateNum, \
      count(case when ar.status=3 then 1 end) as earlyLeaveNum, \
      count(case when ar.status=4 then 1 end) as sickLeaveNum, \
      count(case when ar.status=5 then 1 end) as affiarLeaveNum, \
      cour.id,cour.name as courseName,usr.name as teacherName,dept.name as collegeName \
  from attendence_record ar , student stu,class cl,subject sub,department dept ,course cour,teacher te,user usr \
  where ar.student_id = stu.id and stu.class_id = cl.id and sub.id = cl.subject_id \
  and dept.id = sub.department_id and ar.course_id = cour.id and cour.teacher_id = te.id and te.user_id = usr.id \
  and sub.id = '"+subjectID+"' and cl.grade = "+grade+" \
  group by cour.id \
  ) m"

  logger.info("SQL_getBySubjectIDAndGrade:",SQL_getBySubjectIDAndGrade)

  connection.query(SQL_getBySubjectIDAndGrade, function (error, courseDetailes) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!courseDetailes || (courseDetailes.length === 0)) {
      return callback(null, null);
    }
    callback(null, courseDetailes);
  })
}


exports.getByClassID = function (classID,callback) {
  if (!classID) {
    logger.error('null classID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null classID'), null);
  }
  var SQL_getByClassID = "select  \
  CONCAT(ROUND((m.attendenceNum / m.shouAttendNum)*100,2),'%') as attendRate, \
      CONCAT(ROUND((m.outOfClassNum / m.shouAttendNum)*100,2),'%') as outOfClassRate, \
      CONCAT(ROUND((m.lateNum / m.shouAttendNum)*100,2),'%') as lateRate, \
      CONCAT(ROUND((m.earlyLeaveNum / m.shouAttendNum)*100,2),'%') as earlyLeaveRate, \
      CONCAT(ROUND((m.sickLeaveNum / m.shouAttendNum)*100,2),'%') as sickLeaveRate, \
      CONCAT(ROUND((m.affiarLeaveNum / m.shouAttendNum)*100,2),'%') as affiarLeaveRate, \
      m.courseName,m.teacherName,m.collegeName \
  from ( \
      select \
  count(ar.id) as shouAttendNum, \
      count(case when ar.status=0 then 1 end) as attendenceNum, \
      count(case when ar.status=1 then 1 end) as outOfClassNum, \
      count(case when ar.status=2 then 1 end) as lateNum, \
      count(case when ar.status=3 then 1 end) as earlyLeaveNum, \
      count(case when ar.status=4 then 1 end) as sickLeaveNum, \
      count(case when ar.status=5 then 1 end) as affiarLeaveNum, \
      cour.id,cour.name as courseName,usr.name as teacherName,dept.name as collegeName \
  from attendence_record ar , student stu,class cl,subject sub,department dept ,course cour,teacher te,user usr \
  where ar.student_id = stu.id and stu.class_id = cl.id and sub.id = cl.subject_id \
  and dept.id = sub.department_id and ar.course_id = cour.id and cour.teacher_id = te.id and te.user_id = usr.id \
  and cl.id = '"+classID+"' \
  group by cour.id \
  ) m"

//  logger.info("SQL_getByClassID:",SQL_getByClassID)

  connection.query(SQL_getByClassID, function (error, courseDetailes) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!courseDetailes || (courseDetailes.length === 0)) {
      return callback(null, null);
    }
    callback(null, courseDetailes);
  })
}
exports.getByStudentID = function (studentID,callback) {
  if (!studentID) {
    logger.error('null studentID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null studentID'), null);
  }
  var SQL_getByClassID = "select \
  count(ar.id) as shouAttendNum, \
      count(case when ar.status=0 then 1 end) as attendenceNum, \
      count(case when ar.status=1 then 1 end) as outOfClassNum, \
      count(case when ar.status=2 then 1 end) as lateNum, \
      count(case when ar.status=3 then 1 end) as earlyLeaveNum, \
      count(case when ar.status=4 then 1 end) as sickLeaveNum, \
      count(case when ar.status=5 then 1 end) as affiarLeaveNum, \
      cour.id as courseID,stu.id as studentID,cour.name as courseName,usr.name as teacherName,dept.name as collegeName \
  from attendence_record ar , student stu,class cl,subject sub,department dept ,course cour,teacher te,user usr \
  where ar.student_id = stu.id and stu.class_id = cl.id and sub.id = cl.subject_id \
  and dept.id = sub.department_id and ar.course_id = cour.id and cour.teacher_id = te.id and te.user_id = usr.id \
  and stu.id = '"+studentID+"'  \
  group by cour.id"

//  logger.info("SQL_getByClassID:",SQL_getByClassID)

  connection.query(SQL_getByClassID, function (error, courseDetailes) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!courseDetailes || (courseDetailes.length === 0)) {
      return callback(null, null);
    }
    callback(null, courseDetailes);
  })
}