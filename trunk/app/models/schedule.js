var connection = require("../utils/dbUtils").connection;
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * 插入一条校区记录
 * @param Schedule
 * @param callback
 */
exports.insertSchedule = function (Schedule, callback) {
  var setData = {
    id : kit.getUUid() , //随机主键
    serial_number : Schedule.serial_number ,
    name : Schedule.name,
    start : Schedule.start,
    end : Schedule.end,
    season : 0,
    campus_id : Schedule.campus.id,
    create_time : kit.getNowFormatDate() //当前时间作为创建时间
  }
  var SQL_insertSchedule = "insert into daily_schedule set ?";
  connection.query(SQL_insertSchedule, setData, function (error, result) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    return callback(error, result);
  })
}

exports.deleteScheduleById = function (id, callback) {
  if (!id) {
    logger.error('null id',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null id'), null);
  }
  var SQL_deleteScheduleById = "delete from daily_schedule where id = ?"
  connection.query(SQL_deleteScheduleById, id, function (error, result) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    callback(error, result);
  })
}

exports.selectAllSchedules = function (page,limit, callback) {
  var SQL_selectAllSchedules = "select m.serial_number,m.name,m.start,m.end, \
  case m.season \
  when 0 then '夏令' \
  when 1 then '冬令' \
  end as seasonName \
      ,n.name as campusName,m.id \
  from daily_schedule m join campus n \
  on m.campus_id = n.id order by m.serial_number\
  limit "+(page*limit)+","+ limit
  connection.query(SQL_selectAllSchedules, function (error, Schedulees) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Schedulees || (Schedulees.length === 0)) {
      return callback(null, null);
    }
    callback(null, Schedulees);
  })
}

exports.getTotal = function (callback) {
  var SQL_getTotalSchedules = "select COUNT(m.id) as total from daily_schedule m join campus n on m.campus_id = n.id "
  connection.query(SQL_getTotalSchedules, function (error, totals) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!totals || (totals.length === 0) ) {
      return callback(null, null)
    }
    var total = totals[0];
    return callback(null, total.total)
  })
}


exports.updateScheduleById = function (schedule, callback) {
  if (!schedule) {
    logger.error('null schedule',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null schedule'), null);
  }
  var SQL_updateCategoryById = "update daily_schedule set ? where id = " + connection.escape(schedule.id);
  var updateData = {
    serial_number : schedule.serial_number ,
    name : schedule.name,
    start : schedule.start,
    end : schedule.end,
    season : schedule.season.code,
    campus_id : schedule.campus.id
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

  var SQL_selectAll = "select m.id,m.name from daily_schedule m join campus n on m.campus_id = n.id order by m.serial_number"
  connection.query(SQL_selectAll, function (error, Schedulees) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Schedulees || (Schedulees.length === 0)) {
      return callback(null, null);
    }
    return callback(null, Schedulees);
  })
}

exports.getAllSummerByCampusID = function (campusID,callback) {
  if (!campusID) {
    logger.error('null campusID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null schedule'), null);
  }
  var SQL_getAllByCampusID = "select CONCAT(date_format(START,'%H:%i'),'-',date_format(end,'%H:%i')) as scheduleTimeName,name \
  from daily_schedule where campus_id = ? and season = 0\
  order by serial_number"
  connection.query(SQL_getAllByCampusID,campusID, function (error, Schedulees) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Schedulees || (Schedulees.length === 0)) {
      return callback(null, null);
    }
    return callback(null, Schedulees);
  })
}

exports.getAllWinterByCampusID = function (campusID,callback) {
  if (!campusID) {
    logger.error('null campusID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null schedule'), null);
  }
  var SQL_getAllByCampusID = "select CONCAT(date_format(START,'%H:%i'),'-',date_format(end,'%H:%i')) as scheduleTimeName,name \
  from daily_schedule where campus_id = ? and season = 1\
  order by serial_number"
  connection.query(SQL_getAllByCampusID,campusID, function (error, Schedulees) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Schedulees || (Schedulees.length === 0)) {
      return callback(null, null);
    }
    return callback(null, Schedulees);
  })
}

exports.getAllFree = function (starts,ends,callback) {
  if (!starts) {
    var SQL_getAllFree = "select *,CONCAT(time_format(start, '%H:%i'),'-',time_format(end, '%H:%i')) as time \
    from daily_schedule order by serial_number"
    connection.query(SQL_getAllFree, function (error, Schedulees) {
      if (error) {
        logger.error(error,"LOG AT:"+__filename+":"+__line);
        return callback(error, null);
      }
      if (!Schedulees || (Schedulees.length === 0)) {
        return callback(null, null);
      }
        return callback(null, Schedulees);
    })
    return;//退出当前方法，不执行后面的语句
  }
  var startsArr = [];
  for(var i= 0,len=starts.length;i<len;i++){
    startsArr[i] = starts[i].start;
  }
  var endsArr = [];
  for(var i= 0,len=ends.length;i<len;i++){
    endsArr[i] = ends[i].end;
  }
  var arr = startsArr + endsArr;
  var SQL_getAllFree = "select *,CONCAT(time_format(start, '%H:%i'),'-',time_format(end, '%H:%i')) as time \
  from daily_schedule \
  where id not in "+kit.getInfilter(startsArr)+" and id not in  "+kit.getInfilter(endsArr)
  connection.query(SQL_getAllFree, function (error, Schedulees) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Schedulees || (Schedulees.length === 0)) {
      return callback(null, null);
    }
    return callback(null, Schedulees);
  })
}


exports.getBySeason = function (page,limit,season, callback) {
  if (!season) {
    logger.error('null season',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null season'), null);
  }
  var SQL_getBySeason = "select m.serial_number,m.name,m.start,m.end, \
  case m.season \
  when 0 then '夏令' \
  when 1 then '冬令' \
  end as seasonName \
      ,n.name as campusName,m.id \
  from daily_schedule m join campus n \
  on m.campus_id = n.id\
   where m.season = "+season+" \
   order by m.serial_number\
  limit "+(page*limit)+","+ limit

  connection.query(SQL_getBySeason, function (error, Schedulees) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Schedulees || (Schedulees.length === 0)) {
      return callback(null, null);
    }
    callback(null, Schedulees);
  })
}

exports.getTotalBySeason = function (season,callback) {
  if (!season) {
    logger.error('null season',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null season'), null);
  }
  var SQL_getTotalBySeason = "select COUNT(m.id) as total from daily_schedule m join campus n on m.campus_id = n.id where m.season = "+season
  connection.query(SQL_getTotalBySeason, function (error, totals) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!totals || (totals.length === 0) ) {
      return callback(null, null)
    }
    var total = totals[0];
    return callback(null, total.total)
  })
}


exports.getByCampus = function (page,limit,campusID, callback) {
  if (!campusID) {
    logger.error('null campusID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null campusID'), null);
  }
  var SQL_getByCampus = "select m.serial_number,m.name,m.start,m.end, \
  case m.season \
  when 0 then '夏令' \
  when 1 then '冬令' \
  end as seasonName \
      ,n.name as campusName,m.id \
  from daily_schedule m join campus n \
  on m.campus_id = n.id\
   where m.campus_id = '"+campusID+"' \
   order by m.serial_number\
  limit "+(page*limit)+","+ limit

  connection.query(SQL_getByCampus, function (error, Schedulees) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Schedulees || (Schedulees.length === 0)) {
      return callback(null, null);
    }
    callback(null, Schedulees);
  })
}

exports.getTotalByCampus = function (campusID,callback) {
  if (!campusID) {
    logger.error('null campusID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null campusID'), null);
  }
  var SQL_getTotalByCampus = "select COUNT(m.id) as total from daily_schedule m join campus n on m.campus_id = n.id where m.campus_id = '"+campusID+"'"
  connection.query(SQL_getTotalByCampus, function (error, totals) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!totals || (totals.length === 0) ) {
      return callback(null, null)
    }
    var total = totals[0];
    return callback(null, total.total)
  })
}

exports.getByCampusAndSeason = function (page,limit,campusID,season, callback) {
  if (!campusID) {
    logger.error('null campusID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null campusID'), null);
  }
  if (!season) {
    logger.error('null season',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null season'), null);
  }
  var SQL_getByCampusAndSeason = "select m.serial_number,m.name,m.start,m.end, \
  case m.season \
  when 0 then '夏令' \
  when 1 then '冬令' \
  end as seasonName \
      ,n.name as campusName,m.id \
  from daily_schedule m join campus n \
  on m.campus_id = n.id\
   where m.campus_id = '"+campusID+"' and m.season = "+season+" \
   order by m.serial_number\
  limit "+(page*limit)+","+ limit

  connection.query(SQL_getByCampusAndSeason, function (error, Schedulees) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Schedulees || (Schedulees.length === 0)) {
      return callback(null, null);
    }
    callback(null, Schedulees);
  })
}

exports.getTotalByCampusAndSeason = function (campusID,season,callback) {
  if (!campusID) {
    logger.error('null campusID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null campusID'), null);
  }
  if (!season) {
    logger.error('null season',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null season'), null);
  }
  var SQL_getTotalByCampusAndSeason = "select COUNT(m.id) as total from daily_schedule m join campus n on m.campus_id = n.id where m.campus_id = '"+campusID+"' and m.season = "+season+""
  connection.query(SQL_getTotalByCampusAndSeason, function (error, totals) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!totals || (totals.length === 0) ) {
      return callback(null, null)
    }
    var total = totals[0];
    return callback(null, total.total)
  })
}