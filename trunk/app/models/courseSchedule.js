var connection = require("../utils/dbUtils").connection;
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * 插入一条课程表记录
 * @param CourseSchedule
 * @param callback
 */
exports.insertCourseSchedule = function (CourseSchedule, callback) {
  var setData = {
    id: kit.getUUid(), //随机主键
    even_used: CourseSchedule.evenUsed,
    day_of_week: CourseSchedule.dayOfWeek.code,
    start: CourseSchedule.start.id,
    end: CourseSchedule.end.id,
    status: CourseSchedule.status.code,
    course_id: CourseSchedule.course.id,
    classroom_id: CourseSchedule.classroom.id,
    create_time: kit.getNowFormatDate() //当前时间作为创建时间
  }

  var SQL_isExist = "select * from course_schedule where day_of_week = " + CourseSchedule.dayOfWeek.code + " " +
      "and course_id = '" + CourseSchedule.course.id + "' and start = '" + CourseSchedule.start.id + "' and end = '" + CourseSchedule.end.id + "'"


  connection.query(SQL_isExist, function (error, exist) {
    if (error) {
      logger.error(error, "LOG AT:" + __filename + ":" + __line);
      return callback(error, null);
    }

    logger.error("exist:", exist);

    if (exist.length > 0) {
//      logger.error('@@@@@%%%%%%%%already exist',"LOG AT:"+__filename+":"+__line);
      return callback(null, 'already exist');
    }
    var SQL_insertCourseSchedule = "insert into course_schedule set ?";
    connection.query(SQL_insertCourseSchedule, setData, function (error, result) {
      if (error) {
        logger.error(error, "LOG AT:" + __filename + ":" + __line);
        return callback(error, null);
      }
      return callback(error, result);
    })

    return callback(error, null);
  })


}

exports.deleteCourseScheduleById = function (id, callback) {
  if (!id) {
    logger.error('null id', "LOG AT:" + __filename + ":" + __line);
    return callback(new Error('null id'), null);
  }
  var SQL_deleteCourseScheduleById = "delete from course_schedule where id = ?"
  connection.query(SQL_deleteCourseScheduleById, id, function (error, result) {
    if (error) {
      logger.error(error, "LOG AT:" + __filename + ":" + __line);
      return callback(error, null);
    }
    callback(error, result);
  })
}

exports.selectAllCourseSchedules = function (page, limit, callback) {
  var SQL_selectAllCourseSchedules = "select \
  case c.day_of_week \
  when 1 then '周一' \
  when 2 then '周二' \
  when 3 then '周三' \
  when 4 then '周四' \
  when 5 then '周五' \
  when 6 then '周六' \
  when 7 then '周日' \
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
  when 4 then '未审核' \
  end as statusName, \
      c.id \
  from ( \
      select z.*,x.name as startTime \
  from ( \
      select a.*,b.serial_number as classroomName \
  from ( \
      select m.classroom_id,m.day_of_week,m.end,m.even_used,m.id,m.start,m.status, \
      n.name as courseName,n.teacherName \
  from course_schedule m join \
  ( \
      select j.id,j.name,k.name as teacherName from course j join ( \
      select q.id,w.name from teacher q join user w on q.user_id = w.id \
  ) k on j.teacher_id = k.id \
  ) \
  n on m.course_id = n.id where m.src_id is null  \
  ) a join classroom b on a.classroom_id = b.id \
  ) z join daily_schedule x on z.start = x.id \
  ) c join daily_schedule v on c.end = v.id \
  limit " + (page * limit) + "," + limit
  connection.query(SQL_selectAllCourseSchedules, function (error, CourseSchedulees) {
    if (error) {
      logger.error(error, "LOG AT:" + __filename + ":" + __line);
      return callback(error, null);
    }
    if (!CourseSchedulees || (CourseSchedulees.length === 0)) {
      return callback(null, null);
    }
    callback(null, CourseSchedulees);
  })
}

exports.getTotal = function (callback) {
  var SQL_getTotalCourseSchedules = "select \
      count(c.id) as total \
  from ( \
      select z.*,x.name as startTime \
  from ( \
      select a.*,b.serial_number as classroomName \
  from ( \
      select m.classroom_id,m.day_of_week,m.end,m.even_used,m.id,m.start,m.status, \
      n.name as courseName,n.teacherName \
  from course_schedule m join \
  ( \
      select j.id,j.name,k.name as teacherName from course j join ( \
      select q.id,w.name from teacher q join user w on q.user_id = w.id \
  ) k on j.teacher_id = k.id \
  ) \
  n on m.course_id = n.id where m.src_id is null  \
  ) a join classroom b on a.classroom_id = b.id \
  ) z join daily_schedule x on z.start = x.id \
  ) c join daily_schedule v on c.end = v.id"
  connection.query(SQL_getTotalCourseSchedules, function (error, totals) {
    if (error) {
      logger.error(error, "LOG AT:" + __filename + ":" + __line);
      return callback(error, null);
    }
    if (!totals || (totals.length === 0)) {
      return callback(null, null)
    }
    var total = totals[0];
    callback(null, total.total)
  })
}

exports.updateCourseScheduleById = function (CourseSchedule, callback) {
  if (!CourseSchedule) {
    logger.error('null CourseSchedule', "LOG AT:" + __filename + ":" + __line);
    return callback(new Error('null CourseSchedule'), null);
  }

  var SQL_isExist = "select * from course_schedule where day_of_week = " + CourseSchedule.dayOfWeek.code + " " +
      "and course_id = '" + CourseSchedule.course.id + "' and start = '" + CourseSchedule.start.id + "' and end = '" + CourseSchedule.end.id + "'"


  connection.query(SQL_isExist, function (error, exist) {
    if (error) {
      logger.error(error, "LOG AT:" + __filename + ":" + __line);
      return callback(error, null);
    }

    logger.error("exist:", exist);

    if (exist.length > 0) {
//      logger.error('@@@@@%%%%%%%%already exist',"LOG AT:"+__filename+":"+__line);
      return callback(null, 'already exist');
    }

    var SQL_updateCategoryById = "update course_schedule set ? where id = " + connection.escape(CourseSchedule.id);
    var updateData = {
      even_used: CourseSchedule.evenUsed,
      day_of_week: CourseSchedule.dayOfWeek.code,
      start: CourseSchedule.start.id,
      end: CourseSchedule.end.id,
      status: CourseSchedule.status.code,
      course_id: CourseSchedule.course.id,
      classroom_id: CourseSchedule.classroom.id
    }
    connection.query(SQL_updateCategoryById, updateData, function (error, result) {
      if (error) {
        logger.error(error, "LOG AT:" + __filename + ":" + __line);
        return callback(error, null);
      }
      return callback(error, result);
    })

  })

}

exports.getAll = function (callback) {
  var SQL_selectAll = "select m.id,m.name from daily_CourseSchedule m join campus n on m.campus_id = n.id"
  connection.query(SQL_selectAll, function (error, CourseSchedulees) {
    if (error) {
      logger.error(error, "LOG AT:" + __filename + ":" + __line);
      return callback(error, null);
    }
    if (!CourseSchedulees || (CourseSchedulees.length === 0)) {
      return callback(null, null);
    }
    callback(null, CourseSchedulees);
  })
}

exports.findByID = function (id, callback) {
  var SQL_findByID = "select even_used,day_of_week,start \
      ,end,course_id,classroom_id,src_id, \
      date_format(dest_date,'%Y-%c-%d') as dest_date, \
      date_format(src_date,'%Y-%c-%d') as src_date \
  from course_schedule where id = ?"
  connection.query(SQL_findByID, id, function (error, CourseSchedulees) {
    if (error) {
      logger.error(error, "LOG AT:" + __filename + ":" + __line);
      return callback(error, null);
    }
    if (!CourseSchedulees || (CourseSchedulees.length === 0)) {
      return callback(null, null);
    }
    var CourseSchedule = CourseSchedulees[0];
    callback(null, CourseSchedule);
  })
}

exports.queryCourseSchedule = function (courseIDsArray, evenUsed, callback) {
  var SQL_queryCourseSchedule = "SELECT \
  o.timeName, \
      o.day_of_week, \
      o.sortNum, \
      p. NAME AS courseName, \
      o.course_id \
  FROM \
  ( \
      SELECT \
  j.*, CONCAT(j.startName, '-', time_format(k.end, '%H:%i')) AS timeName, \
      k.serial_number AS sortNum \
  FROM \
  ( \
      SELECT \
  m.*, time_format(n.start, '%H:%i') as startName \
  FROM \
  course_schedule m \
  JOIN daily_schedule n ON m. START = n.id \
  WHERE \
  m.src_id IS NULL and m.course_id IN " + kit.getInfilter(courseIDsArray) + " and m.even_used = " + evenUsed + "\
  ) j \
  JOIN daily_schedule k ON j.END = k.id \
  ) o \
  JOIN course p ON o.course_id = p.id \
  ORDER BY  o.sortNum "

  logger.error("SQL_queryCourseSchedule:", SQL_queryCourseSchedule);

  connection.query(SQL_queryCourseSchedule, function (error, CourseSchedulees) {
    if (error) {
      logger.error(error, "LOG AT:" + __filename + ":" + __line);
      return callback(error, null);
    }
    if (!CourseSchedulees || (CourseSchedulees.length === 0)) {
      return callback(null, null);
    }
    var schdedule = {
      _2: {
        timeName: "",
        Monday: "",
        Tuesday: "",
        Wednesday: "",
        Thursday: "",
        Friday: "",
        Saturday: ""
      },
      _4: {
        timeName: "",
        Monday: "",
        Tuesday: "",
        Wednesday: "",
        Thursday: "",
        Friday: "",
        Saturday: ""
      },
      _6: {
        timeName: "",
        Monday: "",
        Tuesday: "",
        Wednesday: "",
        Thursday: "",
        Friday: "",
        Saturday: ""
      },
      _8: {
        timeName: "",
        Monday: "",
        Tuesday: "",
        Wednesday: "",
        Thursday: "",
        Friday: "",
        Saturday: ""
      },
      _10: {
        timeName: "",
        Monday: "",
        Tuesday: "",
        Wednesday: "",
        Thursday: "",
        Friday: "",
        Saturday: ""
      }
    };

    logger.error("CourseSchedulees:", CourseSchedulees);

    CourseSchedulees.forEach(function (value) {
      switch (value.sortNum) {
        case 2 :
          if (!schdedule._2.timeName)
            schdedule._2.timeName = value.timeName;
          oneItem(value, schdedule._2);
          break;
        case 4 :
          if (!schdedule._4.timeName)
            schdedule._4.timeName = value.timeName;
          oneItem(value, schdedule._4);
          break;
        case 6 :
          if (!schdedule._6.timeName)
            schdedule._6.timeName = value.timeName;
          oneItem(value, schdedule._6);
          break;
        case 8 :
          if (!schdedule._8.timeName)
            schdedule._8.timeName = value.timeName;
          oneItem(value, schdedule._8);
          break;
        case 10 :
          if (!schdedule._10.timeName)
            schdedule._10.timeName = value.timeName;
          oneItem(value, schdedule._10);
          break;
      }
    });
    logger.error("schdedule:", schdedule);
    callback(null, schdedule);
  })
}

function oneItem(param, obj) {
  switch (param.day_of_week) {
    case 1 :
      obj.Monday = param.courseName;
      break;
    case 2 :
      obj.Tuesday = param.courseName;
      break;
    case 3 :
      obj.Wednesday = param.courseName;
      break;
    case 4 :
      obj.Thursday = param.courseName;
      break;
    case 5 :
      obj.Friday = param.courseName;
      break;
    case 6 :
      obj.Saturday = param.courseName;
      break;
  }
}

exports.findCourseTransferByCourseID = function (id, callback) {
  var SQL_findCourseTransferByCourseID = "select w.courseName,CONCAT(w.src_date,' ',q.srcTimeName) as srcTime ,CONCAT(w.dest_date,' ',w.destTimeName) as destTime \
  from ( \
      select o.timeName as srcTimeName,o.day_of_week,o.id \
  from \
  ( \
      select j.*,CONCAT(j.startName,'-',time_format(k.end, '%H:%i')) as timeName,k.serial_number as sortNum \
  from \
  ( \
      select m.*,time_format(n.start, '%H:%i') as startName \
  from course_schedule m join daily_schedule n \
  on m.start = n.id \
  ) j join daily_schedule k on j.end = k.id \
  ) o join course p on o.course_id = p.id \
  ) q right join \
  ( \
      select o.timeName as destTimeName,o.day_of_week,o.sortNum,p.name as courseName,o.src_id,date_format(o.dest_date,'%Y-%c-%d') as dest_date  ,date_format(o.src_date,'%Y-%c-%d') as src_date \
  from \
  ( \
      select j.*,CONCAT(j.startName,'-',time_format(k.end, '%H:%i')) as timeName,k.serial_number as sortNum \
  from \
  ( \
      select m.*,time_format(n.start, '%H:%i') as startName \
  from course_schedule m join daily_schedule n \
  on m.start = n.id \
  where m.status = 3 and m.course_id in " + kit.getInfilter(id) + " \
  ) j join daily_schedule k on j.end = k.id \
  ) o join course p on o.course_id = p.id \
  ) w on q.id = w.src_id"

  connection.query(SQL_findCourseTransferByCourseID, function (error, CourseSchedulees) {
    if (error) {
      logger.error(error, "LOG AT:" + __filename + ":" + __line);
      return callback(error, null);
    }
    if (!CourseSchedulees || (CourseSchedulees.length === 0)) {
      return callback(null, null);
    }
    callback(null, CourseSchedulees);
  })
}

exports.getIsEvenUsed = function (callback) {
  var SQL_getIsEvenUsed = "select s_value as value from website_setting where s_key = 'evenUsed'"
  connection.query(SQL_getIsEvenUsed, function (error, isEvenUseds) {
    if (error) {
      logger.error(error, "LOG AT:" + __filename + ":" + __line);
      return callback(error, null);
    }
    if (!isEvenUseds || (isEvenUseds.length === 0)) {
      return callback(null, null);
    }
    var isEvenUsed = isEvenUseds[0].value

    callback(null, isEvenUsed);
  })
}


exports.getColleageByUserID = function (id, callback) {
    if (!id) {
        logger.error('null id', "LOG AT:" + __filename + ":" + __line);
        return callback(new Error('null id'), null);
    }
    var SQL_getColleageByUserID = "select * from teacher t , department d where t.department_id = d.id and t.user_id = ?";
    connection.query(SQL_getColleageByUserID, id, function (error, result) {
        if (error) {
            logger.error(error, "LOG AT:" + __filename + ":" + __line);
            return callback(error, null);
        }
        callback(null, result);
    });
};


exports.getColleageByUserIDForCounsellor = function (id, callback) {
    if (!id) {
        logger.error('null id', "LOG AT:" + __filename + ":" + __line);
        return callback(new Error('null id'), null);
    }
    var SQL_getColleageByUserID = "select * from counsellor c , department d where c.department_id = d.id and c.user_id = ?";
    connection.query(SQL_getColleageByUserID, id, function (error, result) {
        if (error) {
            logger.error(error, "LOG AT:" + __filename + ":" + __line);
            return callback(error, null);
        }
        callback(null, result);
    });
};

