var connection = require("../utils/dbUtils").connection;
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * 插入一条校区记录
 * @param Classroom
 * @param callback
 */
exports.insertClassroom = function (Classroom, callback) {
  var setData = {
    id : kit.getUUid() , //随机主键
    serial_number : Classroom.serial_number ,
    building_id : Classroom.building.id,
    create_time : kit.getNowFormatDate() //当前时间作为创建时间
  }
  var SQL_insertClassroom = "insert into classroom set ?";
  connection.query(SQL_insertClassroom, setData, function (error, result) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    return callback(error, result);
  })
}

exports.deleteClassroomById = function (id, callback) {
  if (!id) {
    logger.error('null id',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null id'), null);
  }
  var SQL_deleteClassroomById = "delete from classroom where id = ?"
  connection.query(SQL_deleteClassroomById, id, function (error, result) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    callback(error, result);
  })
}

exports.selectAllClassrooms = function (page,limit, callback) {
  var SQL_selectAllClassrooms = "select m.serial_number,n.name as buildingName,m.id from classroom m join building n on m.building_id = n.id limit "+(page*limit)+","+ limit
  connection.query(SQL_selectAllClassrooms, function (error, Classroomes) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Classroomes || (Classroomes.length === 0)) {
      return callback(null, null);
    }
    callback(null, Classroomes);
  })
}

exports.getTotal = function (callback) {
  var SQL_getTotalClassrooms = "select count(serial_number) as total from classroom "
  connection.query(SQL_getTotalClassrooms, function (error, totals) {
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


exports.updateClassroomById = function (Classroom, callback) {
  if (!Classroom) {
    logger.error('null Classroom',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null Classroom'), null);
  }
  var SQL_updateCategoryById = "update classroom set ? where id = " + connection.escape(Classroom.id);
  var updateData = {
    serial_number : Classroom.serial_number ,
    building_id : Classroom.building.id
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
  var SQL_selectAll = "select id,serial_number from classroom"
  connection.query(SQL_selectAll, function (error, Classroomes) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Classroomes || (Classroomes.length === 0)) {
      return callback(null, null);
    }
    callback(null, Classroomes);
  })
}

//------------
exports.getByCampus = function (page,limit,campusID, callback) {
  if (!campusID) {
    logger.error('null campusID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null campusID'), null);
  }
  var SQL_getByCampus = "select m.serial_number,n.name as buildingName,m.id " +
      "from classroom m join building n on m.building_id = n.id " +
      "where n.campus_id ='"+campusID+"' " +
      "limit "+(page*limit)+","+ limit

  connection.query(SQL_getByCampus, function (error, Classeses) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Classeses || (Classeses.length === 0)) {
      return callback(null, null);
    }
    callback(null, Classeses);
  })
}

exports.getTotalByCampus = function (campusID,callback) {
  if (!campusID) {
    logger.error('null campusID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null campusID'), null);
  }
  var SQL_getTotalByCampus = "select count(m.id) as total " +
      "from classroom m join building n on m.building_id = n.id " +
      "where n.campus_id ='"+campusID+"'";

  connection.query(SQL_getTotalByCampus, function (error, totals) {
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
//------------
exports.getByBuilding = function (page,limit,buildingID, callback) {
  if (!buildingID) {
    logger.error('null buildingID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null buildingID'), null);
  }
  var SQL_getByCampus = "select m.serial_number,n.name as buildingName,m.id " +
      "from classroom m join building n on m.building_id = n.id " +
      "where m.building_id ='"+buildingID+"' " +
      "limit "+(page*limit)+","+ limit

  connection.query(SQL_getByCampus, function (error, Classeses) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Classeses || (Classeses.length === 0)) {
      return callback(null, null);
    }
    callback(null, Classeses);
  })
}

exports.getTotalByBuilding = function (buildingID,callback) {
  if (!buildingID) {
    logger.error('null buildingID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null buildingID'), null);
  }
  var SQL_getTotalByCampus = "select count(m.id) as total " +
      "from classroom m join building n on m.building_id = n.id " +
      "where m.building_id ='"+buildingID+"'";

  connection.query(SQL_getTotalByCampus, function (error, totals) {
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