var connection = require("../utils/dbUtils").connection;
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * 插入一条校区记录
 * @param StudentCourse
 * @param callback
 */
exports.insertStudentCourse = function (students,courseID, callback,option) {
  var insertData = []
  if(!!students){
    if(!!option){
      students.forEach(function(value,index){
        insertData[index] = [
          kit.getUUid(),
          value,
          courseID,
          kit.getNowFormatDate()
        ]
      })
    }else{
      students.forEach(function(value,index){
        insertData[index] = [
          kit.getUUid(),
          value.id,
          courseID,
          kit.getNowFormatDate()
        ]
      })
    }
    var SQL_delete = "delete from student_course where course_id = ?"
    var SQL_insertStudentCourse = "INSERT INTO student_course (id,student_id,course_id,create_time)  VALUES ?";
    connection.query(SQL_delete,courseID , function (error, result) {
      if (error) {
        logger.error(error,"LOG AT:"+__filename+":"+__line);
        return callback(error, null);
      }
      if(!!students){
        connection.query(SQL_insertStudentCourse, [insertData], function (error, result) {
          if (error) {
            logger.error(error,"LOG AT:"+__filename+":"+__line);
            return callback(error, null);
          }
          return callback(null, result);
        })
      }else{
        logger.error(error,"LOG AT:"+__filename+":"+__line);
        return callback(new Error('null students'), null);
      }
    })
  }else{
    logger.error('null students',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null students'), null);
  }
}

exports.deleteStudentCourseById = function (id, callback) {
  if (!id) {
    logger.error('null id',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null id'), null);
  }
  var SQL_deleteStudentCourseById = "delete from v_course_schedule where id = ?"
  connection.query(SQL_deleteStudentCourseById, id, function (error, result) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    callback(error, result);
  })
}

exports.selectAllStudentCourses = function (page,limit, callback) {
  var SQL_selectAllStudentCourses = "select \
  case c.day_of_week \
  when 0 then '周一' \
  when 1 then '周二' \
  when 2 then '周三' \
  when 3 then '周四' \
  when 4 then '周五' \
  when 5 then '周六' \
  when 6 then '周日' \
  end as dayOfWeekName, \
      c.courseName, \
      c.teacherName, \
      c.classroomName, \
  case c.even_used \
  when 0 then '单周' \
  when 1 then '双周' \
  end as evenUsedName, \
      c.startTime, \
      v.name as endTime, \
  case c.status \
  when 0 then '正常' \
  when 1 then '暂停' \
  when 2 then '撤销' \
  when 3 then '临时调整' \
  end as statusName, \
      c.id \
  from ( \
      select z.*,x.name as startTime \
  from ( \
      select a.*,b.serial_number as classroomName \
  from ( \
      select m.classroom_id,m.day_of_week,m.end,m.even_used,m.id,m.start,m.status, \
      n.name as courseName,n.teacherName \
  from v_course_schedule m join \
  ( \
      select j.id,j.name,k.name as teacherName from course j join ( \
      select q.id,w.name from teacher q join user w on q.user_id = w.id \
  ) k on j.teacher_id = k.id \
  ) \
  n on m.course_id = n.id \
  ) a join classroom b on a.classroom_id = b.id \
  ) z join daily_schedule x on z.start = x.id \
  ) c join daily_schedule v on c.end = v.id \
  limit "+(page*limit)+","+ limit
  connection.query(SQL_selectAllStudentCourses, function (error, StudentCoursees) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!StudentCoursees || (StudentCoursees.length === 0)) {
      return callback(null, null);
    }
    callback(null, StudentCoursees);
  })
}

exports.getTotal = function (callback) {
  var SQL_getTotalStudentCourses = "select COUNT(id) as total  from v_course_schedule "
  connection.query(SQL_getTotalStudentCourses, function (error, totals) {
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


exports.updateStudentCourseById = function (StudentCourse, callback) {
  if (!StudentCourse) {
    logger.error('null StudentCourse',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null StudentCourse'), null);
  }
  var SQL_updateCategoryById = "update v_course_schedule set ? where id = " + connection.escape(StudentCourse.id);
  var updateData = {
    even_used : StudentCourse.evenUsed ,
    day_of_week : StudentCourse.dayOfWeek,
    start : StudentCourse.start.id,
    end : StudentCourse.end.id,
    status : StudentCourse.status,
    course_id : StudentCourse.course.id,
    classroom_id : StudentCourse.classroom.id
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
  var SQL_selectAll = "select m.id,m.name from daily_StudentCourse m join campus n on m.campus_id = n.id"
  connection.query(SQL_selectAll, function (error, StudentCoursees) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!StudentCoursees || (StudentCoursees.length === 0)) {
      return callback(null, null);
    }
    callback(null, StudentCoursees);
  })
}

exports.getAllCourseIDByCourseID = function (courseID,callback) {
  var SQL_getAllCourseIDByCourseID = "select course_id as id from student_course \
  where student_id in ( \
      select student_id from student_course where course_id = '"+courseID+"')"
  connection.query(SQL_getAllCourseIDByCourseID, function (error, courseIDs) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!courseIDs || (courseIDs.length === 0)) {
      return callback(null, null);
    }
    callback(null, courseIDs);
  })
}

exports.getAllStartByCourseID = function (courseIDs,week,callback) {
  var SQL_getAllCourseIDByCourseID = "select t.start\
  from v_course_schedule t \
  where t.course_id in "+kit.getInfilter(courseIDs)+"  and t.day_of_week = "+week
  connection.query(SQL_getAllCourseIDByCourseID, function (error, starts) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!starts || (starts.length === 0)) {
      return callback(null, null);
    }
    callback(null, starts);
  })
}

exports.getAllEndByCourseID = function (courseIDs,week,callback) {
  var SQL_getAllCourseIDByCourseID = "select t.end\
  from v_course_schedule t \
  where t.course_id in "+kit.getInfilter(courseIDs)+"  and t.day_of_week = "+week
  connection.query(SQL_getAllCourseIDByCourseID, function (error, end) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!end || (end.length === 0)) {
      return callback(null, null);
    }
    callback(null, end);
  })
}