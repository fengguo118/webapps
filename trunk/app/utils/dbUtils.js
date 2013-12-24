var mysql = require('mysql')
var env = process.env.NODE_ENV || 'development'
var config = require('../../config/config')[env]
var async = require('async');

var kit = require("./kit");
var logger = kit.getLogger();

//create mysql connection
var connection = mysql.createConnection(config.mysql);
connection.connect();

connection.on('error', function (error) {
  logger.info('!!!mysql connection error!!!',error,"LOG AT:"+__filename+":"+__line);
  setTimeout(function () {
    logger.info('!!!going to reConnect!!!',error,"LOG AT:"+__filename+":"+__line);
    connection.connect();
  }, 1000)
})

connection.on('success', function (error) {
  logger.info('!!!mysql connection success!!!',error,"LOG AT:"+__filename+":"+__line);
})

//keep mysql connection
var keepConnection = function () {
  setInterval(function () {
    connection.query('select 1', function (error) {
      if (error) {
        logger.info('!!!keep connection error!!!',error,"LOG AT:"+__filename+":"+__line);
        setTimeout(function () {
          connection.connect();
        }, 1000)
      }
      logger.info('!keep connection !',"LOG AT:"+__filename+":"+__line);
    })
  }, 10 * 60 * 1000)//10 min
}
keepConnection();

exports.connection = connection;

//这里封装connection对象，添加超时快速通知功能。

exports.createConnection = function(){
  return mysql.createConnection(config.mysql);
}