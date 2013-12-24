var Classroom = require('../models/classroom');
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * Create Classroom
 */
exports.create = function (req, res) {
  Classroom.insertClassroom(req.body, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'create Classroom failed!'});
    }
    return res.send({message: 'create Classroom success!'});
  })
}

/**
 * delete Classroom
 */
exports.delete = function (req, res) {
  Classroom.deleteClassroomById(req.params.classroomID, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'delete Classroom failed!'});
    }
    return res.send({message: 'delete Classroom success!'});
  })
}


exports.index = function(req, res, next) {
  Classroom.selectAllClassrooms(req.pageIndex, req.pageLimit ,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load Classroom failed!'});
    }
    Classroom.getTotal(function(err,total){
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
//        console.log('typeof total',typeof total)
        res.json(statusCode, {total:total, entities:result})
      }else{
        res.json(204,{total:0})
      }
    })
  })
}

exports.update = function(req, res) {
  Classroom.updateClassroomById(req.body, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'update Classroom failed!'});
    }
    return res.send({message: 'update Classroom success!'});
  })
}

exports.getAll = function(req, res, next) {
  Classroom.getAll(function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all Classroom failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200
      res.json(statusCode, {entities:result})
    }else{
      res.json(204,{total:0})
    }
  })
}


exports.getByCampus = function(req, res, next) {
//  logger.info("req.query:",req.query)
//  return;

  Classroom.getByCampus(req.pageIndex, req.pageLimit,req.query.campusID ,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load classroom failed!'});
    }
    Classroom.getTotalByCampus(req.query.campusID,function(err,total){
      if (err) {
        logger.error(err,"LOG AT:"+__filename+":"+__line);
        return res.status(500).send({message: 'load classroomTotal failed!'});
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
exports.getByBuilding = function(req, res, next) {
//  logger.info("req.query:",req.query)
//  return;

  Classroom.getByBuilding(req.pageIndex, req.pageLimit,req.query.buildingID ,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load classroom failed!'});
    }
    Classroom.getTotalByBuilding(req.query.buildingID,function(err,total){
      if (err) {
        logger.error(err,"LOG AT:"+__filename+":"+__line);
        return res.status(500).send({message: 'load classroomTotal failed!'});
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