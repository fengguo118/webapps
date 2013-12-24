var Schedule = require('../models/schedule');
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * Create Schedule
 */
exports.create = function (req, res) {
  Schedule.insertSchedule(req.body, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'create Schedule failed!'});
    }
    return res.send({message: 'create Schedule success!'});
  })
}

/**
 * delete Schedule
 */
exports.delete = function (req, res) {
  Schedule.deleteScheduleById(req.params.scheduleID, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'delete Schedule failed!'});
    }
    return res.send({message: 'delete Schedule success!'});
  })
}


exports.index = function(req, res, next) {
  Schedule.selectAllSchedules(req.pageIndex, req.pageLimit ,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load Schedule failed!'});
    }
    Schedule.getTotal(function(err,total){
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
  Schedule.updateScheduleById(req.body, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'update Schedule failed!'});
    }
    return res.send({message: 'update Schedule success!'});
  })
}

exports.getAll = function(req, res, next) {
  Schedule.getAll(function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all Schedule failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200
      res.json(statusCode, {entities:result})
    }else{
      res.json(204,{total:0})
    }
  })
}

exports.getAllByCampusID = function(req, res, next) {
  var campusID = req.query.campusID;
  Schedule.getAllSummerByCampusID(campusID,function(err,summers){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all summers failed!'});
    }
    Schedule.getAllWinterByCampusID(campusID,function(err,winters){
      if (err) {
        logger.error(err,"LOG AT:"+__filename+":"+__line);
        return res.status(500).send({message: 'load all winters failed!'});
      }
      logger.info('summers:',summers)
      logger.info('winters:',winters)
      if(!!summers || !!winters){
//        var statusCode = (result.length === 0) ? 204:200
        res.json(200, {summers:summers,winters:winters})
      }else{
        res.json(204,{total:0})
      }
    })
  })
}

exports.getBySeason = function(req, res, next) {
  Schedule.getBySeason(req.pageIndex, req.pageLimit,req.query.season ,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load Schedule failed!'});
    }
    Schedule.getTotalBySeason(req.query.season,function(err,total){
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

exports.getByCampus = function(req, res, next) {
  Schedule.getByCampus(req.pageIndex, req.pageLimit,req.query.campusID ,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load Schedule failed!'});
    }
    Schedule.getTotalByCampus(req.query.campusID,function(err,total){
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

exports.getByCampusAndSeason = function(req, res, next) {
  Schedule.getByCampusAndSeason(req.pageIndex, req.pageLimit,req.query.campusID,req.query.season ,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load Schedule failed!'});
    }
    Schedule.getTotalByCampusAndSeason(req.query.campusID,req.query.season,function(err,total){
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