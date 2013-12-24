var connection = require("../utils/dbUtils").connection;
var kit = require("../utils/kit");
var CourseSchedule = require("./courseSchedule");
var logger = kit.getLogger();

/**
 * 插入一条校区记录
 * @param TransferCourses
 * @param callback
 */
exports.insertTransferCourses = function (TransferCourses, callback) {
  var setData = {
    id : kit.getUUid() , //随机主键
    even_used : TransferCourses.evenUsed ,
    day_of_week : kit.getWeek(TransferCourses.destDate) ,
    start : TransferCourses.start,
    end : TransferCourses.end,
    status : 4, //未审核
    course_id : TransferCourses.courseID,
    classroom_id : TransferCourses.classroomID,
    dest_date : kit.getDateFromSecond(TransferCourses.destDate),
    src_date : kit.getDateFromSecond(TransferCourses.srcDate),
    src_id : TransferCourses.srcID,
    create_time : kit.getNowFormatDate() //当前时间作为创建时间
  }
  var SQL_insertTransferCourses = "insert into course_schedule set ?";
  connection.query(SQL_insertTransferCourses, setData, function (error, result) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    return callback(error, result);
  })
}

exports.deleteTransferCoursesById = function (id, callback) {
  if (!id) {
    logger.error('null id',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null id'), null);
  }
  var SQL_deleteTransferCoursesById = "delete from daily_TransferCourses where id = ?"
  connection.query(SQL_deleteTransferCoursesById, id, function (error, result) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    callback(error, result);
  })
}

exports.selectAllTransferCoursess = function (page,limit, callback) {
  var SQL_selectAllTransferCoursess = "select \
  d.dayOfWeekName as desDayOfWeekName, \
      d.courseName as desCourseName,\
      d.teacherName as desTeacherName,\
      d.classroomName as desClassroomName,\
      d.startTime as desStartTime,\
      d.endTime as desEndTime,\
      s.*\
  from\
  (\
      select\
  case c.day_of_week\
  when 1 then '周一'\
  when 2 then '周二'\
  when 3 then '周三'\
  when 4 then '周四'\
  when 5 then '周五'\
  when 6 then '周六'\
  when 7 then '周日'\
  end as dayOfWeekName,\
      c.courseName,\
      c.teacherName,\
      c.classroomName,\
  case c.even_used\
  when 0 then '单周'\
  when 1 then '双周'\
  end as evenUsedName,\
      c.startTime,\
      v.name as endTime,\
  case c.status\
  when 0 then '正常'\
  when 1 then '暂停'\
  when 2 then '撤销'\
  when 3 then '临时调整'\
  when 4 then '未审核'\
  end as statusName,\
      c.id ,\
      c.src_id\
  from (\
      select z.*,x.name as startTime\
  from (\
      select a.*,b.serial_number as classroomName\
  from (\
      select m.classroom_id,m.day_of_week,m.end,m.even_used,m.id,m.start,m.status,\
      n.name as courseName,m.src_id,n.teacherName\
  from course_schedule m join\
  (\
      select j.id,j.name,k.name as teacherName from course j join (\
      select q.id,w.name from teacher q join user w on q.user_id = w.id\
  ) k on j.teacher_id = k.id\
  )\
  n on m.course_id = n.id\
  ) a join classroom b on a.classroom_id = b.id\
  ) z join daily_schedule x on z.start = x.id\
  ) c join daily_schedule v on c.end = v.id where c.status = 4\
  ) s left join (\
      select\
  case c.day_of_week\
  when 1 then '周一'\
  when 2 then '周二'\
  when 3 then '周三'\
  when 4 then '周四'\
  when 5 then '周五'\
  when 6 then '周六'\
  when 7 then '周日'\
  end as dayOfWeekName,\
      c.courseName,\
      c.teacherName,\
      c.classroomName,\
  case c.even_used\
  when 0 then '单周'\
  when 1 then '双周'\
  end as evenUsedName,\
      c.startTime,\
      v.name as endTime,\
  case c.status\
  when 0 then '正常'\
  when 1 then '暂停'\
  when 2 then '撤销'\
  when 3 then '临时调整'\
  when 4 then '未审核'\
  end as statusName,\
      c.id\
  from (\
      select z.*,x.name as startTime\
  from (\
      select a.*,b.serial_number as classroomName\
  from (\
      select m.classroom_id,m.day_of_week,m.end,m.even_used,m.id,m.start,m.status,\
      n.name as courseName,n.teacherName\
  from course_schedule m join\
  (\
      select j.id,j.name,k.name as teacherName from course j join (\
      select q.id,w.name from teacher q join user w on q.user_id = w.id\
  ) k on j.teacher_id = k.id\
  )\
  n on m.course_id = n.id\
  ) a join classroom b on a.classroom_id = b.id\
  ) z join daily_schedule x on z.start = x.id\
  ) c join daily_schedule v on c.end = v.id\
  ) d on s.src_id = d.id\
  where s.src_id is not null\
  limit "+(page*limit)+","+ limit
  connection.query(SQL_selectAllTransferCoursess, function (error, TransferCourseses) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!TransferCourseses || (TransferCourseses.length === 0)) {
      return callback(null, null);
    }
    callback(null, TransferCourseses);
  })
}

exports.getTotal = function (callback) {
  var SQL_getTotalTransferCoursess = "select \
  COUNT(m.id) as total \
  from course_schedule m left join course_schedule n \
  on m.src_id = m.id \
  where m.src_id is not null and m.status = 4"
  connection.query(SQL_getTotalTransferCoursess, function (error, totals) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!totals || (totals.length === 0) ) {
      return callback(null, null)
    }
    var total = totals[0];
    callback(null, total.total)
  })
}


exports.updateTransferCoursesById = function (TransferCourses, callback) {
  if (!TransferCourses) {
    logger.error('null TransferCourses',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null TransferCourses'), null);
  }
  var SQL_updateCategoryById = "update daily_TransferCourses set ? where id = " + connection.escape(TransferCourses.id);
  var updateData = {
    serial_number : TransferCourses.serial_number ,
    name : TransferCourses.name,
    start : TransferCourses.start,
    end : TransferCourses.end,
    season : TransferCourses.season.code,
    campus_id : TransferCourses.campus.id
  }
  connection.query(SQL_updateCategoryById, updateData, function (error, result) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    return callback(error, result);
  })
}


exports.pass = function (id, callback) {
  if (!id) {
    logger.error('null id',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null id'), null);
  }
  var updateData = {
    status : 3
  }
  var SQL_pass = "update course_schedule set ? where id = " + connection.escape(id);
  connection.query(SQL_pass, updateData, function (error, result) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    return callback(error, result);
  })

}
/**
 * 调课审核通过后插入一条暂停数据
 * @param id
 * @param callback
 */
exports.insertTransferPause = function (id, callback) {
  CourseSchedule.findByID(id,function(error, result){
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    var setData = {
      id : kit.getUUid() , //随机主键
      even_used : result.even_used ,
      day_of_week : result.day_of_week ,
      start : result.start,
      end : result.end,
      status : 1, //未审核
      course_id : result.course_id,
      classroom_id : result.classroom_id,
      dest_date : result.dest_date,
      src_date : result.src_date,
      src_id : result.src_id,
      create_time : kit.getNowFormatDate() //当前时间作为创建时间
    }
    var SQL_insertTransferCourses = "insert into course_schedule set ?";
    connection.query(SQL_insertTransferCourses, setData, function (error, result) {
      if (error) {
        logger.error(error,"LOG AT:"+__filename+":"+__line);
        return callback(error, null);
      }
      return callback(error, result);
    })
  })
}

exports.refused = function (id, callback) {
  if (!id) {
    logger.error('null id',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null id'), null);
  }
  var updateData = {
    status : 0
  }
  var SQL_refused = "delete from  course_schedule where id = " + connection.escape(id);
  connection.query(SQL_refused, updateData, function (error, result) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    return callback(error, result);
  })

}

exports.getAll = function (callback) {
  var SQL_selectAll = "select m.id,m.name from daily_TransferCourses m join campus n on m.campus_id = n.id"
  connection.query(SQL_selectAll, function (error, TransferCourseses) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!TransferCourseses || (TransferCourseses.length === 0)) {
      return callback(null, null);
    }
    callback(null, TransferCourseses);
  })
}

exports.getAllFree = function (starts,ends,callback) {
  var startsArr = [];
  for(var i= 0,len=starts.length;i<len;i++){
    startsArr[i] = starts[i].start;
  }
  var endsArr = [];
  for(var i= 0,len=ends.length;i<len;i++){
    endsArr[i] = ends[i].end;
  }
  var arr = startsArr + endsArr;
  var SQL_getAllFree = "select *,CONCAT(start,'-',end) as time \
  from daily_TransferCourses \
  where id not in "+kit.getInfilter(startsArr)+" and id not in  "+kit.getInfilter(endsArr)
  connection.query(SQL_getAllFree, function (error, TransferCourseses) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!TransferCourseses || (TransferCourseses.length === 0)) {
      return callback(null, null);
    }
    callback(null, TransferCourseses);
  })
}

exports.getTransferAheadDays = function (callback) {

  var SQL_getTransferAheadDays = "select s_value as days from website_setting where s_key = 'teacherChangeCourseDay'"

  connection.query(SQL_getTransferAheadDays, function (error, leaveAheadDays) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!leaveAheadDays || (leaveAheadDays.length === 0)) {
      return callback(null, null);
    }
    var leaveAheadDay = leaveAheadDays[0];
    callback(null, leaveAheadDay);
  })

}