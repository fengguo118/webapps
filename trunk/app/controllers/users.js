var kit = require("../utils/kit");
var logger = kit.getLogger();
var StaffAdmin = require('../models/staffAdmin');

/**
 * Module dependencies.
 */
var User = require('../models/user')
var Counsellor = require('../models/counsellor')
var StaffAdmin = require('../models/staffAdmin')
var Student = require('../models/student')
var Teacher = require('../models/teacher')

exports.signout = function (req, res) {
    console.log('进入了登出函数');
    req.logout()
    res.send(200)
}

/**
 * Session
 */
exports.session = function (req, res) {
//  console.log('req.user:',req.user)
    console.log('进来了');
    if (!req.user) {
        logger.error("未找到用户", "LOG AT:" + __filename + ":" + __line);
        res.send(401);
    }
    var role = req.user.role;
    if (role === 0 || role === 1 || role === 2 || role === 3) {
        var user = {
            id: req.user.id,
            name: req.user.name,
            role: req.user.role
        }
        return res.json(user);
    } else if (role === 4) {
        StaffAdmin.getPositionByUserID(req.user.id, function (err, position) {
            if (err) {
                logger.error(err, "LOG AT:" + __filename + ":" + __line);
                return res.status(500).send({message: 'create Student failed!'});
            }
            var user = {
                id: req.user.id,
                name: req.user.name,
                role: position
            }
            return res.json(user);
        })
    } else {
        return res.json(null);
    }
}

/**
 * Update profile
 */
exports.update = function (req, res) {
    var id = req.params.userId
    var password = req.body.password
    User.updatePasswordByUserId(id, password, function (err, result) {
        if (err) {
            logger.error(err, "LOG AT:" + __filename + ":" + __line);
            return res.status(500).send({message: 'update passwprd failed!'});
        }
        return res.send({message: 'update password success!'});
    })
}

/**
 * Find user by id
 */
exports.user = function (req, res, next, id) {
    User.findOnebyId(id, function (err, user) {
        if (err) {
            logger.error(err, "LOG AT:" + __filename + ":" + __line);
            return next(err)
        }
        if (!user) return next(new Error('Failed to load User ' + id))
        req.profile = user
        next()
    })
}

exports.checkPassword = function (req, res) {
//  console.log("@@@@@@@@@@")
//  logger.info("req.params:",req.body);
    User.checkPasswordbyId(req.body.id, function (err, user) {
        if (err) {
            logger.error(err, "LOG AT:" + __filename + ":" + __line);
            return next(err)
        }
        if (!user) {
            logger.error('Failed to checkPassword', "LOG AT:" + __filename + ":" + __line);
            return next(new Error('Failed to checkPassword ' + id))
        }
//     logger.info('user:',user)
        if (user.hashed_password === kit.md5Password(req.body.password)) {
            return res.send({tag: true});
        } else {
            return res.send({tag: false});
        }
    })
}