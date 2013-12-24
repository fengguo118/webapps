var College = require('../models/college');
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * Create college
 */
exports.create = function (req, res) {
  College.insertCollege(req.body, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'create college failed!'});
    }
    return res.send({message: 'create college success!'});
  })
}

/**
 * delete college
 */
exports.delete = function (req, res) {
  College.deleteCollegeById(req.params.collegeID, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'delete college failed!'});
    }
    return res.send({message: 'delete college success!'});
  })
}


exports.index = function(req, res, next) {
  College.selectAllColleges(req.pageIndex, req.pageLimit ,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load college failed!'});
    }
    College.getTotal(function(err,total){
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
  College.updateCollegeById(req.body, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'update college failed!'});
    }
    return res.send({message: 'update college success!'});
  })
}


exports.getAll = function(req, res, next) {
  College.getAll(function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all college failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200
      res.json(statusCode, {entities:result})
    }else{
      res.json(204,{total:0})
    }
  })
}