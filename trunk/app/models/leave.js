var connection = require("../utils/dbUtils").connection;
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * 插入一条校区记录
 * @param Leave
 * @param callback
 */
exports.insertLeave = function (leave,counsellorID, callback) {
    var insertLeave = {
      id : kit.getUUid() , //随机主键
      type: leave.type,
      start : kit.dateChange(leave.startDateTime) ,
      end : kit.dateChange(leave.endDateTime),
      reason : leave.reason,
      permit_time : kit.getNowFormatDate(),
      student_id : leave.student.id,
      permit_by_id : counsellorID,
      create_time : kit.getNowFormatDate() //当前时间作为创建时间
    }
    var SQL_insertLeave = "insert into leave_record set ?";
    connection.query(SQL_insertLeave, insertLeave, function (error, result) {
      if (error) {
        logger.error(error,"LOG AT:"+__filename+":"+__line);
        return callback(error, null);
      }
      return callback(error, result);
    })
}

exports.deleteLeaveById = function (leaveID, callback) {
  if (!leaveID) {
    logger.error('null leaveID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null leaveID'), null);
  }
    var SQL_deleteLeaveById = "delete from leave_record where id = ?"
    connection.query(SQL_deleteLeaveById , leaveID, function (error, result) {
      if (error) {
        logger.error(error,"LOG AT:"+__filename+":"+__line);
        return callback(error, null);
      }
      return callback(null, result)
    })
}

exports.selectAllLeaves = function (page,limit, callback) {
  var SQL_selectAllLeaves = "select o.studentName,CAST(o.type as CHAR(20)) as type, \
  case o.type \
  when 0 then '病假' \
  when 1 then '事假' \
  end as typeName, \
      date_format(o.start,'%Y-%m-%d %H:%i:%s') as startDateTime, \
      date_format(o.end,'%Y-%m-%d %H:%i:%s') as endDateTime, \
      o.reason, \
      p.counsellorName as permitName, \
      date_format(o.permit_time,'%Y-%m-%d %H:%i:%s')  as permitDate ,\
      o.id\
  from \
  ( \
      select * \
          from leave_record m join ( \
      select j.id as studentID,k.name as studentName from student j join user k on j.user_id = k.id \
  ) n on m.student_id = n.studentID \
  ) o join \
  ( \
      select j.id as counsellorID,k.name as counsellorName from counsellor j join user k on j.user_id = k.id \
  ) p on o.permit_by_id = p.counsellorID \
  limit "+(page*limit)+","+ limit
  connection.query(SQL_selectAllLeaves, function (error, Leavees) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Leavees || (Leavees.length === 0)) {
      return callback(null, null);
    }
    callback(null, Leavees);
  })
}

exports.getTotal = function (callback) {
  var SQL_getTotalLeaves = "select COUNT(o.studentName) as total \
  from \
  ( \
      select * \
          from leave_record m join ( \
      select j.id as studentID,k.name as studentName from student j join user k on j.user_id = k.id \
  ) n on m.student_id = n.studentID \
  ) o join \
  ( \
      select j.id as counsellorID,k.name as counsellorName from counsellor j join user k on j.user_id = k.id\
  ) p on o.permit_by_id = p.counsellorID "
  connection.query(SQL_getTotalLeaves, function (error, totals) {
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


exports.updateLeaveById = function (leave, callback) {
  if (!leave) {
    logger.error('null leave data',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null leave data'), null);
  }
  var updateData = {
    type: leave.type,
    start : kit.dateChange(leave.startDateTime) ,
    end : kit.dateChange(leave.endDateTime),
    reason : leave.reason,
    student_id : leave.student.id
  }
    var SQL_updateLeaveById = "update leave_record set ? where id = " + connection.escape(leave.id)
    connection.query(SQL_updateLeaveById , updateData,function (error, result) {
      if (error) {
        return callback(error, null)
      }
      return callback(null, result)
    })
}

exports.getLeaveAheadDays = function (callback) {

  var SQL_getLeaveAheadDays = "select s_value as days from website_setting where s_key = 'studentLeaveDay'"

  connection.query(SQL_getLeaveAheadDays, function (error, leaveAheadDays) {
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

exports.getAllByClassID = function (classID,callback) {
  var SQL_getAllByClassID = "SELECT	\
  j.id,j.name \
  FROM \
  (select m.id,n.name,m.class_id  from Leave m join user n on m.user_id = n.id ) \
  j join class k on j.class_id = k.id \
  where k.id in " + kit.getInfilter(classID)
  connection.query(SQL_getAllByClassID, function (error, Leaves) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Leaves || (Leaves.length === 0)) {
      return callback(null, null);
    }
    callback(null, Leaves);
  })
}