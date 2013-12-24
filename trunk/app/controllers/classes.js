var Classes = require('../models/classes');
var Counsellor = require('../models/counsellor');
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * Create Classes
 */
exports.create = function (req, res) {
  Classes.insertClasses(req.body, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'create Classes failed!'});
    }
    return res.send({message: 'create Classes success!'});
  })
}

/**
 * delete Classes
 */
exports.delete = function (req, res) {
  Classes.deleteClassesById(req.params.classID, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'delete Classes failed!'});
    }
    return res.send({message: 'delete Classes success!'});
  })
}


exports.index = function(req, res, next) {
  Classes.selectAllClassess(req.pageIndex, req.pageLimit ,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load Classes failed!'});
    }
    Classes.getTotal(function(err,total){
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
//  logger.info("req.query:",req.query)
//  return;

  Classes.getByCollege(req.pageIndex, req.pageLimit,req.query.collegeID ,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load Classes failed!'});
    }
    Classes.getTotalByCollege(req.query.collegeID,function(err,total){
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
  Classes.updateClassesById(req.body, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'update Classes failed!'});
    }
    return res.send({message: 'update Classes success!'});
  })
}

exports.getAll = function(req, res, next) {
  Classes.getAll(function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all Classes failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200
      res.json(statusCode, {entities:result})
    }else{
      res.json(204,{total:0})
    }
  })
}

exports.getAllByTeacherID = function(req, res, next) {
  Classes.getAllByTeacherID(req.query.teacherID,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all Classes failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200
      res.json(statusCode, {entities:result})
    }else{
      res.json(204,{total:0})
    }
  })
}

exports.getAllByCounsellorID = function(req, res, next) {
  Counsellor.getIDByUserID(req.query.counsellorID,function(err,counsellorID){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all Classes failed!'});
    }
    Classes.getAllByCounsellorID(counsellorID,function(err,result){
      if (err) {
        logger.error(err,"LOG AT:"+__filename+":"+__line);
        return res.status(500).send({message: 'load all Classes failed!'});
      }
      if(!!result){
        var statusCode = (result.length === 0) ? 204:200
        res.json(statusCode, {entities:result})
      }else{
        res.json(204,{total:0})
      }
    })
  })

}

exports.getAllBySubjectIDAndGrade = function(req, res, next) {
  Classes.getAllBySubjectIDAndGrade(req.query.subjectID,req.query.grade, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all Classes failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200
      res.json(statusCode, {entities:result})
    }else{
      res.json(204,{total:0})
    }
  })
}

exports.getBySelectedCourseID = function(req, res, next) {
  Classes.getBySelectedCourseID(req.query.courseID, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all Classes failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200
      res.json(statusCode, {entities:result})
    }else{
      res.json(204,{total:0})
    }
  })
}


exports.getBySubject = function(req, res, next) {
//  logger.info("req.query:",req.query)
//  return;

  Classes.getBySubject(req.pageIndex, req.pageLimit,req.query.subjectID ,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load Classes failed!'});
    }
    Classes.getTotalBySubject(req.query.subjectID,function(err,total){
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


exports.getBySubjectIDAndGrade = function(req, res, next) {
  logger.info("req.query:",req.query)
//  return;

  Classes.getBySubjectIDAndGrade(req.pageIndex, req.pageLimit,req.query.subjectID,req.query.grade ,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load Classes failed!'});
    }
    Classes.getTotalBySubjectIDAndGrade(req.query.subjectID,req.query.grade,function(err,total){
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