var TransferCourses = require('../models/transferCourses');
var StudentCourse = require('../models/studentCourse');
var Schedule = require('../models/schedule');
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * Create TransferCourses
 */
exports.create = function (req, res) {
  TransferCourses.insertTransferCourses(req.body, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'create TransferCourses failed!'});
    }
    return res.send({message: 'create TransferCourses success!'});
  })
}

/**
 * delete TransferCourses
 */
exports.delete = function (req, res) {
  TransferCourses.refused(req.params.transferCoursesID, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'delete TransferCourses failed!'});
    }
    return res.send({message: 'delete TransferCourses success!'});
  })
}


exports.index = function(req, res, next) {
  TransferCourses.selectAllTransferCoursess(req.pageIndex, req.pageLimit ,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load TransferCourses failed!'});
    }
    TransferCourses.getTotal(function(err,total){
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
  var TransferCourses = {
    TransferCourses_id : req.body.TransferCourses_id,
    class_id : req.body.class_o.id
  }
  var TransferCoursesId = req.body.id
  TransferCourses.updateTransferCoursesById(user,TransferCourses,userId,TransferCoursesId, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'update TransferCourses failed!'});
    }
    return res.send({message: 'update TransferCourses success!'});
  })
}


exports.pass = function(req, res) {
  TransferCourses.pass(req.body.transferID,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'pass failed!'});
    }
    TransferCourses.insertTransferPause(req.body.transferID,function(err,result){
      if (err) {
        logger.error(err,"LOG AT:"+__filename+":"+__line);
        return res.status(500).send({message: 'pass failed!'});
      }
      return res.send({message: 'pass success!'});
    })
  })
}

exports.refused = function(req, res) {
  TransferCourses.refused(req.body.transferID,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'pass failed!'});
    }
    return res.send({message: 'pass success!'});
  })
}

exports.getAll = function(req, res, next) {
  TransferCourses.getAll(function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all TransferCourses failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200
      res.json(statusCode, {entities:result})
    }else{
      res.json(204,{total:0})
    }
  })
}

exports.getAllByClassID = function(req, res, next) {
  var classID = req.query.classID;
  var classIDarr = new Array(classID);
  TransferCourses.getAllByClassID(classIDarr,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all TransferCourses failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200
      res.json(statusCode, {entities:result})
    }else{
      res.json(204,{total:0})
    }
  })
}


exports.getAllFreetime = function(req, res, next) {
  var courseID = req.query.courseID;
  var date = req.query.date;
  var week = kit.getWeek(date);
  StudentCourse.getAllCourseIDByCourseID(courseID,function(err,courseIDs){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all courseID failed!'});
    }
    if(!!courseIDs){
      var courseIDsArr = [];
      for(var i= 0,len=courseIDs.length;i<len;i++){
        courseIDsArr[i] = courseIDs[i].id;
      }
      StudentCourse.getAllStartByCourseID(courseIDsArr,week,function(err,starts){
        if (err) {
          logger.error(err,"LOG AT:"+__filename+":"+__line);
          return res.status(500).send({message: 'load all courseID failed!'});
        }
        StudentCourse.getAllEndByCourseID(courseIDsArr,week,function(err,ends){
          if (err) {
            logger.error(err,"LOG AT:"+__filename+":"+__line);
            return res.status(500).send({message: 'load all courseID failed!'});
          }
          console.log("starts:",starts)
          console.log("ends:",ends)
          Schedule.getAllFree(starts,ends,function(err,result){
            if (err) {
              logger.error(err,"LOG AT:"+__filename+":"+__line);
              return res.status(500).send({message: 'load all courseID failed!'});
            }
            if(!!result){
              var statusCode = (result.length === 0) ? 204:200
              res.json(statusCode, {entities:result})
            }else{
              res.json(204,{})
            }
          });
        });
      });
    }
  });
}

exports.getTransferAheadDays = function(req, res, next) {
  TransferCourses.getTransferAheadDays(function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all LeaveAheadDays failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200
      res.json(statusCode, {entities:result})
    }else{
      res.json(204,{total:0})
    }
  })
}