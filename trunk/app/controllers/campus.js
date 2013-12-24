var Campus = require('../models/campus');
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * Create Campus
 */
exports.create = function (req, res) {
  Campus.insertCampus(req.body, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'create Campus failed!'});
    }
    return res.send({message: 'create Campus success!'});
  })
}

/**
 * delete Campus
 */
exports.delete = function (req, res) {

//  console.log("req:",req.params.collegeID)
  Campus.deleteCampusById(req.params.campusID, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'delete Campus failed!'});
    }
    return res.send({message: 'delete Campus success!'});
  })
}

exports.index = function(req, res, next) {
  Campus.selectAllCampuss(req.pageIndex, req.pageLimit ,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load Campus failed!'});
    }
    Campus.getTotal(function(err,total){
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
  Campus.updateCampusById(req.body, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'update Campus failed!'});
    }
    return res.send({message: 'update Campus success!'});
  })
}

exports.getAll = function(req, res, next) {
  Campus.getAll(function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all Campus failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200
      res.json(statusCode, {entities:result})
    }else{
      res.json(204,{total:0})
    }
  })
}