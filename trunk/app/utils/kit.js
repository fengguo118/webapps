require("./objectExtensive");
var crypto = require("crypto");
var uuid = require("node-uuid");
var log4js = require('log4js');
var XLSX = require('xlsx');
log4js.configure(require("../../config/log4js_configration"));

var logger = log4js.getLogger();

/**
 * MD5加密
 * @param password
 * @returns {*}
 * @author zhuanghengfei
 */
exports.md5Password = function (password) {
  if (!password) {
    logger.error('null password',"LOG AT:"+__filename+":"+__line);
  }
  return crypto.createHash('md5').update(password).digest('hex');
}
/**
 * 获取UUID
 * @returns {}
 * @author zhuanghengfei
 */
exports.getUUid = function(){
  return uuid.v1();
}
/**
 * 以“yyyy-mm-dd hh-mm-ss”格式返回当前时间的字符串
 * @returns {string}
 * @author zhuanghengfei
 */
exports.getNowFormatDate = function() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = (date.getYear()+1900) + seperator1 + month + seperator1 + strDate
      + " " + date.getHours() + seperator2 + date.getMinutes()
      + seperator2 + date.getSeconds();
  return currentdate;
}

/**
 * 根据秒获得日期
 * @param second
 * @returns {string}
 * @author zhuanghengfei
 */
exports.getDateFromSecond = function(second) {
  var date = new Date(Number(second));
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = (date.getYear()+1900) + seperator1 + month + seperator1 + strDate
      + " " + date.getHours() + seperator2 + date.getMinutes()
      + seperator2 + date.getSeconds();
  return currentdate;
}

/**
 * 传入数组，返回（'',''）这样的格式的 SQL in 条件
 * @param arr
 * @returns {*}
 * @author zhuanghengfei
 */
exports.getInfilter = function(arr){
  if(!arr || arr.length === 0){
    return new Error('getInfilter:null param');
  }
  var filter = '';
  arr.forEach(function(value){
    if(filter.length === 0){
      filter = "'" + value + "'";
    }else{
      filter += ",'" + value + "'";
    }
  })
  if(filter.length === 0){
    return "1 = 0";
  }else{
    return "(" + filter + ")";
  }
}
/**
 * 获取日志对象
 * @returns {Logger}
 * @author zhuanghengfei
 */
exports.getLogger = function(){
  return logger;
}
/**
 * 获取 xlsx文档B列的所有的数据，放到数组中，B应该存学生的学号
 * @param filePath
 * @returns {*}
 * @author zhuanghengfei
 */
exports.getStudentIDsFromXLSX = function(filePath){
  try{
    if(!filePath){
      logger.error('filePath is null!',"LOG AT:"+__filename+":"+__line);
      return new Error('filePath is null!');
    }
    var xlsx = XLSX.readFile(filePath);
    var sheet_name_list = xlsx.SheetNames;
    var ids = [];
    xlsx.SheetNames.forEach(function(y) {
      for (z in xlsx.Sheets[y]) {
        if(z[0] === '!') continue;
        if(z.indexOf("B") !== -1){
          if(xlsx.Sheets[y][z].t !== 's'){
            ids.push(JSON.stringify(xlsx.Sheets[y][z].v));
          }else{
            ids.push(xlsx.Sheets[y][z].v);
          }
        }
      }
    });
    return ids;
  }catch(e){
    logger.error(e,"LOG AT:"+__filename+":"+__line);
  }
}

exports.deleteAfterUpload = function(path) {
  setTimeout( function(){
    fs.unlink(path, function(err) {
      if (err) logger.error(err,"LOG AT:"+__filename+":"+__line);
      else  logger.error('file successfully deleted',"LOG AT:"+__filename+":"+__line);
    });
  }, 60 * 1000);
};


exports.dateChange = function(date) {
  return date.substring(0,10)+" "+date.substring(11,19);
};

/**
 * 根据日期获取周几 周日 7
 * @param date "秒形式"
 * @returns {number}
 * @author zhuanghengfei
 */
exports.getWeek = function(date) {
  var newDate = new Date(Number(date));
  var week = newDate.getDay();
  if(week === 0) return 7;
  return week;
}

/**
 * 根据起止日期计算之间相隔周数
 * @param startDate
 * @param endDate
 * @returns {number}
 * @author zhuanghengfei
 */
exports.getWeekNumFromTermStartAndEnd = function(startDate,endDate){
  return Math.abs(getYearWeek(endDate) - getYearWeek(startDate));
}

/**
 * 根据日期计算所处的一年中的周数
 * @param date
 * @returns {number}
 * @author zhuanghengfei
 */
function getYearWeek(date){
  var date2=new Date(date.getFullYear(), 0, 1);
  var day1=date.getDay();
  if(day1==0) day1=7;
  var day2=date2.getDay();
  if(day2==0) day2=7;
  d = Math.round((date.getTime() - date2.getTime()+(day2-day1)*(24*60*60*1000)) / 86400000);
  return Math.ceil(d /7)+1;
}

