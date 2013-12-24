var Teacher = require('../models/teacher');
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * Create Teacher
 */
exports.create = function (req, res) {
  var user = {
    username : req.body.username,
    name : req.body.name,
    password : req.body.password,
    phone : req.body.phone
  }
  var teacher = {
    emp_id : req.body.emp_id,
    department_id : req.body.department.id
  }
  Teacher.insertTeacher(user,teacher, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'create Teacher failed!'});
    }
    return res.send({message: 'create Teacher success!'});
  })
}

/**
 * delete Teacher
 */
exports.delete = function (req, res) {
  Teacher.deleteTeacherById(req.params['ID'],req.params['userID'], function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'delete Teacher failed!'});
    }
    return res.send({message: 'delete Teacher success!'});
  })
}


exports.index = function(req, res, next) {
  Teacher.selectAllTeachers(req.pageIndex, req.pageLimit ,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load Teacher failed!'});
    }
    Teacher.getTotal(function(err,total){
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

exports.getByCollege = function(req, res, next) {
//  logger.info('req:',req);
//  return;

  Teacher.getByCollege(req.pageIndex, req.pageLimit,req.params.collegeID,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load Teacher failed!'});
    }
    Teacher.getTotalByCollege(req.params.collegeID,function(err,total){
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
  var teacher = {
    emp_id : req.body.emp_id,
    department_id : req.body.department.id
  }
  var teacherId = req.body.id
  Teacher.updateTeacherById(user,teacher,userId,teacherId, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'update Teacher failed!'});
    }
    return res.send({message: 'update Teacher success!'});
  })
}

exports.getAll = function(req, res, next) {
  Teacher.getAll(function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all Teacher failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200
      res.json(statusCode, {entities:result})
    }else{
      res.json(204,{total:0})
    }
  })
}

exports.getAllByCollege = function(req, res, next) {
  Teacher.getAllByCollege(req.params['collegeID'],function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all Teacher failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200
      res.json(statusCode, {entities:result})
    }else{
      res.json(204,{total:0})
    }
  })
}

exports.checkTeacherIDDuplication = function(req, res, next) {
  Teacher.checkTeacherIDDuplication(req.query.teacherID,req.query.sid,function(err,result){
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