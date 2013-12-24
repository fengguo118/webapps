var connection = require("../utils/dbUtils").connection;
var kit = require("../utils/kit");
var logger = kit.getLogger();

exports.websiteSetting_SET = function (key, value, callback) {
  if (!key) {
    logger.error('null key',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null key'), null);
  }
  if (!value && value !==0) {
    logger.error('null value',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null value'), null);
  }
  var select = "select s_key as skey, s_value as value from website_setting where s_key = ?";
  var insert = "insert into website_setting set ?";
  var update = "update website_setting set ? where s_key = " + connection.escape(key) + "";

  connection.query(select, key, function (error, results) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!results || (results.length === 0)) {
      //key不存在，新建
      connection.query(insert, {id : kit.getUUid(),s_key: key, s_value: value}, function (error, result) {
        return callback(error, result);
      })
    } else {
      //key存在，更新
      connection.query(update, {s_value: value}, function (error, result) {
        return callback(error, result);
      })
    }
  })
}

exports.websiteSetting_GET = function (key, callback) {
  if (!key) {
    logger.error('null key',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null key'), null);
  }
  var select = "select s_key as skey, s_value as value from website_setting where s_key = ?";
  connection.query(select, key, function (error, results) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!results || (results.length === 0)) {
      return callback(null, null);
    }
    return callback(null, results[0]);
  })
};

/**
 * 根据网站配置获取一学期的周数
 * @param callback
 * @returns {*}
 */
exports.getTermWeeks = function ( callback) {
  var select = "select s_key as skey, s_value as value from website_setting where s_key = ?";
  connection.query(select, key, function (error, results) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!results || (results.length === 0)) {
      return callback(null, null);
    }
    return callback(null, results[0]);
  })
};


