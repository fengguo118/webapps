var connection = require("../utils/dbUtils").connection;
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * 插入一条课程记录
 * @param Course
 * @param callback
 */
exports.insertCourse = function (Course, callback) {
  var setData = {
    id : kit.getUUid() , //随机主键
    name : Course.name ,
    type : Course.type.code,
    take_attend_type : Course.takeAttendType,
    dismiss_attend_type : Course.dismissAttendType,
    interval_attend_type : Course.intervalAttendType,
    status : Course.status.code,
    teacher_id : Course.teacher.id,
    create_time : kit.getNowFormatDate() //当前时间作为创建时间
  }
  var SQL_insertCourse = "insert into course set ?"
  connection.query(SQL_insertCourse, setData, function (error, result) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    return callback(error, result)
  })
}

exports.deleteCourseById = function (id, callback) {
  if (!id) {
    logger.error('null id',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null id'), null);
  }
  var SQL_deleteCourseById = "delete from course where id = ?"
  connection.query(SQL_deleteCourseById, id, function (error, result) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    callback(error, result);
  })
}

exports.selectAllCourses = function (page,limit, callback) {
  var SQL_selectAllCourses = "select o.name,o.typeName,o.teacherName,o.takeAttendTypeName,o.intervalAttendTypeName, \
  o.dismissAttendTypeName,o.statusName,p.name as collegeName,o.id,o.teacher_id \
  from ( \
      select  m.name, \
  case m.type \
  when 0 then '公共必修课' \
  when 1 then '公共任选课' \
  when 2 then '专业必修课' \
  when 3 then '专业选修课' \
  end as typeName, \
  m.type,\
      n.name as teacherName, \
      n.department_id, \
  case m.take_attend_type \
  when 0 then '默认' \
  when 1 then '全部' \
  when 2 then '抽查' \
  end as takeAttendTypeName, \
  m.take_attend_type as takeAttendType,\
  case m.interval_attend_type \
  when 0 then '默认' \
  when 1 then '全部' \
  when 2 then '抽查' \
  end as intervalAttendTypeName, \
  m.interval_attend_type as intervalAttendType, \
  case m.dismiss_attend_type \
  when 0 then '默认' \
  when 1 then '全部' \
  when 2 then '抽查' \
  end as dismissAttendTypeName, \
  m.dismiss_attend_type as dismissAttendType ,\
  case m.status \
  when 0 then '正常' \
  when 1 then '暂停' \
  when 2 then '撤销' \
  end as statusName, \
      m.id ,\
      m.teacher_id\
  from course m join ( \
      select j.id,j.department_id,k.name from teacher j join user k on j.user_id = k.id \
  ) n on m.teacher_id = n.id \
  ) o join department p on o.department_id = p.id \
  limit "+(page*limit)+","+ limit
  connection.query(SQL_selectAllCourses, function (error, Coursees) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Coursees || (Coursees.length === 0)) {
      return callback(null, null);
    }
    callback(null, Coursees);
  })
}

exports.selectAllCoursesByteacherID = function (page,limit,teacherID, callback) {
  if (!teacherID) {
    logger.error('null teacherID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null teacherID'), null);
  }
  var SQL_selectAllCoursesByteacherID = "select o.name,o.typeName,o.teacherName,o.takeAttendTypeName,o.intervalAttendTypeName, \
  o.dismissAttendTypeName,o.statusName,p.name as collegeName,o.id \
  from ( \
      select  m.name, \
  case m.type \
  when 0 then '公共选修课' \
  when 1 then '公共任选课' \
  when 2 then '专业必修课' \
  when 3 then '专业选修课' \
  end as typeName, \
  m.type,\
      n.name as teacherName, \
      n.department_id, \
  case m.take_attend_type \
  when 0 then '默认' \
  when 1 then '全部' \
  when 2 then '抽查' \
  end as takeAttendTypeName, \
  m.take_attend_type as takeAttendType,\
  case m.interval_attend_type \
  when 0 then '默认' \
  when 1 then '全部' \
  when 2 then '抽查' \
  end as intervalAttendTypeName, \
  m.interval_attend_type as intervalAttendType, \
  case m.dismiss_attend_type \
  when 0 then '默认' \
  when 1 then '全部' \
  when 2 then '抽查' \
  end as dismissAttendTypeName, \
  m.dismiss_attend_type as dismissAttendType ,\
  case m.status \
  when 0 then '正常' \
  when 1 then '暂停' \
  when 2 then '撤销' \
  end as statusName, \
      m.id \
  from course m join ( \
      select j.id,j.department_id,k.name from teacher j join user k on j.user_id = k.id \
  ) n on m.teacher_id = n.id where m.teacher_id = '" + teacherID + "'\
  ) o join department p on o.department_id = p.id \
  limit "+(page*limit)+","+ limit
  connection.query(SQL_selectAllCoursesByteacherID, function (error, Coursees) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Coursees || (Coursees.length === 0)) {
      return callback(null, null);
    }
    callback(null, Coursees);
  })
}

exports.getTotal = function (callback) {
  var SQL_getTotalCourses = "select count(o.teacher_id) as total \
  from ( \
      select  m.name, \
  case m.type \
  when 0 then '公共必修课' \
  when 1 then '公共任选课' \
  when 2 then '专业必修课' \
  when 3 then '专业选修课' \
  end as typeName, \
  m.type,\
      n.name as teacherName, \
      n.department_id, \
  case m.take_attend_type \
  when 0 then '默认' \
  when 1 then '全部' \
  when 2 then '抽查' \
  end as takeAttendTypeName, \
  m.take_attend_type as takeAttendType,\
  case m.interval_attend_type \
  when 0 then '默认' \
  when 1 then '全部' \
  when 2 then '抽查' \
  end as intervalAttendTypeName, \
  m.interval_attend_type as intervalAttendType, \
  case m.dismiss_attend_type \
  when 0 then '默认' \
  when 1 then '全部' \
  when 2 then '抽查' \
  end as dismissAttendTypeName, \
  m.dismiss_attend_type as dismissAttendType ,\
  case m.status \
  when 0 then '正常' \
  when 1 then '暂停' \
  when 2 then '撤销' \
  end as statusName, \
      m.id ,\
      m.teacher_id\
  from course m join ( \
      select j.id,j.department_id,k.name from teacher j join user k on j.user_id = k.id \
  ) n on m.teacher_id = n.id \
  ) o join department p on o.department_id = p.id"
  connection.query(SQL_getTotalCourses, function (error, totals) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!totals || (totals.length === 0) ) {
      return callback(null, null)
    }
    var total = totals[0]
    callback(null, total.total)
  })
}


exports.getByTeacherID = function (teacherID, callback) {

  if (!teacherID) {
    logger.error('null teacherID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null teacherID'), null);
  }

  var SQL_getByTeacherID = "select name as courseName,id as course_id \
  from course \
  where teacher_id = '"+teacherID+"'";


  logger.info("SQL_getByTeacherID:",SQL_getByTeacherID);

  connection.query(SQL_getByTeacherID, function (error, Coursees) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Coursees || (Coursees.length === 0)) {
      return callback(null, null);
    }
    callback(null, Coursees);
  })
}
//
//exports.getTotal = function (callback) {
//  var SQL_getTotalCourses = "select  COUNT(m.id) as total \
//  from course m join ( \
//      select j.id,j.department_id,k.name from teacher j join user k on j.user_id = k.id \
//  ) n on m.teacher_id = n.id"
//  connection.query(SQL_getTotalCourses, function (error, totals) {
//    if (error) {
//      logger.error(error,"LOG AT:"+__filename+":"+__line);
//      return callback(error, null);
//    }
//    if (!totals || (totals.length === 0) ) {
//      return callback(null, null)
//    }
//    var total = totals[0]
//    callback(null, total.total)
//  })
//}

exports.getTotalByteacherID = function (teacherID,callback) {
  var SQL_getTotalByteacherID = "select  COUNT(m.id) as total \
  from course m join ( \
      select j.id,j.department_id,k.name from teacher j join user k on j.user_id = k.id \
  ) n on m.teacher_id = n.id where m.teacher_id = '" + teacherID + "'"
  connection.query(SQL_getTotalByteacherID, function (error, totals) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!totals || (totals.length === 0) ) {
      return callback(null, null)
    }
    var total = totals[0]
    callback(null, total.total)
  })
}


exports.updateCourseById = function (Course, callback) {
  if (!Course) {
    logger.error('null Course',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null Course'), null);
  }
  var SQL_updateCategoryById = "update course set ? where id = " + connection.escape(Course.id);
  var updateData = {
    name : Course.name ,
    type : Course.type.code,
    take_attend_type : Course.takeAttendType,
    dismiss_attend_type : Course.dismissAttendType,
    interval_attend_type : Course.intervalAttendType,
    status : Course.status.code,
    teacher_id : Course.teacher.id
  }
  connection.query(SQL_updateCategoryById, updateData, function (error, result) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    return callback(error, result);
  })
}

exports.getAll = function (callback) {
  var SQL_selectAll = "select  m.id,m.name \
  from course m join ( \
      select j.id,j.department_id,k.name from teacher j join user k on j.user_id = k.id \
  ) n on m.teacher_id = n.id"
  connection.query(SQL_selectAll, function (error, Coursees) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Coursees || (Coursees.length === 0)) {
      return callback(null, null);
    }
    callback(null, Coursees);
  })
}

exports.getAllByWeekAndTeacherID = function (week,date,teacherID,callback) {
  console.log(week,date,teacherID)
  var SQL_getAllByWeekAndTeacherIDByDate = "SELECT \
        m.id, \
        n.even_used, \
        n.classroom_id, \
        m.name,\
         n.id as scheduleID\
    FROM \
    course m join v_course_schedule n \
    on m.id = n.course_id \
    where n.src_date = '"+date+"'\
      and m.teacher_id = '"+teacherID+"'"
  connection.query(SQL_getAllByWeekAndTeacherIDByDate,function (error, reses) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!reses || (reses.length === 0)) {
      var SQL_getAllByWeekAndTeacherIDByWeek = "SELECT \
        m.id, \
        n.even_used, \
        n.classroom_id, \
        m.name,\
         n.id as scheduleID\
      FROM \
      course m join v_course_schedule n \
      on m.id = n.course_id \
      where n.day_of_week = "+week+"\
        and m.teacher_id = '"+teacherID+"'"
      connection.query(SQL_getAllByWeekAndTeacherIDByWeek,function (err, Coursees) {
        if (err) {
          logger.error(error,"LOG AT:"+__filename+":"+__line);
          return callback(err, null);
        }
        if (!Coursees || (Coursees.length === 0)) {
          return callback(null, null);
        }
        logger.error('getAllByWeekAndTeacherIDByWeek',"LOG AT:"+__filename+":"+__line);
        return callback(null, Coursees);
      })
    }else{
      logger.error('getAllByWeekAndTeacherIDByDate',"LOG AT:"+__filename+":"+__line);
      return callback(null, reses);
    }
  })
}

exports.getAllByClassID = function (classID,callback) {
  if (!classID) {
    logger.error('null classID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null classID'), null);
  }
  var SQL_getAllByClassID = "select DISTINCT course_id \
  from student_course \
  where student_id in \
  ( select id \
  from student where class_id = ?) "
  connection.query(SQL_getAllByClassID, classID,function (error, Coursees) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Coursees || (Coursees.length === 0)) {
      return callback(null, null);
    }
    callback(null, Coursees);
  })
}

exports.getAllByStudentID = function (studentID,callback) {
  if (!studentID) {
    logger.error('null studentID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null studentID'), null);
  }
  var SQL_getAllByStudentID = "select DISTINCT course_id \
  from student_course \
  where student_id = ?"
  connection.query(SQL_getAllByStudentID  , studentID,function (error, Coursees) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Coursees || (Coursees.length === 0)) {
      return callback(null, null);
    }
    callback(null, Coursees);
  })
}

//根据学院id获取课程
exports.getByCollegeID = function (collegeID,callback) {
  if (!collegeID) {
    logger.error('null courseID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null collegeID'), null);
  }
  var SQL_getAllByCourseID = "select r.*,t.teacherName \
  from \
  ( \
      select g.*,h.name as courseName,h.teacher_id \
  from ( \
      select d.*,f.course_id \
  from ( \
      SELECT \
  o.*, p.name AS collegeName \
  FROM\
  (\
      SELECT \
  r.*, t.department_id \
  FROM \
  (\
      SELECT \
  j.*, k.name AS className, \
      k.grade, \
      k.subject_id \
  FROM \
  (\
      SELECT \
  m.student_id, \
      n.name, \
      m.class_id, \
      n.phone, \
      m.id, \
      n.id AS userid \
  FROM \
  student m \
  JOIN USER n ON m.user_id = n.id \
  WHERE \
  class_id IN ( \
      SELECT \
  id \
  FROM \
  class \
  WHERE \
  subject_id IN ( \
      SELECT \
  id \
  FROM \
  SUBJECT \
  WHERE \
  department_id IN ( \
      SELECT \
  id \
  FROM \
  department \
  WHERE \
  id = '"+collegeID+"' \
  ) \
  ) \
  ) \
  ) j \
  JOIN class k ON j.class_id = k.id \
  ) r \
  JOIN SUBJECT t ON r.subject_id = t.id \
  ) o \
  JOIN department p ON o.department_id = p.id \
  ) d join \
  student_course \
  f on d.id = f.student_id \
  ) g join course h on g.course_id = h.id \
  ) r  join ( \
      select y.name as teacherName,u.id as teacherID from user y join teacher u on y.id = u.user_id \
  ) t on r.teacher_id = t.teacherID";


//  logger.info('SQL_getAllByCourseID:',SQL_getAllByCourseID);

  connection.query(SQL_getAllByCourseID ,function (error, Courses) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Courses || (Courses.length === 0)) {
      return callback(null, null);
    }
    callback(null, Courses);
  })
}


//根据辅导员id获取课程
exports.getByCounsellorID = function (counsellorID,callback) {
  if (!counsellorID) {
    logger.error('null counsellorID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null counsellorID'), null);
  }
  var SQL_getByCounsellorID = "select r.*,t.teacherName \
  from \
  ( \
      select g.*,h.name as courseName,h.teacher_id \
  from ( \
      select d.*,f.course_id \
  from ( \
      SELECT \
  o.*, p.name AS collegeName \
  FROM\
  (\
      SELECT \
  r.*, t.department_id \
  FROM \
  (\
      SELECT \
  j.*, k.name AS className, \
      k.grade, \
      k.subject_id \
  FROM \
  (\
      SELECT \
  m.student_id, \
      n.name, \
      m.class_id, \
      n.phone, \
      m.id, \
      n.id AS userid \
  FROM \
  student m \
  JOIN user n ON m.user_id = n.id \
  WHERE \
  class_id IN ( \
      SELECT \
  id \
  FROM \
  class \
  WHERE \
  subject_id IN ( \
      SELECT \
  id \
  FROM \
  SUBJECT \
  WHERE \
  department_id IN ( \
      SELECT \
  id \
  FROM \
  department \
  WHERE \
  id = ( select department_id from counsellor where id = '"+counsellorID+"') \
  ) \
  ) \
  ) \
  ) j \
  JOIN class k ON j.class_id = k.id \
  ) r \
  JOIN SUBJECT t ON r.subject_id = t.id \
  ) o \
  JOIN department p ON o.department_id = p.id \
  ) d join \
  student_course \
  f on d.id = f.student_id \
  ) g join course h on g.course_id = h.id \
  ) r  join ( \
      select y.name as teacherName,u.id as teacherID from user y join teacher u on y.id = u.user_id \
  ) t on r.teacher_id = t.teacherID";

//  logger.info('SQL_getAllByCourseID:',SQL_getAllByCourseID);

  connection.query(SQL_getByCounsellorID ,function (error, Courses) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Courses || (Courses.length === 0)) {
      return callback(null, null);
    }
    callback(null, Courses);
  })

}

//根据专业获取课程
exports.getBySubjectID = function (subjectID,callback) {
  if (!subjectID) {
    logger.error('null courseID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null subjectID'), null);
  }
  var SQL_getBySubjectID = "select r.*,t.teacherName \
  from \
  ( \
      select g.*,h.name as courseName,h.teacher_id \
  from ( \
      select d.*,f.course_id \
  from ( \
      SELECT \
  o.*, p.name AS collegeName \
  FROM\
  (\
      SELECT \
  r.*, t.department_id \
  FROM \
  (\
      SELECT \
  j.*, k.name AS className, \
      k.grade, \
      k.subject_id \
  FROM \
  (\
      SELECT \
  m.student_id, \
      n.name, \
      m.class_id, \
      n.phone, \
      m.id, \
      n.id AS userid \
  FROM \
  student m \
  JOIN user n ON m.user_id = n.id \
  WHERE \
  class_id IN ( \
      SELECT \
  id \
  FROM \
  class \
  WHERE \
  subject_id = '"+subjectID+"' \
  ) \
  ) j \
  JOIN class k ON j.class_id = k.id \
  ) r \
  JOIN SUBJECT t ON r.subject_id = t.id \
  ) o \
  JOIN department p ON o.department_id = p.id \
  ) d join \
  student_course \
  f on d.id = f.student_id \
  ) g join course h on g.course_id = h.id \
  ) r  join ( \
      select y.name as teacherName,u.id as teacherID from user y join teacher u on y.id = u.user_id \
  ) t on r.teacher_id = t.teacherID";


  connection.query(SQL_getBySubjectID ,function (error, Courses) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Courses || (Courses.length === 0)) {
      return callback(null, null);
    }
    callback(null, Courses);
  })
}

//根据专业年级获取课程
exports.getBySubjectIDAndGrade = function (subjectID,grade,callback) {
  if (!subjectID) {
    logger.error('null courseID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null subjectID'), null);
  }
  if (!grade) {
    logger.error('null grade',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null grade'), null);
  }
  var SQL_getBySubjectID = "select r.*,t.teacherName \
  from \
  ( \
      select g.*,h.name as courseName,h.teacher_id \
  from ( \
      select d.*,f.course_id \
  from ( \
      SELECT \
  o.*, p.name AS collegeName \
  FROM\
  (\
      SELECT \
  r.*, t.department_id \
  FROM \
  (\
      SELECT \
  j.*, k.name AS className, \
      k.grade, \
      k.subject_id \
  FROM \
  (\
      SELECT \
  m.student_id, \
      n.name, \
      m.class_id, \
      n.phone, \
      m.id, \
      n.id AS userid \
  FROM \
  student m \
  JOIN user n ON m.user_id = n.id \
  WHERE \
  class_id IN ( \
      SELECT \
  id \
  FROM \
  class \
  WHERE \
  subject_id = '"+subjectID+"' and grade = "+grade+" \
  ) \
  ) j \
  JOIN class k ON j.class_id = k.id \
  ) r \
  JOIN SUBJECT t ON r.subject_id = t.id \
  ) o \
  JOIN department p ON o.department_id = p.id \
  ) d join \
  student_course \
  f on d.id = f.student_id \
  ) g join course h on g.course_id = h.id \
  ) r  join ( \
      select y.name as teacherName,u.id as teacherID from user y join teacher u on y.id = u.user_id \
  ) t on r.teacher_id = t.teacherID";


  connection.query(SQL_getBySubjectID ,function (error, Courses) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Courses || (Courses.length === 0)) {
      return callback(null, null);
    }
    callback(null, Courses);
  })
}
//根据班级获取课程
exports.getByClassID = function (classID,callback) {
  if (!classID) {
    logger.error('null classID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null classID'), null);
  }
  var SQL_getBySubjectID = "select r.*,t.teacherName \
  from \
  ( \
      select g.*,h.name as courseName,h.teacher_id \
  from ( \
      select d.*,f.course_id \
  from ( \
      SELECT \
  o.*, p.name AS collegeName \
  FROM\
  (\
      SELECT \
  r.*, t.department_id \
  FROM \
  (\
      SELECT \
  j.*, k.name AS className, \
      k.grade, \
      k.subject_id \
  FROM \
  (\
      SELECT \
  m.student_id, \
      n.name, \
      m.class_id, \
      n.phone, \
      m.id, \
      n.id AS userid \
  FROM \
  student m \
  JOIN user n ON m.user_id = n.id \
  WHERE \
  class_id = '"+classID+"' \
  ) j \
  JOIN class k ON j.class_id = k.id \
  ) r \
  JOIN SUBJECT t ON r.subject_id = t.id \
  ) o \
  JOIN department p ON o.department_id = p.id \
  ) d join \
  student_course \
  f on d.id = f.student_id \
  ) g join course h on g.course_id = h.id \
  ) r  join ( \
      select y.name as teacherName,u.id as teacherID from user y join teacher u on y.id = u.user_id \
  ) t on r.teacher_id = t.teacherID";


  connection.query(SQL_getBySubjectID ,function (error, Courses) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Courses || (Courses.length === 0)) {
      return callback(null, null);
    }
    callback(null, Courses);
  })
}

//根据学生获取课程
exports.getByStudentID = function (studentID,callback) {
  if (!studentID) {
    logger.error('null studentID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null studentID'), null);
  }
  var SQL_getBySubjectID = "select r.*,t.teacherName \
  from \
  ( \
      select g.*,h.name as courseName,h.teacher_id \
  from ( \
      select d.*,f.course_id \
  from ( \
      SELECT \
  o.*, p.name AS collegeName \
  FROM\
  (\
      SELECT \
  r.*, t.department_id \
  FROM \
  (\
      SELECT \
  j.*, k.name AS className, \
      k.grade, \
      k.subject_id \
  FROM \
  (\
      SELECT \
  m.student_id, \
      n.name, \
      m.class_id, \
      n.phone, \
      m.id, \
      n.id AS userid \
  FROM \
  student m \
  JOIN user n ON m.user_id = n.id \
  WHERE \
    m.id = '"+studentID+"' \
  ) j \
  JOIN class k ON j.class_id = k.id \
  ) r \
  JOIN SUBJECT t ON r.subject_id = t.id \
  ) o \
  JOIN department p ON o.department_id = p.id \
  ) d join \
  student_course \
  f on d.id = f.student_id \
  ) g join course h on g.course_id = h.id \
  ) r  join ( \
      select y.name as teacherName,u.id as teacherID from user y join teacher u on y.id = u.user_id \
  ) t on r.teacher_id = t.teacherID";

  logger.error("SQL_getBySubjectID:",SQL_getBySubjectID);

  connection.query(SQL_getBySubjectID ,function (error, Courses) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Courses || (Courses.length === 0)) {
      return callback(null, null);
    }
    callback(null, Courses);
  })
}

exports.getQueryAll = function (callback) {

  var SQL_getBySubjectID = "SELECT \
  r.*, t.teacherName \
  FROM \
  ( \
      SELECT \
  g.*, h.name AS courseName, \
      h.teacher_id \
  FROM \
  (SELECT  MAX(course_id) as course_id FROM student_course GROUP BY course_id) g \
  JOIN course h ON g.course_id = h.id \
  ) r \
  LEFT JOIN ( \
      SELECT \
  y.name AS teacherName, \
      u.id AS teacherID \
  FROM \
  user y \
  JOIN teacher u ON y.id = u.user_id \
  ) t ON r.teacher_id = t.teacherID";


  connection.query(SQL_getBySubjectID ,function (error, Courses) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Courses || (Courses.length === 0)) {
      return callback(null, null);
    }
    callback(null, Courses);
  })
}

//getCoursesByCounsellorID

//exports.getAllByCondition = function(condition,callBack){
//  var arrays = [
//    {
//      id : 'sadsaf',
//      courseName : '大学语文',
//      collegeName : 'qwe',
//      teacherName : 'qwr'
//    },
//    {
//      id : 'dfsfsf',
//      courseName : '高等数学',
//      collegeName : 'er',
//      teacherName : 'tret'
//    },
//    {
//      id : 'sfasda',
//      courseName : '大学英语',
//      collegeName : 'rey',
//      teacherName : 'ret'
//    }
//  ];
//  callBack(null,arrays);
//}



exports.getByCollegeID = function (page,limit,collegeID, callback) {
  if (!collegeID) {
    logger.error('null collegeID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null collegeID'), null);
  }
  var SQL_selectAllCoursesByteacherID = "select o.name,o.typeName,o.teacherName,o.takeAttendTypeName,o.intervalAttendTypeName, \
  o.dismissAttendTypeName,o.statusName,p.name as collegeName,o.id \
  from ( \
      select  m.name, \
  case m.type \
  when 0 then '公共选修课' \
  when 1 then '公共任选课' \
  when 2 then '专业必修课' \
  when 3 then '专业选修课' \
  end as typeName, \
  m.type,\
      n.name as teacherName, \
      n.department_id, \
  case m.take_attend_type \
  when 0 then '默认' \
  when 1 then '全部' \
  when 2 then '抽查' \
  end as takeAttendTypeName, \
  m.take_attend_type as takeAttendType,\
  case m.interval_attend_type \
  when 0 then '默认' \
  when 1 then '全部' \
  when 2 then '抽查' \
  end as intervalAttendTypeName, \
  m.interval_attend_type as intervalAttendType, \
  case m.dismiss_attend_type \
  when 0 then '默认' \
  when 1 then '全部' \
  when 2 then '抽查' \
  end as dismissAttendTypeName, \
  m.dismiss_attend_type as dismissAttendType ,\
  case m.status \
  when 0 then '正常' \
  when 1 then '暂停' \
  when 2 then '撤销' \
  end as statusName, \
      m.id \
  from course m join ( \
      select j.id,j.department_id,k.name from teacher j join user k on j.user_id = k.id where j.department_id = '"+collegeID+"' \
  ) n on m.teacher_id = n.id \
  ) o join department p on o.department_id = p.id \
  limit "+(page*limit)+","+ limit
  connection.query(SQL_selectAllCoursesByteacherID, function (error, Coursees) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Coursees || (Coursees.length === 0)) {
      return callback(null, null);
    }
    callback(null, Coursees);
  })
}

exports.getTotalByCollegeID = function (collegeID,callback) {
  if (!collegeID) {
    logger.error('null collegeID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null collegeID'), null);
  }
  var SQL_getTotalCourses = "select  COUNT(m.id) as total \
  from course m join ( \
      select j.id,j.department_id,k.name from teacher j join user k on j.user_id = k.id where j.department_id = '"+collegeID+"' \
  ) n on m.teacher_id = n.id"
  connection.query(SQL_getTotalCourses, function (error, totals) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!totals || (totals.length === 0) ) {
      return callback(null, null)
    }
    var total = totals[0]
    callback(null, total.total)
  })
}