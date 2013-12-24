var Course = require('../models/course');
var Teacher = require('../models/teacher');
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * Create Course
 */
exports.create = function (req, res) {
//  console.log('req.body:',req.body)

  Course.insertCourse(req.body, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'create Course failed!'});
    }
    return res.send({message: 'create Course success!'});
  })
}

/**
 * delete Course
 */
exports.delete = function (req, res) {
  Course.deleteCourseById(req.params.courseID, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'delete Course failed!'});
    }
    return res.send({message: 'delete Course success!'});
  })
}

exports.index = function(req, res, next) {
  if(!req.options){
    Course.selectAllCourses(req.pageIndex, req.pageLimit ,function(err,result){
      if (err) {
        logger.error(err,"LOG AT:"+__filename+":"+__line);
        return res.status(500).send({message: 'load Course failed!'});
      }
      Course.getTotal(function(err,total){
        if (err) {
          logger.error(err,"LOG AT:"+__filename+":"+__line);
          return res.status(500).send({message: 'load Total failed!'});
        }
        var colleges ={
          entities : result,
          total : total
        }
        console.log("!result:",!result);
        if(!!result){
          var statusCode = (result.length === 0) ? 204:200
          console.log('typeof total',typeof total)
          res.json(statusCode, {total:total, entities:result})
        }else{
          res.json(204,{total:0})
        }
      })
    })
  }else{
    var option = req.query.options
    var teacherID = option.substring(14,option.length-2)
    Course.selectAllCoursesByteacherID(req.pageIndex, req.pageLimit,teacherID ,function(err,result){
      if (err) {
        logger.error(err,"LOG AT:"+__filename+":"+__line);
        return res.status(500).send({message: 'load Course failed!'});
      }
      Course.getTotalByteacherID(teacherID,function(err,total){
        if (err) {
          logger.error(err,"LOG AT:"+__filename+":"+__line);
          return res.status(500).send({message: 'load TotalByteacherID failed!'});
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
}

exports.update = function(req, res) {
  Course.updateCourseById(req.body, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'update Course failed!'});
    }
    return res.send({message: 'update Course success!'});
  })
}

exports.getAll = function(req, res, next) {
  Course.getAll(function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all Course failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200
      res.json(statusCode, {entities:result})
    }else{
      res.json(204,{total:0})
    }
  })
}

exports.getAllByWeekAndTeacherID = function(req, res, next) {
  var week = kit.getWeek(req.query.date);
  var date = kit.getDateFromSecond(req.query.date);

  Teacher.getIDByUserID(req.query.userID,function(err,teacherID){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all Course failed!'});
    }
    Course.getAllByWeekAndTeacherID(week,date,teacherID,function(err,result){
      if (err) {
        logger.error(err,"LOG AT:"+__filename+":"+__line);
        return res.status(500).send({message: 'load all Course failed!'});
      }
      if(!!result){
        var statusCode = (result.length === 0) ? 204:200
        return res.json(statusCode, {entities:result})
      }else{
        return res.json(204,{total:0})
      }
    })
  });
}


exports.getByCollegeID = function(req, res, next) {
//  req
    Course.getByCollegeID(req.pageIndex, req.pageLimit,req.query.collegeID ,function(err,result){
      if (err) {
        logger.error(err,"LOG AT:"+__filename+":"+__line);
        return res.status(500).send({message: 'load Course failed!'});
      }
      Course.getTotalByCollegeID(req.query.collegeID,function(err,total){
        if (err) {
          logger.error(err,"LOG AT:"+__filename+":"+__line);
          return res.status(500).send({message: 'load Total failed!'});
        }
        var colleges ={
          entities : result,
          total : total
        }
        console.log("!result:",!result);
        if(!!result){
          var statusCode = (result.length === 0) ? 204:200
          console.log('typeof total',typeof total)
          res.json(statusCode, {total:total, entities:result})
        }else{
          res.json(204,{total:0})
        }
      })
    })
}