var connection = require("../utils/dbUtils").connection;
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * 插入一条校区记录
 * @param Teacher
 * @param callback
 */
exports.insertTeacher = function (user,teacher, callback) {
  var setUserData = {
    id : kit.getUUid() , //随机主键
    username: user.username,
    name : user.name ,
    hashed_password : kit.md5Password(user.password),
    role : 2, //角色1 代表学生 2代表老师 3代表辅导员 4代表行政人员
    phone : user.phone,
    create_time : kit.getNowFormatDate() //当前时间作为创建时间
  };
  var SQL_insertUser = "insert into user set ?";
  connection.query(SQL_insertUser, setUserData, function (error, result) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    var setTeacherData = {
      id : kit.getUUid() , //随机主键
      user_id : setUserData.id ,
      emp_id : teacher.emp_id,
      department_id : teacher.department_id,
      create_time : kit.getNowFormatDate() //当前时间作为创建时间
    };
    var SQL_insertTeacher = "insert into teacher set ?";
    connection.query(SQL_insertTeacher, setTeacherData, function (error, result) {
      if (error) {
        logger.error(error,"LOG AT:"+__filename+":"+__line);
        return callback(error, null);
      }
      return callback(error, result);
    })
  })
}

exports.deleteTeacherById = function (teacherID,userID, callback) {
  if (!teacherID) {
    logger.error('null TeacherID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null TeacherID'), null);
  }
  if (!userID) {
    logger.error('null userID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null userID'), null);
  }
  var SQL_deleteUserById = "delete from user where id = ?";
  connection.query(SQL_deleteUserById, userID, function (error, result) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    var SQL_deleteTeacherById = "delete from teacher where id = ?"
    connection.query(SQL_deleteTeacherById , teacherID, function (error, result) {
      if (error) {
        logger.error(error,"LOG AT:"+__filename+":"+__line);
        return callback(error, null);
      }
      return callback(null, result);
    })
  })
}

exports.selectAllTeachers = function (page,limit, callback) {
  var SQL_selectAllTeachers = "select j.*,k.name as collegeName \
  from \
  ( \
      select m.emp_id,n.name,m.department_id,n.phone,m.id,n.id as userid,n.username \
      from teacher m join user n on m.user_id = n.id \
  ) j \
  join department k on j.department_id = k.id \
  limit "+(page*limit)+","+ limit;
  connection.query(SQL_selectAllTeachers, function (error, Teacheres) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Teacheres || (Teacheres.length === 0)) {
      return callback(null, null);
    }
    callback(null, Teacheres);
  })
}

exports.getTotal = function (callback) {
  var SQL_getTotalTeachers = "select COUNT(k.name) as total \
  from \
  ( \
      select m.emp_id,n.name,m.department_id,n.phone,m.id,n.id as userid,n.username \
      from teacher m join user n on m.user_id = n.id \
  ) j \
  join department k on j.department_id = k.id";
  connection.query(SQL_getTotalTeachers, function (error, totals) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!totals || (totals.length === 0) ) {
      return callback(null, null);
    }
    var total = totals[0];
    callback(null, total.total);
  })
}


exports.updateTeacherById = function (user,teacher,userId,teacherId, callback) {
  if (!user || !teacher || !userId || !teacherId) {
    logger.error('null updateTeacherById data',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null updateTeacherById data'), null);
  }
  var SQL_updateUserById = "update user set ? where id = " + connection.escape(userId)
  connection.query(SQL_updateUserById , user, function (error, result) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    var SQL_updateTeacherById = "update teacher set ? where id = " + connection.escape(teacherId)
    connection.query(SQL_updateTeacherById , teacher, function (error, result) {
      if (error) {
        logger.error(error,"LOG AT:"+__filename+":"+__line);
        return callback(error, null);
      }
      return callback(null, result);
    })
  })
}

exports.getAll = function (callback) {
  var SQL_selectAll = "select n.name,m.id from teacher m join user n on m.user_id = n.id";
  connection.query(SQL_selectAll, function (error, Teacheres) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Teacheres || (Teacheres.length === 0)) {
      return callback(null, null);
    }
    callback(null, Teacheres);
  })
}

exports.getAllByCollege = function (collegeID,callback) {
  if (!collegeID) {
    logger.error('null collegeID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null collegeID'), null);
  }
  var SQL_getAllByCollege = "select n.name,m.id from teacher m join user n on m.user_id = n.id where department_id = ?";
  connection.query(SQL_getAllByCollege, collegeID,function (error, Teacheres) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Teacheres || (Teacheres.length === 0)) {
      return callback(null, null);
    }
    callback(null, Teacheres);
  })
}

exports.getIDByUserID = function (userID,callback) {
  if (!userID) {
    logger.error('null userID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null userID'), null);
  }
  var SQL_getIDByUserID = "SELECt m.id from teacher m \
  join user n on m.user_id = n.id \
  where n.id = '" +userID +"'";
  connection.query(SQL_getIDByUserID,function (error, teacherIDs) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!teacherIDs || (teacherIDs.length === 0)) {
      return null;
    }
    var teacherID = teacherIDs[0].id;
    callback(null, teacherID);
  })
}


exports.getByCollege = function (page,limit, collegeID,callback) {
  if (!collegeID) {
    logger.error('null collegeID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null collegeID'), null);
  }
  var SQL_selectAllTeachers = "SELECT \
  j.*, k.name AS collegeName \
  FROM \
  ( \
      SELECT \
  m.emp_id, \
      n.name, \
      m.department_id, \
      n.phone, \
      m.id, \
      n.id AS userid,n.username \
  FROM \
  teacher m \
  JOIN user n ON m.user_id = n.id \
  where m.department_id = ? \
  ) j \
  JOIN department k ON j.department_id = k.id \
  limit "+(page*limit)+","+ limit;
  connection.query(SQL_selectAllTeachers, collegeID,function (error, Teacheres) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Teacheres || (Teacheres.length === 0)) {
      return callback(null, null);
    }
    callback(null, Teacheres);
  })
}

exports.getTotalByCollege = function (collegeID,callback) {
  if (!collegeID) {
    logger.error('null collegeID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null collegeID'), null);
  }
  var SQL_getTotalTeachers = "SELECT \
  count(m.emp_id) AS total \
  FROM \
  teacher m \
  JOIN user n ON m.user_id = n.id \
  where m.department_id = ?";

  connection.query(SQL_getTotalTeachers, collegeID,function (error, totals) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!totals || (totals.length === 0) ) {
      return callback(null, null);
    }
    var total = totals[0];
    callback(null, total.total);
  })
}

/**
 * 判断老师工号是否重复
 * @param teacherID 老师的工号
 * @param callback
 * @returns {*}
 */
exports.checkTeacherIDDuplication = function (teacherID,sid,callback) {
  if (!teacherID) {
    logger.error('null teacherID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null teacherID'), null);
  }

  var SQL_selectAll;
  if(!!sid){
    SQL_selectAll = "SELECT id FROM teacher where emp_id ='"+teacherID+"' and id != '"+sid+"'";
  }else{
    SQL_selectAll = "SELECT id FROM teacher where emp_id ='"+teacherID+"'";
  }

  connection.query(SQL_selectAll, function (error, teacher) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    callback(null, teacher);
  })
}