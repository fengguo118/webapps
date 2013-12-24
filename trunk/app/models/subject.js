var connection = require("../utils/dbUtils").connection;
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * 插入一条校区记录
 * @param Subject
 * @param callback
 */
exports.insertSubject = function (Subject, callback) {
  if (!Subject) {
    logger.error('null Subject',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null Subject'), null);
  }
  var setData = {
    id : kit.getUUid() , //随机主键
    name : Subject.name ,
    code : Subject.code,
    years : Subject.years,
    department_id : Subject.college.id,
    create_time : kit.getNowFormatDate() //当前时间作为创建时间
  }
  var SQL_insertSubject = "insert into subject set ?";
  connection.query(SQL_insertSubject, setData, function (error, result) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    return callback(error, result);
  })
}

exports.deleteSubjectById = function (id, callback) {
  if (!id) {
    logger.error('null id',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null id'), null);
  }
  var SQL_deleteSubjectById = "delete from subject where id = ?"
  connection.query(SQL_deleteSubjectById, id, function (error, result) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    callback(error, result);
  })
}

exports.selectAllSubjects = function (page,limit, callback) {
  var SQL_selectAllSubjects = "select m.name,n.name as departName,m.code,m.years,m.id from subject m join department n on m.department_id = n.id limit "+(page*limit)+","+ limit
  connection.query(SQL_selectAllSubjects, function (error, Subjectes) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Subjectes || (Subjectes.length === 0)) {
      return callback(null, null);
    }
    callback(null, Subjectes);
  })
}

exports.getTotal = function (callback) {
  var SQL_getTotalSubjects = "select count(m.name) as total from subject m join department n on m.department_id = n.id "
  connection.query(SQL_getTotalSubjects, function (error, totals) {
    if (error) {
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


exports.updateSubjectById = function (Subject, callback) {
  if (!Subject) {
    logger.error('null Subject',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null Subject'), null);
  }
  var SQL_updateCategoryById = "update Subject set ? where id = " + connection.escape(Subject.id);
  var updateData = {
    name : Subject.name ,
    code : Subject.code,
    years : Subject.years,
    department_id : Subject.college.id
  }
  connection.query(SQL_updateCategoryById, updateData, function (error, result) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    return callback(error, result);
  })
}

exports.getAll = function (callback) {
  var SQL_selectAll = "select m.name,m.id,m.years from subject m join department n on m.department_id = n.id"
  connection.query(SQL_selectAll, function (error, Subjectes) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Subjectes || (Subjectes.length === 0)) {
      return callback(null, null);
    }
    callback(null, Subjectes);
  })
}

exports.getAllByCollegeID = function (collegeID,callback) {
  if (!collegeID) {
    logger.error('null null collegeID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null collegeID'), null);
  }
  var SQL_getAllByCollegeID = "select m.name,m.id,m.years from subject m join department n on m.department_id = n.id " +
      " where m.department_id =  ?"
  connection.query(SQL_getAllByCollegeID, collegeID,function (error, Subjectes) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Subjectes || (Subjectes.length === 0)) {
      return callback(null, null);
    }
    callback(null, Subjectes);
  })
}


exports.getByCollege = function (page,limit,collegeID, callback) {
  if (!collegeID) {
    logger.error('null null collegeID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null collegeID'), null);
  }
  var SQL_getByCollege = "SELECT \
  m.name, \
      n.name AS departName, \
      m.code, \
      m.years, \
      m.id \
  FROM \
  SUBJECT m\
  JOIN department n ON m.department_id = n.id \
  where m.department_id = '"+collegeID+"' \
  limit " + (page * limit) + "," + limit;

  logger.info("SQL_getByCollege:",SQL_getByCollege);

  connection.query(SQL_getByCollege, function (error, Subjectes) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Subjectes || (Subjectes.length === 0)) {
      return callback(null, null);
    }
    callback(null, Subjectes);
  });
};

exports.getTotalByCollege = function (collegeID,callback) {
  if (!collegeID) {
    logger.error('null null collegeID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null collegeID'), null);
  }
  var SQL_getTotalByCollege = "SELECT \
  count(m.name) AS total \
  FROM \
  SUBJECT m \
  JOIN department n ON m.department_id = n.id \
  where m.department_id = '"+collegeID+"' ";

  logger.info('SQL_getTotalByCollege:',SQL_getTotalByCollege);

  connection.query(SQL_getTotalByCollege,function (error, totals) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!totals || (totals.length === 0) ) {
      return callback(null, null);
    }
    var total = totals[0];
    callback(null, total.total);
  });
};