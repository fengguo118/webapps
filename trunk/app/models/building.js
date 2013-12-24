var connection = require("../utils/dbUtils").connection;
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * 插入一条校区记录
 * @param Building
 * @param callback
 */
exports.insertBuilding = function (Building, callback) {
  var setData = {
    id : kit.getUUid() , //随机主键
    name : Building.name , //校区名称
    campus_id : Building.campuse.id,
    create_time : kit.getNowFormatDate() //当前时间作为创建时间
  }
  var SQL_insertBuilding = "insert into building set ?";
  connection.query(SQL_insertBuilding, setData, function (error, result) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    return callback(error, result);
  })
}

exports.deleteBuildingById = function (id, callback) {
  if (!id) {
    logger.error('null id',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null id'), null);
  }
  var SQL_deleteBuildingById = "delete from building where id = ?"
  connection.query(SQL_deleteBuildingById, id, function (error, result) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    callback(error, result);
  })
}

exports.selectAllBuildings = function (page,limit, callback) {
  var SQL_selectAllBuildings = "select m.name,n.name as campusName,m.id from building m join campus n on m.campus_id = n.id limit "+(page*limit)+","+ limit
  connection.query(SQL_selectAllBuildings, function (error, Buildinges) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Buildinges || (Buildinges.length === 0)) {
      return callback(null, null);
    }
    callback(null, Buildinges);
  })
}

exports.getTotal = function (callback) {
  var SQL_getTotalBuildings = "select COUNT(m.id) as total from building m join campus n on m.campus_id = n.id "
  connection.query(SQL_getTotalBuildings, function (error, totals) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!totals || (totals.length === 0) ) {
      return callback(null, null)
    }
    var total = totals[0];
    callback(null, total.total);
  })
}


exports.updateBuildingById = function (Building, callback) {
  if (!Building) {
    logger.error('null Building',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null Building'), null);
  }
  var SQL_updateCategoryById = "update building set ? where id = " + connection.escape(Building.id);
  var updateData = {
    name : Building.name,
    campus_id : Building.campuse.id
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
  var SQL_selectAll = "select id,name from building"
  connection.query(SQL_selectAll, function (error, Buildinges) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Buildinges || (Buildinges.length === 0)) {
      return callback(null, null);
    }
    callback(null, Buildinges);
  })
}
exports.getAllByCampusID = function (campusID,callback) {
  if (!campusID) {
    logger.error('null campusID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null campusID'), null);
  }
  var SQL_getAllByCampusID = "select id,name from building where campus_id = '"+campusID+"'";
  connection.query(SQL_getAllByCampusID, function (error, Buildinges) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Buildinges || (Buildinges.length === 0)) {
      return callback(null, null);
    }
    callback(null, Buildinges);
  })
}


exports.getByCampus = function (page,limit, campusID,callback) {
  if (!campusID) {
    logger.error('null campusID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null campusID'), null);
  }
  var SQL_getByCampus = "select m.name,n.name as campusName,m.id from building m join campus n on m.campus_id = n.id " +
      " where m.campus_id = '"+campusID+"'" +
      "limit "+(page*limit)+","+ limit;

  connection.query(SQL_getByCampus, function (error, Buildinges) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Buildinges || (Buildinges.length === 0)) {
      return callback(null, null);
    }
    callback(null, Buildinges);
  })
}

exports.getTotalByCampus = function (campusID,callback) {
  if (!campusID) {
    logger.error('null campusID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null campusID'), null);
  }
  var SQL_getTotalByCampus = "select count(name) as total from building where campus_id = '"+campusID+"'";
  connection.query(SQL_getTotalByCampus, function (error, totals) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!totals || (totals.length === 0) ) {
      return callback(null, null)
    }
    var total = totals[0];
    callback(null, total.total);
  })
}