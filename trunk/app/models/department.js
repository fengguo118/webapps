var connection = require("../utils/dbUtils").connection;
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * 插入一条部门记录
 * @param Department
 * @param callback
 */
exports.insertDepartment = function (Department, callback) {
  var setData = {
    id : kit.getUUid() , //随机主键
    name : Department.name , //部门名称
    is_admin : 1 ,//0 代表部门 1 代表二级智能部门
    code : Department.code , //部门代号
    create_time : kit.getNowFormatDate() //当前时间作为创建时间
  }
  var SQL_insertDepartment = "insert into department set ?";
  connection.query(SQL_insertDepartment, setData, function (error, result) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    return callback(error, result);
  })
}

exports.deleteDepartmentById = function (id, callback) {
  if (!id) {
    logger.error('null id',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null id'), null);
  }
  var SQL_deleteDepartmentById = "delete from department where id = ?"
  connection.query(SQL_deleteDepartmentById, id, function (error, result) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    callback(error, result);
  })
}

exports.selectAllDepartments = function (page,limit, callback) {
  var SQL_selectAllDepartments = "select * from department where is_admin = 1 limit "+(page*limit)+","+ limit
  connection.query(SQL_selectAllDepartments, function (error, Departments) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Departments || (Departments.length === 0)) {
      return callback(null, null);
    }
    callback(null, Departments);
  })
}

exports.getTotal = function (callback) {
  var SQL_getTotalDepartments = "select count(name) as total from department where is_admin = 1"
  connection.query(SQL_getTotalDepartments, function (error, totals) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!totals || (totals.length === 0) ) {
      return callback(null, null)
    }
    var total = totals[0];
    callback(null, total.total)
  })
}

exports.updateDepartmentById = function (Department, callback) {
  if (!Department) {
    logger.error('null Department',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null Department'), null);
  }
  var SQL_updateDepartmentById = "update department set ? where id = " + connection.escape(Department.id);
  var updateData = {
    name : Department.name,
    code : Department.code
  }
  connection.query(SQL_updateDepartmentById, updateData, function (error, result) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    return callback(error, result);
  })

}


exports.getAll = function (callback) {
  var SQL_selectAll = "select id,name from department where is_admin = 1 "
  connection.query(SQL_selectAll, function (error, colleges) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!colleges || (colleges.length === 0)) {
      return callback(null, null);
    }
    callback(null, colleges);
  })
}