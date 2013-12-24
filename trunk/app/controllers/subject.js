var Subject = require('../models/subject');
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * Create Subject
 */
exports.create = function (req, res) {
  Subject.insertSubject(req.body, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'create Subject failed!'});
    }
    return res.send({message: 'create Subject success!'});
  });
};

/**
 * delete Subject
 */
exports.delete = function (req, res) {
  Subject.deleteSubjectById(req.params.subjectID, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'delete Subject failed!'});
    }
    return res.send({message: 'delete Subject success!'});
  });
};


exports.index = function(req, res, next) {
  Subject.selectAllSubjects(req.pageIndex, req.pageLimit ,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load Subject failed!'});
    }
    Subject.getTotal(function(err,total){
      if (err) {
        logger.error(err,"LOG AT:"+__filename+":"+__line);
        return res.status(500).send({message: 'load Total failed!'});
      }
      var colleges ={
        entities : result,
        total : total
      };
      if(!!result){
        var statusCode = (result.length === 0) ? 204:200;
        res.json(statusCode, {total:total, entities:result});
      }else{
        res.json(204,{total:0});
      }
    });
  });
};

exports.getByCollege = function(req, res, next) {

//  logger.info('req.query:',req.query);
//  logger.info('req.params:',req.params);
//  return;

  Subject.getByCollege(req.pageIndex, req.pageLimit ,req.query.collegeID,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load Subject failed!'});
    }
    Subject.getTotalByCollege(req.query.collegeID,function(err,total){
      if (err) {
        logger.error(err,"LOG AT:"+__filename+":"+__line);
        return res.status(500).send({message: 'load Total failed!'});
      }
      var colleges ={
        entities : result,
        total : total
      };
      if(!!result){
        var statusCode = (result.length === 0) ? 204:200;
        res.json(statusCode, {total:total, entities:result});
      }else{
        res.json(204,{total:0});
      }
    });
  });
};

exports.update = function(req, res) {
  Subject.updateSubjectById(req.body, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'update Subject failed!'});
    }
    return res.send({message: 'update Subject success!'});
  });
};

exports.getAll = function(req, res, next) {
  Subject.getAll(function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all Subject failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200;
      res.json(statusCode, {entities:result});
    }else{
      res.json(204,{total:0});
    }
  });
};

exports.getAllByCollegeID = function(req, res, next) {
  Subject.getAllByCollegeID(req.query.collegeID,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all Subject failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200;
      res.json(statusCode, {entities:result});
    }else{
      res.json(204,{total:0});
    }
  });
};
