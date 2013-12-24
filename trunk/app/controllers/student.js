var Student = require('../models/student');
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * Create Student
 */
exports.create = function (req, res) {
  var user = {
    username : req.body.username,
    name : req.body.name,
    password : req.body.password,
    phone : req.body.phone
  }
  var student = {
    student_id : req.body.student_id,
    class_id : req.body.class_o.id
  }
  Student.insertStudent(user,student, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'create Student failed!'});
    }
    return res.send({message: 'create Student success!'});
  })
}

/**
 * delete Student
 */
exports.delete = function (req, res) {
  Student.deleteStudentById(req.params['ID'],req.params['userID'], function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'delete Student failed!'});
    }
    return res.send({message: 'delete Student success!'});
  })
}

exports.index = function(req, res, next) {
  Student.selectAllStudents(req.pageIndex, req.pageLimit ,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load Student failed!'});
    }
    Student.getTotal(function(err,total){
      if (err) {
        logger.error(err,"LOG AT:"+__filename+":"+__line);
        return res.status(500).send({message: 'load Total failed!'});
      }
      var colleges ={
        entities : result,
        total : total
      }
      if(!!result){
        var statusCode = (result.length === 0) ? 204:200
        res.json(statusCode, {total:total, entities:result})
      }else{
        res.json(204,{total:0})
      }
    })
  })
}

exports.update = function(req, res) {

  var user = {
    name : req.body.name,
    phone : req.body.phone
  }
  var userId = req.body.userid
  var student = {
    student_id : req.body.student_id,
    class_id : req.body.class_o.id
  }
  var studentId = req.body.id
  Student.updateStudentById(user,student,userId,studentId, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'update Student failed!'});
    }
    return res.send({message: 'update Student success!'});
  })
}

exports.getAll = function(req, res, next) {
  Student.getAll(function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all Student failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200
      res.json(statusCode, {entities:result})
    }else{
      res.json(204,{total:0})
    }
  })
}

exports.getStudentIDByUserID = function(req, res, next) {

  Student.getStudentIDByUserID(req.query.id,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all Student failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200
      res.json(statusCode, {studentID:result})
    }else{
      res.json(204,{total:0})
    }
  })
}

exports.getAllByClassID = function(req, res, next) {
  var classID = req.query.classID;
  var classIDarr = new Array(classID);
  Student.getAllByClassID(classIDarr,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all Student failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200
      res.json(statusCode, {entities:result})
    }else{
      res.json(204,{total:0})
    }
  })
}

exports.getAllByCollegeID = function(req, res, next) {
  Student.getAllByCollegeID(req.pageIndex, req.pageLimit ,req.query.collegeID,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load Student failed!'});
    }
    Student.getTotalByCollegeID(req.query.collegeID,function(err,total){
      if (err) {
        logger.error(err,"LOG AT:"+__filename+":"+__line);
        return res.status(500).send({message: 'load Total failed!'});
      }
      var colleges ={
        entities : result,
        total : total
      }
      if(!!result){
        var statusCode = (result.length === 0) ? 204:200
        res.json(statusCode, {total:total, entities:result})
      }else{
        res.json(204,{total:0})
      }
    })
  })
}

exports.getAllBySubjectID = function(req, res, next) {
  Student.getAllBySubjectID(req.pageIndex, req.pageLimit ,req.query.subjectID,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load Student failed!'});
    }
    Student.getTotalBySubjectID(req.query.subjectID,function(err,total){
      if (err) {
        logger.error(err,"LOG AT:"+__filename+":"+__line);
        return res.status(500).send({message: 'load Total failed!'});
      }
      var colleges ={
        entities : result,
        total : total
      }
      if(!!result){
        var statusCode = (result.length === 0) ? 204:200
        res.json(statusCode, {total:total, entities:result})
      }else{
        res.json(204,{total:0})
      }
    })
  })
}

exports.getAllBySubjectIDAndGrade = function(req, res, next) {
  Student.getAllBySubjectIDAndGrade(req.pageIndex, req.pageLimit ,req.query.subjectID,req.query.grade,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load Student failed!'});
    }
    Student.getTotalBySubjectIDAndGrade(req.query.subjectID,req.query.grade,function(err,total){
      if (err) {
        logger.error(err,"LOG AT:"+__filename+":"+__line);
        return res.status(500).send({message: 'load Total failed!'});
      }
      var colleges ={
        entities : result,
        total : total
      }
      if(!!result){
        var statusCode = (result.length === 0) ? 204:200
        res.json(statusCode, {total:total, entities:result})
      }else{
        res.json(204,{total:0})
      }
    })
  })
}

exports.getByClassID = function(req, res, next) {
  Student.getByClassID(req.pageIndex, req.pageLimit ,req.query.classID,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load Student failed!'});
    }
    Student.getTotalByClassID(req.query.classID,function(err,total){
      if (err) {
        logger.error(err,"LOG AT:"+__filename+":"+__line);
        return res.status(500).send({message: 'load Total failed!'});
      }
      var colleges ={
        entities : result,
        total : total
      }
      if(!!result){
        var statusCode = (result.length === 0) ? 204:200
        res.json(statusCode, {total:total, entities:result})
      }else{
        res.json(204,{total:0})
      }
    })
  })
}

exports.checkStudentIDDuplication = function(req, res, next) {
  logger.info("req.query:",req.query);
//  logger.info("req.query:",req);

  Student.checkStudentIDDuplication(req.query.studentID,req.query.sid,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all Student failed!'});
    }
    if (!result || (result.length === 0)) {
      res.json(200, {message : 'not exist'})
    }else{
      res.json(200, {message : 'already exist'})
    }
  })
}