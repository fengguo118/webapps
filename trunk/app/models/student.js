var connection = require("../utils/dbUtils").connection;
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * 插入一条校区记录
 * @param Student
 * @param callback
 */
exports.insertStudent = function (user,student, callback) {
  var setUserData = {
    id : kit.getUUid() , //随机主键
    username: user.username,
    name : user.name ,
    hashed_password : kit.md5Password(user.password),
    role : 1, //角色1 代表学生 2代表老师 3代表辅导员 4代表行政人员
    phone : user.phone,
    create_time : kit.getNowFormatDate() //当前时间作为创建时间
  }
  var SQL_insertUser = "insert into user set ?";
  connection.query(SQL_insertUser, setUserData, function (error, result) {
    var insertStudent = {
      id : kit.getUUid() , //随机主键
      user_id : setUserData.id ,
      student_id : student.student_id,
      class_id : student.class_id,
      create_time : kit.getNowFormatDate() //当前时间作为创建时间
    }
    var SQL_insertStudent = "insert into student set ?";
    connection.query(SQL_insertStudent, insertStudent, function (error, result) {
      if (error) {
        logger.error(error,"LOG AT:"+__filename+":"+__line);
        return callback(error, null);
      }
      return callback(error, result)
    })
  })
}

exports.deleteStudentById = function (studentID,userID, callback) {
  if (!studentID) {
    logger.error('null studentID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null studentID'), null);
  }
  if (!userID) {
    logger.error('null userID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null userID'), null);
  }
  var SQL_deleteUserById = "delete from user where id = ?"
  connection.query(SQL_deleteUserById, userID, function (error, result) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    var SQL_deleteStudentById = "delete from student where id = ?"
    connection.query(SQL_deleteStudentById , studentID, function (error, result) {
      if (error) {
        logger.error(error,"LOG AT:"+__filename+":"+__line);
        return callback(error, null);
      }
      return callback(null, result)
    })
  })
}

exports.selectAllStudents = function (page,limit, callback) {
  var SQL_selectAllStudents = "select o.*,p.name as collegeName \
  from \
  ( \
      select r.*,t.department_id\
  from \
  ( \
      select j.*,k.name as className,k.grade,k.subject_id \
  from \
  ( \
      select m.student_id,n.name,m.class_id,n.phone,m.id,n.id as userid,n.username from student m join user n on m.user_id = n.id \
  ) j \
  join class k on j.class_id = k.id \
  ) r \
  join subject t on r.subject_id = t.id \
  ) o \
  join department p on o.department_id = p.id \
  limit "+(page*limit)+","+ limit
  connection.query(SQL_selectAllStudents, function (error, Studentes) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Studentes || (Studentes.length === 0)) {
      return callback(null, null);
    }
    callback(null, Studentes);
  })
}

exports.getTotal = function (callback) {
  var SQL_getTotalStudents = "select count(p.name) as total \
  from \
  ( \
      select r.*,t.department_id\
  from \
  ( \
      select j.*,k.name as className,k.grade,k.subject_id \
  from \
  ( \
      select m.student_id,n.name,m.class_id,n.phone,m.id,n.id as userid,n.username from student m join user n on m.user_id = n.id \
  ) j \
  join class k on j.class_id = k.id \
  ) r \
  join subject t on r.subject_id = t.id \
  ) o \
  join department p on o.department_id = p.id"
  connection.query(SQL_getTotalStudents, function (error, totals) {
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

exports.updateStudentById = function (user,student,userId,studentId, callback) {
  if (!user || !student || !userId || !studentId) {
    logger.error('null updateStudentById data',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null updateStudentById data'), null);
  }
  var SQL_updateUserById = "update user set ? where id = " + connection.escape(userId)
  connection.query(SQL_updateUserById , user, function (error, result) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    var SQL_updateStudentById = "update student set ? where id = " + connection.escape(studentId)
    connection.query(SQL_updateStudentById , student, function (error, result) {
      if (error) {
        return callback(error, null)
      }
      return callback(null, result)
    })
  })
}

exports.getAll = function (callback) {
  var SQL_selectAll = "SELECT n.name,m.id FROM student m JOIN user n ON m.user_id = n.id"
  connection.query(SQL_selectAll, function (error, Studentes) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Studentes || (Studentes.length === 0)) {
      return callback(null, null);
    }
    callback(null, Studentes);
  })
}

exports.getStudentIDByUserID = function (userID,callback) {
  if (!userID) {
    logger.error('null userID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null userID data'), null);
  }
  var SQL_getStudentIDByUserID = "select m.id \
  from student m join user n on m.user_id = n.id \
  where n.id = '"+userID+"'";

  connection.query(SQL_getStudentIDByUserID, function (error, StudentesIDs) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!StudentesIDs || (StudentesIDs.length === 0)) {
      return callback(null, null);
    }
    var StudentesID = StudentesIDs[0].id;
    callback(null, StudentesID);
  })
}

exports.getAllByClassID = function (classID,callback) {
  var SQL_getAllByClassID = "SELECT	\
  j.id,j.name \
  FROM \
  (select m.id,n.name,m.class_id  from student m join user n on m.user_id = n.id ) \
  j join class k on j.class_id = k.id \
  where k.id in " + kit.getInfilter(classID)
  connection.query(SQL_getAllByClassID, function (error, students) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!students || (students.length === 0)) {
      return callback(null, null);
    }
    callback(null, students);
  })
}

exports.getAllByCollegeID = function (page,limit,collegeID, callback) {
  if (!collegeID) {
    logger.error('null collegeID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null collegeID'), null);
  }


  var SQL_getAllByCollegeID = "SELECT \
  o.*, p.name AS collegeName \
  FROM \
  ( \
      SELECT \
  r.*, t.department_id \
  FROM \
  ( \
      SELECT \
  j.*, k.name AS className, \
      k.grade, \
      k.subject_id \
  FROM \
  ( \
      SELECT \
  m.student_id, \
      n.name, \
      m.class_id, \
      n.phone, \
      m.id, \
      n.id AS userid,n.username \
  FROM \
  student m \
  JOIN user n ON m.user_id = n.id \
  WHERE \
  class_id IN ( \
      SELECT \
  id \
  FROM \
  class \
  WHERE \
  subject_id IN ( \
      SELECT \
  id \
  FROM \
  SUBJECT \
  WHERE \
  department_id IN ( \
      SELECT \
  id \
  FROM \
  department \
  WHERE \
  id = ? \
  ) \
  ) \
  ) \
  ) j \
  JOIN class k ON j.class_id = k.id \
  ) r \
  JOIN SUBJECT t ON r.subject_id = t.id \
  ) o \
  JOIN department p ON o.department_id = p.id \
  limit "+(page*limit)+","+ limit

  logger.info('SQL_getAllByCollegeID:',SQL_getAllByCollegeID)

  connection.query(SQL_getAllByCollegeID, collegeID,function (error, Studentes) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Studentes || (Studentes.length === 0)) {
      return callback(null, null);
    }
    callback(null, Studentes);
  })
}

exports.getTotalByCollegeID = function (collegeID,callback) {
  var SQL_getTotalByCollegeID = "SELECT \
  count(m.student_id) AS total \
  FROM \
  student m \
  JOIN user n ON m.user_id = n.id \
  WHERE \
  class_id IN ( \
      SELECT \
  id \
  FROM \
  class \
  WHERE \
  subject_id IN ( \
      SELECT \
  id \
  FROM \
  SUBJECT \
  WHERE \
  department_id IN ( \
      SELECT \
  id \
  FROM \
  department \
  WHERE \
  id = ? \
  ) \
  ) \
  )"
  connection.query(SQL_getTotalByCollegeID, collegeID,function (error, totals) {
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

exports.getAllBySubjectID = function (page,limit,subjectID, callback) {
  if (!subjectID) {
    logger.error('null subjectID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null subjectID'), null);
  }

  var SQL_getAllByCollegeID = "SELECT \
  o.*, p.name AS collegeName \
  FROM \
  ( \
      SELECT \
  r.*, t.department_id \
  FROM \
  ( \
      SELECT \
  j.*, k.name AS className, \
      k.grade, \
      k.subject_id \
  FROM \
  ( \
      SELECT \
  m.student_id, \
      n.name, \
      m.class_id, \
      n.phone, \
      m.id, \
      n.id AS userid,n.username \
  FROM \
  student m \
  JOIN user n ON m.user_id = n.id \
  WHERE \
  class_id IN ( \
      SELECT \
  id \
  FROM \
  class \
  WHERE \
  subject_id = ? \
  ) \
  ) j \
  JOIN class k ON j.class_id = k.id \
  ) r \
  JOIN subject t ON r.subject_id = t.id \
  ) o \
  JOIN department p ON o.department_id = p.id \
  limit "+(page*limit)+","+ limit

  logger.info('SQL_getAllByCollegeID:',SQL_getAllByCollegeID)

  connection.query(SQL_getAllByCollegeID, subjectID,function (error, Studentes) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Studentes || (Studentes.length === 0)) {
      return callback(null, null);
    }
    callback(null, Studentes);
  })
}

exports.getTotalBySubjectID = function (subjectID,callback) {
  if (!subjectID) {
    logger.error('null subjectID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null subjectID'), null);
  }
  var SQL_getTotalByCollegeID = "SELECT \
  count(m.student_id) AS total \
  FROM \
  student m \
  JOIN user n ON m.user_id = n.id \
  WHERE \
  class_id IN ( \
      SELECT \
  id \
  FROM \
  class \
  WHERE \
  subject_id = ? \
  )"
  connection.query(SQL_getTotalByCollegeID, subjectID,function (error, totals) {
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

exports.getAllBySubjectIDAndGrade = function (page,limit,subjectID,grade, callback) {
  if (!subjectID) {
    logger.error('null subjectID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null subjectID'), null);
  }
  if (!grade) {
    logger.error('null grade',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null grade'), null);
  }

  var SQL_getAllByCollegeID = "SELECT \
  o.*, p.name AS collegeName \
  FROM \
  ( \
      SELECT \
  r.*, t.department_id \
  FROM \
  ( \
      SELECT \
  j.*, k.name AS className, \
      k.grade, \
      k.subject_id \
  FROM \
  ( \
      SELECT \
  m.student_id, \
      n.name, \
      m.class_id, \
      n.phone, \
      m.id, \
      n.id AS userid ,n.username\
  FROM \
  student m \
  JOIN user n ON m.user_id = n.id \
  WHERE \
  class_id IN ( \
      SELECT \
  id \
  FROM \
  class \
  WHERE \
  subject_id = ? and grade = "+grade+"\
  ) \
  ) j \
  JOIN class k ON j.class_id = k.id \
  ) r \
  JOIN subject t ON r.subject_id = t.id \
  ) o \
  JOIN department p ON o.department_id = p.id \
  limit "+(page*limit)+","+ limit

  logger.info('SQL_getAllByCollegeID:',SQL_getAllByCollegeID)

  connection.query(SQL_getAllByCollegeID, subjectID,function (error, Studentes) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Studentes || (Studentes.length === 0)) {
      return callback(null, null);
    }
    callback(null, Studentes);
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

  var SQL_getTotalByCollegeID = "SELECT \
  count(m.student_id) AS total \
  FROM \
  student m \
  JOIN user n ON m.user_id = n.id \
  WHERE \
  class_id IN ( \
      SELECT \
  id \
  FROM \
  class \
  WHERE \
  subject_id = ? and grade = "+grade+"\
  )"
  connection.query(SQL_getTotalByCollegeID, subjectID,function (error, totals) {
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


exports.getByClassID = function (page,limit,classID, callback) {
  if (!classID) {
    logger.error('null classID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null classID'), null);
  }

  var SQL_getAllByCollegeID = "SELECT \
  o.*, p.name AS collegeName\
  FROM\
  (\
      SELECT\
  r.*, t.department_id\
  FROM\
  (\
      SELECT\
  j.*, k.name AS className,\
      k.grade,\
      k.subject_id\
  FROM\
  (\
      SELECT\
  m.student_id,\
      n.name,\
      m.class_id,\
      n.phone,\
      m.id,\
      n.id AS userid,n.username\
  FROM\
  student m\
  JOIN user n ON m.user_id = n.id\
  WHERE\
  class_id = ? \
  ) j\
  JOIN class k ON j.class_id = k.id\
  ) r\
  JOIN subject t ON r.subject_id = t.id \
  ) o\
  JOIN department p ON o.department_id = p.id \
  limit "+(page*limit)+","+ limit

  logger.info('SQL_getAllByCollegeID:',SQL_getAllByCollegeID)

  connection.query(SQL_getAllByCollegeID, classID,function (error, Studentes) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!Studentes || (Studentes.length === 0)) {
      return callback(null, null);
    }
    callback(null, Studentes);
  })
}

exports.getTotalByClassID = function (classID,callback) {
  if (!classID) {
    logger.error('null subjectID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null subjectID'), null);
  }

  var SQL_getTotalByCollegeID = "SELECT \
  count(m.student_id) AS total \
  FROM \
  student m \
  JOIN user n ON m.user_id = n.id \
  WHERE \
  class_id  = ? "
  connection.query(SQL_getTotalByCollegeID, classID,function (error, totals) {
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

/**
 * 判断学生学号是否重复
 * @param studentID
 * @param callback
 * @returns {*}
 */
exports.checkStudentIDDuplication = function (studentID,sid,callback) {
  if (!studentID) {
    logger.error('null studentID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null studentID'), null);
  }

  var SQL_selectAll;
  if(!!sid){
    SQL_selectAll = "SELECT id FROM student where student_id ='"+studentID+"' and id != '"+sid+"'";
  }else{
    SQL_selectAll = "SELECT id FROM student where student_id ='"+studentID+"'";
  }

  connection.query(SQL_selectAll, function (error, Studentes) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    callback(null, Studentes);
  })
}

/**
 * 根据上传的excel文件里的学号获取学生的ID号
 * @param studentID
 * @param callback
 */
exports.getIDsByStudentID = function (studentID,callback) {
  if (!studentID) {
    logger.error('null studentID',"LOG AT:"+__filename+":"+__line);
    return callback(new Error('null studentID'), null);
  }
  var SQL_getIDsByStudentID = "SELECT id FROM student where student_id in " + kit.getInfilter(studentID);

  logger.info("SQL_getIDsByStudentID:",SQL_getIDsByStudentID)

  connection.query(SQL_getIDsByStudentID, function (error, studentIDs) {
    if (error) {
      logger.error(error,"LOG AT:"+__filename+":"+__line);
      return callback(error, null);
    }
    if (!studentIDs || (studentIDs.length === 0)) {
      return callback(null, null);
    }
    var IDs = [];
    studentIDs.forEach(function(value){
      IDs.push(value.id);
    });

    callback(null, IDs);
  })
}