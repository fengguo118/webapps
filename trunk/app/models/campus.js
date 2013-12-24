var connection = require("../utils/dbUtils").connection;
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * 插入一条校区记录
 * @param Campus
 * @param callback
 */
exports.insertCampus = function (Campus, callback) {
  var setData = {
    id : kit.getUUid() , //随机主键
    name : Campus.name , //校区名称
    create_time : kit.getNowFormatDate() //当前时间作为创建时间
  }
  var SQL_insertCampus = "insert into campus set ?";
  connection.query(SQL_insertCampus, setData, function (error, result) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    return callback(error, result);
  })
}

exports.deleteCampusById = function (id, callback) {
  if (!id) {
    logger.error('null id',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null id'), null);
  }
  var SQL_deleteCampusById = "delete from campus where id = ?"
  connection.query(SQL_deleteCampusById, id, function (error, result) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    callback(error, result);
  })
}

exports.selectAllCampuss = function (page,limit, callback) {
  var SQL_selectAllCampuss = "select * from campus limit "+(page*limit)+","+ limit
  connection.query(SQL_selectAllCampuss, function (error, Campuses) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Campuses || (Campuses.length === 0)) {
      return callback(null, null);
    }
    callback(null, Campuses);
  })
}

exports.getTotal = function (callback) {
  var SQL_getTotalCampuss = "select count(name) as total from campus "
  connection.query(SQL_getTotalCampuss, function (error, totals) {
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


exports.updateCampusById = function (Campus, callback) {
  if (!Campus) {
    logger.error('null campus',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null campus'), null);
  }
  var SQL_updateCategoryById = "update campus set ? where id = " + connection.escape(Campus.id);
  var updateData = {
    name : Campus.name
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
  var SQL_selectAll = "select id,name from campus"
  connection.query(SQL_selectAll, function (error, campuses) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!campuses || (campuses.length === 0)) {
      return callback(null, null);
    }
    callback(null, campuses);
  })
}