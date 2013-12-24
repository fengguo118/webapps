var StaffAdmin = require('../models/staffAdmin');
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * Create StaffAdmin
 */
exports.create = function (req, res) {
  var user = {
    username: req.body.username,
    name: req.body.staffname,
    password: req.body.password,
    phone: req.body.phone
  }
  var staffAdmin = {
    emp_id: req.body.emp_id,
    position: req.body.position,
    department_id: req.body.department.id
  }
  StaffAdmin.insertstaffAdmin(user, staffAdmin, function (err, result) {
    if (err) {
      logger.error(err, "LOG AT:" + __filename + ":" + __line);
      return res.status(500).send({message: 'create StaffAdmin failed!'});
    }
    return res.send({message: 'create StaffAdmin success!'});
  })
}

/**
 * delete StaffAdmin
 */
exports.delete = function (req, res) {
  StaffAdmin.deleteStaffAdminById(req.params['ID'], req.params['userID'], function (err, result) {
    if (err) {
      logger.error(err, "LOG AT:" + __filename + ":" + __line);
      return res.status(500).send({message: 'delete StaffAdmin failed!'});
    }
    return res.send({message: 'delete StaffAdmin success!'});
  })
}


exports.index = function (req, res, next) {
  StaffAdmin.selectAllstaffAdmins(req.pageIndex, req.pageLimit, req.params['position'], function (err, result) {
    if (err) {
      logger.error(err, "LOG AT:" + __filename + ":" + __line);
      return res.status(500).send({message: 'load StaffAdmin failed!'});
    }
    StaffAdmin.getTotal(req.params['position'], function (err, total) {
      if (err) {
        logger.error(err, "LOG AT:" + __filename + ":" + __line);
        return res.status(500).send({message: 'load Total failed!'});
      }
      var StaffAdmins = {
        entities: result,
        total: total
      }
      if (!!result) {
        var statusCode = (result.length === 0) ? 204 : 200;
        res.json(statusCode, {total: total, entities: result});
      } else {
        res.json(204, {total: 0});
      }
    })
  })
}

exports.update = function (req, res) {

  var user = {
    name: req.body.staffname,
    phone: req.body.phone
  }
  var userId = req.body.userid
  var staffAdmin = {
    emp_id: req.body.emp_id,
    department_id: req.body.department.id
  }
  var staffAdminId = req.body.id
  StaffAdmin.updateStaffAdminById(user, staffAdmin, userId, staffAdminId, function (err, result) {
    if (err) {
      logger.error(err, "LOG AT:" + __filename + ":" + __line);
      return res.status(500).send({message: 'update StaffAdmin failed!'});
    }
    return res.send({message: 'update StaffAdmin success!'});
  })
}


exports.getCollegeLeaderByCollegeAndPosition = function (req, res, next) {

  StaffAdmin.getCollegeLeaderByCollegeAndPosition(req.pageIndex, req.pageLimit, req.params['position'], req.query.collegeID, function (err, result) {
    if (err) {
      logger.error(err, "LOG AT:" + __filename + ":" + __line);
      return res.status(500).send({message: 'load StaffAdmin failed!'});
    }
    StaffAdmin.getCollegeLeaderTotalByCollegeAndPosition(req.params['position'], req.query.collegeID, function (err, total) {
      if (err) {
        logger.error(err, "LOG AT:" + __filename + ":" + __line);
        return res.status(500).send({message: 'load Total failed!'});
      }
      var StaffAdmins = {
        entities: result,
        total: total
      }
      if (!!result) {
        var statusCode = (result.length === 0) ? 204 : 200;
        res.json(statusCode, {total: total, entities: result});
      } else {
        res.json(204, {total: 0});
      }
    })
  })
}


exports.checkDuplication = function(req, res, next) {
  console.log("req.query:",req.body)
  StaffAdmin.checkDuplication(req.body.emp_id,req.body.sid,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all Student failed!'});
    }
    if (!result || (result.length === 0)) {
      res.json(200, {message : 'not exist'});
    }else{
      res.json(200, {message : 'already exist'});
    }
  })
}