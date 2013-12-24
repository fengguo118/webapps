var connection = require("../utils/dbUtils").connection;
var kit = require("../utils/kit");
var logger = kit.getLogger();

exports.findOnebyId = function (id, callback) {
  var SQL_findOnebyId = "select * from user where id = '" + id + "'"
  connection.query(SQL_findOnebyId, function (error, users) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!users || (users.length === 0)) {
      return callback(null, null)
    }
    var user = users[0]
    callback(null, user)
  })
}

exports.checkPasswordbyId = function (id, callback) {
  var SQL_findOnebyId = "select hashed_password from user where id = '" + id + "'"
  connection.query(SQL_findOnebyId, function (error, users) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!users || (users.length === 0)) {
      return callback(null, null)
    }
    var user = users[0]
    callback(null, user)
  })
}

exports.findOneUserName = function (username, callback) {
  var SQL_findOnebyUseName = "select * from user where username = '" + username + "'"
  connection.query(SQL_findOnebyUseName, function (error, users) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!users || (users.length === 0)) {
      return callback(null, null);
    }
    var user = users[0]
    callback(null, user)
  })
}

exports.updatePasswordByUserId = function (id,password, callback) {
  var hashed_password = kit.md5Password(password)
  var SQL_updatePasswordByUserId = "update user set hashed_password = '" + hashed_password + "'  where id = '" + id + "'"
  connection.query(SQL_updatePasswordByUserId, function (error, result) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    return callback(error, result)
  })
}


