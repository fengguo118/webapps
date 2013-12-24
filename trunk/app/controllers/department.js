var Department = require('../models/department');
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * Create department
 */
exports.create = function (req, res) {
  Department.insertDepartment(req.body, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'create department failed!'});
    }
    return res.send({message: 'create department success!'});
  })
}

/**
 * delete department
 */
exports.delete = function (req, res) {
  Department.deleteDepartmentById(req.params.departmentID, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'delete department failed!'});
    }
    return res.send({message: 'delete department success!'});
  })
}


exports.index = function(req, res, next) {
  Department.selectAllDepartments(req.pageIndex, req.pageLimit ,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load department failed!'});
    }
    Department.getTotal(function(err,total){
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
  Department.updateDepartmentById(req.body, function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'update department failed!'});
    }
    return res.send({message: 'update department success!'});
  })
}

exports.getAll = function(req, res, next) {
  Department.getAll(function(err,result){
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