var connection = require("../utils/dbUtils").connection;
var kit = require("../utils/kit");
var logger = kit.getLogger();
/**
 * 插入一条学院记录
 * @param college
 * @param callback
 */
exports.insertCollege = function (college, callback) {
  var setData = {
    id : kit.getUUid() , //随机主键
    name : college.name , //学院名称
    is_admin : 0 ,//0 代表学院 1 代表二级智能部门
    code : college.code , //学院代号
    create_time : kit.getNowFormatDate() //当前时间作为创建时间
  }
  var SQL_insertCollege = "insert into department set ?";
  connection.query(SQL_insertCollege, setData, function (error, result) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    return callback(error, result);
  })
}

exports.deleteCollegeById = function (id, callback) {
  if (!id) {
    logger.error('null id',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null id'), null);
  }
  var SQL_deleteCollegeById = "delete from department where id = ?"
  connection.query(SQL_deleteCollegeById, id, function (error, result) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    callback(error, result);
  })
}

exports.selectAllColleges = function (page,limit, callback) {
  var SQL_selectAllColleges = "select * from department where is_admin = 0 limit "+(page*limit)+","+ limit
  connection.query(SQL_selectAllColleges, function (error, colleges) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!colleges || (colleges.length === 0)) {
      return callback(null, null);
    }
    callback(null, colleges);
  })
}

exports.getTotal = function (callback) {
  var SQL_getTotalColleges = "select count(name) as total from department where is_admin = 0"
  connection.query(SQL_getTotalColleges, function (error, totals) {
    if(error){
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


exports.updateCollegeById = function (college, callback) {
  if (!college) {
    logger.error('null college',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null college'), null);
  }
  var SQL_updateCategoryById = "update department set ? where id = " + connection.escape(college.id);
  var updateData = {
    name : college.name,
    code : college.code
  }
  connection.query(SQL_updateCategoryById, updateData, function (error, result) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    return callback(error, result);
  })

}

exports.getAll = function (callback) {
  var SQL_selectAll = "select id,name from department where is_admin = 0 "
  connection.query(SQL_selectAll, function (error, colleges) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!colleges || (colleges.length === 0)) {
      return callback(null, null);
    }
    callback(null, colleges);
  })
}