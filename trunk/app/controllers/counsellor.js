var Counsellor = require('../models/counsellor');
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * Create Counsellor
 */
exports.create = function (req, res) {
  var user = {
    username : req.body.username,
    name : req.body.name,
    password : req.body.password,
    phone : req.body.phone
  }
  var counsellor = {
    emp_id : req.body.emp_id,
    department_id : req.body.department.id
  }
  Counsellor.insertCounsellor(user,counsellor, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'create Counsellor failed!'});
    }
    return res.send({message: 'create Counsellor success!'});
  })
}

/**
 * delete Counsellor
 */
exports.delete = function (req, res) {
  Counsellor.deleteCounsellorById(req.params['ID'],req.params['userID'], function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'delete Counsellor failed!'});
    }
    return res.send({message: 'delete Counsellor success!'});
  })
}


exports.index = function(req, res, next) {
  Counsellor.selectAllCounsellors(req.pageIndex, req.pageLimit ,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load Counsellor failed!'});
    }
    Counsellor.getTotal(function(err,total){
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

  Counsellor.getByCollege(req.pageIndex, req.pageLimit ,req.query.collegeID,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load Counsellor failed!'});
    }
    Counsellor.getTotalByCollege(req.query.collegeID,function(err,total){
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
  var counsellor = {
    emp_id : req.body.emp_id,
    department_id : req.body.department.id
  }
  var CounsellorId = req.body.id
  Counsellor.updateCounsellorById(user,counsellor,userId,CounsellorId, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'update Counsellor failed!'});
    }
    return res.send({message: 'update Counsellor success!'});
  })
}

exports.getAll = function(req, res, next) {
  Counsellor.getAll(function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all Counsellor failed!'});
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
  Counsellor.getAllByCollege(req.query.collegeID,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all Counsellor failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200
      res.json(statusCode, {entities:result})
    }else{
      res.json(204,{total:0})
    }
  })
}

exports.checkDuplication = function(req, res, next) {
  Counsellor.checkDuplication(req.query.id,req.query.sid,function(err,result){
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