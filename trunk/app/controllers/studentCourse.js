var StudentCourse = require('../models/studentCourse');
var Student = require('../models/student');
var kit = require("../utils/kit");
var logger = kit.getLogger();
var fs = require('fs');
var XLSX = require('xlsx');

/**
 * Create StudentCourse
 */
exports.create = function (req, res) {
  var selectedClassesID = req.query.selectedClasses.split("$")
  var courseID = req.query.courseID
  Student.getAllByClassID(selectedClassesID,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'get Student failed!'});
    }
    StudentCourse.insertStudentCourse(result,courseID, function(err,result){
      if (err) {
        logger.error(err,"LOG AT:"+__filename+":"+__line);
        return res.status(500).send({message: 'create StudentCourse failed!'});
      }
      return res.send({message: 'create StudentCourse success!'});
    })
  })

}

/**
 * delete StudentCourse
 */
exports.delete = function (req, res) {
  StudentCourse.deleteStudentCourseById(req.params.StudentCourseID, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'delete StudentCourse failed!'});
    }
    return res.send({message: 'delete StudentCourse success!'});
  })
}


exports.index = function(req, res, next) {
  StudentCourse.selectAllStudentCourses(req.pageIndex, req.pageLimit ,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load StudentCourse failed!'});
    }
    StudentCourse.getTotal(function(err,total){
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
  StudentCourse.updateStudentCourseById(req.body, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'update StudentCourse failed!'});
    }
    return res.send({message: 'update StudentCourse success!'});
  })
}

exports.getAll = function(req, res, next) {
  StudentCourse.getAll(function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all StudentCourse failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200
      res.json(statusCode, {entities:result})
    }else{
      res.json(204,{total:0})
    }

  })
}

exports.upload = function(req, res) {

  var courseID = req.body.courseID;
  var path = req.files.file.path;
  var studentIDs = kit.getStudentIDsFromXLSX(path);

  logger.info("^&^&%&^%&^%&%studentIDs:", studentIDs,"LOG AT:"+__filename+":"+__line);
  Student.getIDsByStudentID(studentIDs,function(err,IDs){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all StudentCourse failed!'});
    }
    logger.info("^&^&%&^%&^%&%IDs:", IDs,"LOG AT:"+__filename+":"+__line);
    StudentCourse.insertStudentCourse(IDs,courseID, function(err,result){
      if (err) {
        logger.error(err,"LOG AT:"+__filename+":"+__line);
        return res.status(200).send({message: 'upload failed!'});
      }
      return res.status(200).send({message: 'upload success!'});
    },true)
  })
}


