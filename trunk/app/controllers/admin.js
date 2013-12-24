var Admin = require('../models/admin');
var async = require("async");
var kit = require("../utils/kit");
var logger = kit.getLogger();

/*
 * req.body.options = {
 *   'key': 'value'
 * }
 */
exports.setWebsiteInfo = function (req, res, next) {
  if (!req.body.options) {
    logger.error('null options',"LOG AT:"+__filename+":"+__line);
    return res.status(400).send({message: 'null options'});
  }

  var options = req.body.options;
  var keys = Object.keys(options);

  async.each(keys, function (key, callback) {
    if (!options[key] && options[key] !== 0) {
      logger.error('null ' + key,"LOG AT:"+__filename+":"+__line);
      return callback(new Error('null ' + key));
    }
    Admin.websiteSetting_SET(key, options[key], function (error, result) {
      if (error) {
        return callback(error);
      }
      return callback();
    })
  }, function (error) {
    if (error) {
      console.log(error);
      return res.status(500).send({message: 'db error'});
    } else {
      return res.send({message: 'success'});
    }
  })
};

exports.getWebsiteInfo = function (req, res, next) {
  //获取站点信息
  var keys = [
    'takeAttendType',
    'intervalAttendType',
    'dismissAttendType',
    'evenUsed',
    'attendStartTime',
    'attendEndTime',
    'intervalEndTime',
    'termStart',
    'termEnd',
    'summaryStart',
    'summaryEnd',
    'winterStart',
    'winterEnd',
    'studentLeaveDay',
    'teacherChangeCourseDay',
    'dismissEndTime'
  ];
  var results = [];
  async.each(keys, function (key, callback) {
    Admin.websiteSetting_GET(key, function (error, result) {
      if (error) {
        return callback(error);
      }
      if (!result) {
        return callback();
      }
      results.push(result);
      return callback();
    })
  }, function (error) {
    if (error) {
      console.log(error);
      return res.status(500).send({message: 'db error'});
    } else {
      return res.send(results);
    }
  })
};
