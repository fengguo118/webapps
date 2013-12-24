var connection = require("../utils/dbUtils").connection;
var kit = require("../utils/kit");
var logger = kit.getLogger();
var Q = require("q");

/**
 * 插入一条校区记录
 * @param Counsellor
 * @param callback
 */
exports.insertCounsellor = function (user,counsellor, callback) {
  if (!user) {
    logger.error('null user',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null user'), null);
  }
  if (!counsellor) {
    logger.error('null counsellor',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null counsellor'), null);
  }

  var setUserData = {
    id : kit.getUUid() , //随机主键
    username: user.username,
    name : user.name ,
    hashed_password : kit.md5Password(user.password),
    role : 3, //角色1 代表学生 2代表老师 3代表辅导员 4代表行政人员
    phone : user.phone,
    create_time : kit.getNowFormatDate() //当前时间作为创建时间
  }
  var SQL_insertUser = "insert into user set ?";
  connection.query(SQL_insertUser, setUserData, function (error, result) {
    var setCounsellorData = {
      id : kit.getUUid() , //随机主键
      user_id : setUserData.id ,
      emp_id : counsellor.emp_id,
      department_id : counsellor.department_id,
      create_time : kit.getNowFormatDate() //当前时间作为创建时间
    }
    var SQL_insertCounsellor = "insert into counsellor set ?";
    connection.query(SQL_insertCounsellor, setCounsellorData, function (error, result) {
      if (error) {
        logger.error(error,"LOG AT:"+__filename+":"+__line);
        return callback(error, null);
      }
      return callback(error, result)
    })
  })
}

exports.deleteCounsellorById = function (CounsellorID,userID, callback) {
  if (!CounsellorID) {
    logger.error('null CounsellorID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null CounsellorID'), null);
  }
  if (!userID) {
    logger.error('null userID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null userID'), null);
  }
  var SQL_deleteUserById = "delete from user where id = ?"
  connection.query(SQL_deleteUserById, userID, function (error, result) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    var SQL_deleteCounsellorById = "delete from counsellor where id = ?"
    connection.query(SQL_deleteCounsellorById , CounsellorID, function (error, result) {
      if (error) {
        logger.error(error,"LOG AT:"+__filename+":"+__line);
        return callback(error, null);
      }
      return callback(null, result)
    })
  })
}

exports.selectAllCounsellors = function (page,limit, callback) {
  var SQL_selectAllCounsellors = "select j.*,k.name as collegeName \
  from \
  ( \
      select m.emp_id,n.name,m.department_id,n.phone,m.id,n.id as userid ,n.username\
      from counsellor m join user n on m.user_id = n.id \
  ) j \
  join department k on j.department_id = k.id \
  limit "+(page*limit)+","+ limit

  connection.query(SQL_selectAllCounsellors, function (error, Counsellores) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Counsellores || (Counsellores.length === 0)) {
      return callback(null, null);
    }
    callback(null, Counsellores);
  })
}

exports.getTotal = function (callback) {
  var SQL_getTotalCounsellors = "select count(k.name) as total \
  from \
  ( \
      select m.emp_id,n.name,m.department_id,n.phone,m.id,n.id as userid ,n.username\
      from counsellor m join user n on m.user_id = n.id \
  ) j \
  join department k on j.department_id = k.id"

  connection.query(SQL_getTotalCounsellors, function (error, totals) {
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


exports.updateCounsellorById = function (user,Counsellor,userId,CounsellorId, callback) {
  if (!user || !Counsellor || !userId || !CounsellorId) {
    logger.error('null updateCounsellorById data',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null updateCounsellorById data'), null);
  }
  var SQL_updateUserById = "update user set ? where id = " + connection.escape(userId)
  connection.query(SQL_updateUserById , user, function (error, result) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    var SQL_updateCounsellorById = "update counsellor set ? where id = " + connection.escape(CounsellorId)
    connection.query(SQL_updateCounsellorById , Counsellor, function (error, result) {
      if (error) {
        logger.error(error,"LOG AT:"+__filename+":"+__line);
        return callback(error, null);
      }
      return callback(null, result)
    })
  })
}

exports.getAll = function (callback) {
  var SQL_selectAll = "select m.id,m.department_id,n.name as counsellorName \
  from counsellor m join user n on m.user_id = n.id";
  connection.query(SQL_selectAll, function (error, Counsellores) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Counsellores || (Counsellores.length === 0)) {
      return callback(null, null);
    }
    callback(null, Counsellores);
  })
}

exports.getAllByCollege = function (collegeID,callback) {
  if (!collegeID) {
    logger.error('null collegeID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null collegeID'), null);
  }
  var SQL_getAllByCollege = "select m.id,n.name from counsellor m join user n on m.user_id = n.id" +
      " where department_id = ?"
  connection.query(SQL_getAllByCollege, collegeID,function (error, Counsellores) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Counsellores || (Counsellores.length === 0)) {
      return callback(null, null);
    }
    callback(null, Counsellores);
  })
}


exports.getIDByUserID = function (userID,callback) {
  if (!userID) {
    logger.error('null userID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null userID'), null);
  }
  var SQL_getIDByUserID = "SELECt m.id from counsellor m \
  join user n on m.user_id = n.id \
  where n.id = '" +userID +"'"
  connection.query(SQL_getIDByUserID, userID,function (error, CounselloreIDs) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!CounselloreIDs || (CounselloreIDs.length === 0)) {
      return null;
    }
    var CounselloreID = CounselloreIDs[0].id;
    callback(null, CounselloreID);
  })
}


exports.getByCollege = function (page,limit,collegeID, callback) {
  if (!collegeID) {
    logger.error('null collegeID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null collegeID'), null);
  }
  var SQL_selectAllCounsellors = "select j.*,k.name as collegeName  \
  from \
  ( \
      select m.emp_id,n.name,m.department_id,n.phone,m.id,n.id as userid,n.username \
  from counsellor m join user n on m.user_id = n.id \
  ) j \
  join department k on j.department_id = k.id \
  where j.department_id = ? \
  limit "+(page*limit)+","+ limit

  connection.query(SQL_selectAllCounsellors, collegeID,function (error, Counsellores) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Counsellores || (Counsellores.length === 0)) {
      return callback(null, null);
    }
    callback(null, Counsellores);
  })
}

exports.getTotalByCollege = function (collegeID,callback) {
  if (!collegeID) {
    logger.error('null collegeID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null collegeID'), null);
  }
  var SQL_getTotalCounsellors = "SELECT \
  count(m.emp_id) AS total \
  FROM \
  counsellor m \
  JOIN user n ON m.user_id = n.id \
  where m.department_id = ? "
  connection.query(SQL_getTotalCounsellors,collegeID, function (error, totals) {
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

/**
 * 判断老师工号是否重复
 * @param id 辅导员工号
 * @param callback
 * @returns {*}
 */
exports.checkDuplication = function (id,sid,callback) {
  if (!id) {
    logger.error('null id',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null id'), null);
  }

  var SQL_selectAll;
  if(!!sid){
    SQL_selectAll = "SELECT id FROM counsellor where emp_id ='"+id+"' and id != '"+sid+"'";
  }else{
    SQL_selectAll = "SELECT id FROM counsellor where emp_id ='"+id+"'";
  }

  connection.query(SQL_selectAll, function (error, teacher) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    callback(null, teacher);
  })
}