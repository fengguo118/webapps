var Leave = require('../models/leave');
var Counsellor = require('../models/counsellor');
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * Create Leave
 */
exports.create = function (req, res) {
  Counsellor.getIDByUserID(req.user.id,function(err,counsellorID){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all Classes failed!'});
    }
    Leave.insertLeave(req.body,counsellorID, function(err,result){
      if (err) {
        logger.error(err,"LOG AT:"+__filename+":"+__line);
        return res.status(500).send({message: 'create Leave failed!'});
      }
      return res.send({message: 'create Leave success!'});
    })
  })
}

/**
 * delete Leave
 */
exports.delete = function (req, res) {
  Leave.deleteLeaveById(req.params['leaveID'], function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'delete Leave failed!'});
    }
    return res.send({message: 'delete Leave success!'});
  })
}


exports.index = function(req, res, next) {
  Leave.selectAllLeaves(req.pageIndex, req.pageLimit ,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load Leave failed!'});
    }
    Leave.getTotal(function(err,total){
      if (err) {
        logger.error(err,"LOG AT:"+__filename+":"+__line);
        return res.status(500).send({message: 'load Total failed!'});
      }
      if(!!result){
        var statusCode = (result.length === 0) ? 204:200
//        console.log('typeof total',typeof total)
        res.json(statusCode, {total:total, entities:result})
      }else{
        res.json(204,{total:0})
      }
    })
  })
}

exports.update = function(req, res) {
  Leave.updateLeaveById(req.body, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'update Leave failed!'});
    }
    return res.send({message: 'update Leave success!'});
  })
}

exports.getLeaveAheadDays = function(req, res, next) {
  Leave.getLeaveAheadDays(function(err,result){
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