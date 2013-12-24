var connection = require("../utils/dbUtils").connection;
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * 插入一条学院记录
 * @param staffAdmin
 * @param callback
 */
exports.insertstaffAdmin = function (user, staffAdmin, callback) {
  if (!user) {
    logger.error('null user', "LOG AT:" + __filename + ":" + __line);
    return callback(new Error('null user'), null);
  }
  if (!staffAdmin) {
    logger.error('null staffAdmin', "LOG AT:" + __filename + ":" + __line);
    return callback(new Error('null staffAdmin'), null);
  }
  //先插入user表数据，然后插入staffadmin表数据，user_id关联
  var setUserData = {
    id: kit.getUUid(), //随机主键
    username: user.username,
    name: user.name,
    hashed_password: kit.md5Password(user.password),
    role: 4, //角色4代表行政人员
    phone: user.phone,
    create_time: kit.getNowFormatDate() //当前时间作为创建时间
  }
  var SQL_insertUser = "insert into user set ?";
  connection.query(SQL_insertUser, setUserData, function (error, result) {
    var setStaffAdminData = {
      id: kit.getUUid(), //随机主键
      user_id: setUserData.id,
      emp_id: staffAdmin.emp_id,
      position: staffAdmin.position,
      department_id: staffAdmin.department_id,
      create_time: kit.getNowFormatDate() //当前时间作为创建时间
    }
    var SQL_insertstaffAdmin = "insert into staffadmin set ?";
    connection.query(SQL_insertstaffAdmin, setStaffAdminData, function (error, result) {
      if (error) {
        logger.error(error, "LOG AT:" + __filename + ":" + __line);
        return callback(error, null);
      }
      return callback(error, result);
    })
  })
}

exports.deleteStaffAdminById = function (staffAdminID, userID, callback) {
  if (!staffAdminID) {
    logger.error('null staffAdminID', "LOG AT:" + __filename + ":" + __line);
    return callback(new Error('null staffAdminID'), null);
  }
  if (!userID) {
    logger.error('null userID', "LOG AT:" + __filename + ":" + __line);
    return callback(new Error('null userID'), null);
  }
  var SQL_deleteUserById = "delete from user where id = ?";
  connection.query(SQL_deleteUserById, userID, function (error, result) {
    if (error) {
      logger.error(error, "LOG AT:" + __filename + ":" + __line);
      return callback(error, null);
    }
    var SQL_deleteStaffAdminById = "delete from staffadmin where id = ?";
    connection.query(SQL_deleteStaffAdminById, staffAdminID, function (error, result) {
      if (error) {
        logger.error(error, "LOG AT:" + __filename + ":" + __line);
        return callback(error, null);
      }
      return callback(null, result);
    })
  })
}

exports.selectAllstaffAdmins = function (page, limit, position, callback) {
  if (!position) {
    logger.error('null position', "LOG AT:" + __filename + ":" + __line);
    return callback(new Error('null position'), null);
  }
  var SQL_selectAllstaffAdmins = "select j.emp_id,j.phone,j.position,j.staffname,k.name as departmentname,j.staffid as id,j.userid,k.id as department_id,j.username \
  from \
  (select m.emp_id,n.name as staffname ,n.phone,m.position,m.department_id,m.id as staffid,n.id as userid,n.username \
  from staffadmin m join user n \
  on m.user_id = n.id \
  where m.position = '" + position + "' \
  ) j \
  join department k \
  on j.department_id = k.id \
  limit " + (page * limit) + "," + limit;
  connection.query(SQL_selectAllstaffAdmins, function (error, staffAdmins) {
    if (error) {
      logger.error(error, "LOG AT:" + __filename + ":" + __line);
      return callback(error, null);
    }
    if (!staffAdmins || (staffAdmins.length === 0)) {
      return callback(null, null);
    }
    callback(null, staffAdmins);
  })
}

exports.getTotal = function (position, callback) {
  if (!position) {
    logger.error('null position', "LOG AT:" + __filename + ":" + __line);
    return callback(new Error('null position'), null);
  }
  var SQL_getTotalstaffAdmins = "select COUNT(j.emp_id) as total \
  from \
  (select m.emp_id,n.name as staffname ,n.phone,m.position,m.department_id,m.id as staffid,n.id as userid,n.username \
  from staffadmin m join user n \
  on m.user_id = n.id \
  where m.position = '" + position + "' \
  ) j \
  join department k \
  on j.department_id = k.id";

  connection.query(SQL_getTotalstaffAdmins , function (error, totals) {
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


exports.updateStaffAdminById = function (user, staffAdmin, userId, staffAdminId, callback) {
  if (!user || !staffAdmin || !userId || !staffAdminId) {
    logger.error('null updatestaffAdminById data', "LOG AT:" + __filename + ":" + __line);
    return callback(new Error('null updatestaffAdminById data'), null);
  }
  var SQL_updateUserById = "update user set ? where id = " + connection.escape(userId);
  connection.query(SQL_updateUserById, user, function (error, result) {
    if (error) {
      logger.error(error, "LOG AT:" + __filename + ":" + __line);
      return callback(error, null);
    }
    var SQL_updatestaffAdminById = "update staffadmin set ? where id = " + connection.escape(staffAdminId);
    connection.query(SQL_updatestaffAdminById, staffAdmin, function (error, result) {
      if (error) {
        logger.error(error, "LOG AT:" + __filename + ":" + __line);
        return callback(error, null);
      }
      return callback(null, result)
    })
  })

}

exports.getPositionByUserID = function (userID, callback) {
  if (!userID) {
    logger.error('null userID', "LOG AT:" + __filename + ":" + __line);
    return callback(new Error('null userID'), null);
  }
  var SQL_getPositionByUserID = "select position from staffadmin where user_id = ?";
  connection.query(SQL_getPositionByUserID, userID, function (error, positions) {
    if (error) {
      logger.error(error, "LOG AT:" + __filename + ":" + __line);
      return callback(error, null);
    }
    if (!positions || (positions.length === 0)) {
      return callback(null, null);
    }
    var position = positions[0].position;
    callback(null, position);
  })
}


exports.getCollegeLeaderByCollegeAndPosition = function (page, limit, position, collegeID, callback) {
  if (!position) {
    logger.error('null position', "LOG AT:" + __filename + ":" + __line);
    return callback(new Error('null position'), null);
  }
  if (!collegeID) {
    logger.error('null collegeID', "LOG AT:" + __filename + ":" + __line);
    return callback(new Error('null collegeID'), null);
  }
  var SQL_getCollegeLeaderByCollegeAndPosition = "SELECT \
  j.emp_id, \
      j.phone,\
      j.position,\
      j.staffname,\
      k.name AS departmentname,\
      k.id as department_id,\
      j.staffid AS id,\
      j.userid,j.username\
  FROM\
  (\
      SELECT\
  m.emp_id,\
      n.name AS staffname,\
      n.phone,\
      m.position,\
      m.department_id,\
      m.id AS staffid,\
      n.id AS userid,n.username\
  FROM\
  staffadmin m\
  JOIN user n ON m.user_id = n.id\
  WHERE\
  m.position = '" + position + "'\
  ) j\
  JOIN department k ON j.department_id = k.id\
  where j.department_id = '" + collegeID + "' \
  limit " + (page * limit) + "," + limit;

  logger.info("SQL_getCollegeLeaderByCollegeAndPosition:",SQL_getCollegeLeaderByCollegeAndPosition);

  connection.query(SQL_getCollegeLeaderByCollegeAndPosition, collegeID, function (error, staffAdmins) {
    if (error) {
      logger.error(error, "LOG AT:" + __filename + ":" + __line);
      return callback(error, null);
    }
    if (!staffAdmins || (staffAdmins.length === 0)) {
      return callback(null, null);
    }
    callback(null, staffAdmins);
  })
}

exports.getCollegeLeaderTotalByCollegeAndPosition = function (position, collegeID, callback) {
  if (!position) {
    logger.error('null position', "LOG AT:" + __filename + ":" + __line);
    return callback(new Error('null position'), null);
  }
  if (!collegeID) {
    logger.error('null collegeID', "LOG AT:" + __filename + ":" + __line);
    return callback(new Error('null collegeID'), null);
  }

  var SQL_getCollegeLeaderTotalByCollegeAndPosition = "SELECT \
  COUNT(m.id) AS total \
  FROM \
  staffadmin m \
  JOIN user n ON m.user_id = n.id \
  WHERE \
  m.position = '" + position + "'\
  and m.department_id = '" + collegeID + "'";

//  logger.info("SQL_getCollegeLeaderTotalByCollegeAndPosition:",SQL_getCollegeLeaderTotalByCollegeAndPosition);

  connection.query(SQL_getCollegeLeaderTotalByCollegeAndPosition, collegeID, function (error, totals) {
    if (error) {
      logger.error(error, "LOG AT:" + __filename + ":" + __line);
      return callback(error, null);
    }
    if (!totals || (totals.length === 0)) {
      return callback(null, null);
    }
    var total = totals[0];
    callback(null, total.total);
  })
}

exports.checkDuplication = function (id,sid,callback) {
  if (!id) {
    logger.error('null id',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null id'), null);
  }

  var SQL_selectAll;
  if(!!sid){
    SQL_selectAll = "SELECT id FROM staffadmin where emp_id ='"+id+"' and id != '"+sid+"'";
  }else{
    SQL_selectAll = "SELECT id FROM staffadmin where emp_id ='"+id+"'";
  }

  connection.query(SQL_selectAll, function (error, ids) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    callback(null, ids);
  })
}