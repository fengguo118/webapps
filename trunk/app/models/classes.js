var connection = require("../utils/dbUtils").connection;
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * 插入一条校区记录
 * @param Classes
 * @param callback
 */
exports.insertClasses = function (Classes, callback) {
  var setData = {
    id : kit.getUUid() , //随机主键
    name : Classes.name ,
    code : Classes.code,
    grade : Classes.grade,
    subject_id : Classes.subject.id,
    create_time : kit.getNowFormatDate() //当前时间作为创建时间
  }
  var SQL_insertClasses = "insert into class set ?";
  connection.query(SQL_insertClasses, setData, function (error, result) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    return callback(error, result);
  })
}

exports.deleteClassesById = function (id, callback) {
  if (!id) {
    logger.error('null id',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null id'), null);
  }
  var SQL_deleteClassesById = "delete from class where id = ?"

  connection.query(SQL_deleteClassesById, id, function (error, result) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    callback(error, result);
  })
}

exports.selectAllClassess = function (page,limit, callback) {
  var SQL_selectAllClassess = "select m.name,m.code,n.name as subjectName,m.grade,m.id from class m join subject n on m.subject_id = n.id limit "+(page*limit)+","+ limit
  connection.query(SQL_selectAllClassess, function (error, Classeses) {
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

exports.getTotal = function (callback) {
  var SQL_getTotalClassess = "select COUNT(m.name) as total from class m join subject n on m.subject_id = n.id"
  connection.query(SQL_getTotalClassess, function (error, totals) {
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


exports.updateClassesById = function (Classes, callback) {
  if (!Classes) {
    logger.error('null Classes',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null Classes'), null);
  }
  var SQL_updateCategoryById = "update class set ? where id = " + connection.escape(Classes.id);
  var updateData = {
    name : Classes.name ,
    code : Classes.code,
    grade : Classes.grade,
    subject_id : Classes.subject.id
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
  var SQL_selectAll = "select m.name,m.id from class m join subject n on m.subject_id = n.id"
  connection.query(SQL_selectAll, function (error, Classeses) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Classeses || (Classeses.length === 0)) {
      return callback(null, null);
    }
    callback(null, Classeses);
  })
}

exports.getAllByTeacherID = function (teacherID,callback) {
  var SQL_getAllByTeacherID = "select o.id,o.name \
  from class o join subject p on o.subject_id = p.id \
  where p.id in ( \
      SELECT \
  j.id \
  FROM \
  subject j join department k on j.department_id = k.id \
  where k.id in \
  ( \
      select m.id from department m join teacher n on m.id = n.department_id \
  where n.id = '" + teacherID + "' \
  ) \
  )"
  connection.query(SQL_getAllByTeacherID, function (error, Classeses) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Classeses || (Classeses.length === 0)) {
      return callback(null, null);
    }
    callback(null, Classeses);
  })
}

exports.getAllByCounsellorID = function (counsellorID,callback) {
  var SQL_getAllByCounsellorID = "select o.id,o.name \
  from class o join subject p on o.subject_id = p.id \
  where p.id in ( \
      SELECT \
  j.id \
  FROM \
  subject j join department k on j.department_id = k.id \
  where k.id in \
  ( \
      select m.id from department m join counsellor n on m.id = n.department_id \
  where n.id = '" + counsellorID + "' \
  ) \
  )"
  connection.query(SQL_getAllByCounsellorID, function (error, Classeses) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Classeses || (Classeses.length === 0)) {
      return callback(null, null);
    }
    callback(null, Classeses);
  })
}

exports.getAllBySubjectIDAndGrade = function (subjectID,grade,callback) {
  if (!subjectID) {
    logger.error(error,"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null subjectID'), null);
  }
  if (!grade) {
    logger.error(error,"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null grade'), null);
  }
  var SQL_getAllBySubjectIDAndGrade = "select * from class where subject_id = '"+subjectID+"' and grade = '"+grade+"' "
  connection.query(SQL_getAllBySubjectIDAndGrade,function (error, Classeses) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Classeses || (Classeses.length === 0)) {
      return callback(null, null);
    }
    callback(null, Classeses);
  })
}


exports.getByCollege = function (page,limit,collegeID, callback) {
  if (!collegeID) {
    logger.error('collegeID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null collegeID'), null);
  }
  var SQL_getByCollege = "SELECT \
  m.name,\
      m.code,\
      n.name AS subjectName,\
      m.grade,\
      m.id\
  FROM\
  class m\
  JOIN subject n ON m.subject_id = n.id\
  where m.subject_id in (\
      select id from subject where department_id = '"+collegeID+"'\
  ) \
  limit "+(page*limit)+","+ limit;

  connection.query(SQL_getByCollege, function (error, Classeses) {
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

exports.getTotalByCollege = function (collegeID,callback) {
  if (!collegeID) {
    logger.error('collegeID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null collegeID'), null);
  }
  var SQL_getTotalByCollege = "SELECT \
  COUNT(m.name) AS total \
  FROM \
  class m \
  JOIN subject n ON m.subject_id = n.id \
  WHERE \
  m.subject_id IN ( \
      SELECT \
  id \
  FROM \
  subject \
  WHERE \
  department_id = '"+collegeID+"' )";

  connection.query(SQL_getTotalByCollege, function (error, totals) {
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

exports.getBySelectedCourseID = function (courseID,callback) {
  if (!courseID) {
    logger.error('courseID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null courseID'), null);
  }
  var SQL_getBySelectedCourseID = "select * from class t \
  where id in ( \
      select class_id from student \
  where id in ( \
      select student_id from student_course \
  where course_id = '"+courseID+"' \
  ))";

  connection.query(SQL_getBySelectedCourseID, function (error, classes) {
    if(error){
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!classes || (classes.length === 0) ) {
      return callback(null, null);
    }
    callback(null, classes);
  })
}


//------------
exports.getBySubject = function (page,limit,subjectID, callback) {
  if (!subjectID) {
    logger.error('null subjectID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null subjectID'), null);
  }
  var SQL_getByCollege = "SELECT \
  m.name,\
      m.code,\
      n.name AS subjectName,\
      m.grade,\
      m.id\
  FROM\
  class m\
  JOIN subject n ON m.subject_id = n.id\
  where m.subject_id = '"+subjectID+"' \
  limit "+(page*limit)+","+ limit;

  connection.query(SQL_getByCollege, function (error, Classeses) {
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

exports.getTotalBySubject = function (subjectID,callback) {
  if (!subjectID) {
    logger.error('null subjectID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null subjectID'), null);
  }
  var SQL_getTotalByCollege = "SELECT \
  COUNT(m.name) AS total \
  FROM \
  class m \
  JOIN subject n ON m.subject_id = n.id \
  WHERE \
  m.subject_id = '"+subjectID+"'";

  connection.query(SQL_getTotalByCollege, function (error, totals) {
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
exports.getBySubjectIDAndGrade = function (page,limit,subjectID,grade, callback) {
  if (!subjectID) {
    logger.error('null subjectID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null subjectID'), null);
  }
  if (!grade) {
    logger.error('null grade',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null grade'), null);
  }
  var SQL_getBySubjectIDAndGrade = "SELECT \
  m.name,\
      m.code,\
      n.name AS subjectName,\
      m.grade,\
      m.id\
  FROM\
  class m\
  JOIN subject n ON m.subject_id = n.id\
  where m.subject_id = '"+subjectID+"' and m.grade = "+grade+"\
  limit "+(page*limit)+","+ limit;

  connection.query(SQL_getBySubjectIDAndGrade, function (error, Classeses) {
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

exports.getTotalBySubjectIDAndGrade = function (subjectID,grade,callback) {
  if (!subjectID) {
    logger.error('null subjectID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null subjectID'), null);
  }
  if (!grade) {
    logger.error('null grade',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null grade'), null);
  }
  var SQL_getTotalBySubjectIDAndGrade = "SELECT \
  COUNT(m.name) AS total \
  FROM \
  class m \
  JOIN subject n ON m.subject_id = n.id \
  WHERE \
  m.subject_id = '"+subjectID+"' and m.grade = "+grade

  connection.query(SQL_getTotalBySubjectIDAndGrade, function (error, totals) {
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
