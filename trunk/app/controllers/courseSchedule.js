var CourseSchedule = require('../models/courseSchedule');
var Course = require('../models/course');
var kit = require("../utils/kit");
var logger = kit.getLogger();

/**
 * Create CourseSchedule
 */
exports.create = function (req, res) {
    CourseSchedule.insertCourseSchedule(req.body, function (err, result) {
        if (err) {
            logger.error(err, "LOG AT:" + __filename + ":" + __line);
            return res.status(500).send({message: 'create CourseSchedule failed!'});
        }
        logger.error("%%%%%%%%%%result:", result);
        if (result === 'already exist') {
            res.json({message: 'already exist'})
        }
        return res.send({message: result});
    })
}

/**
 * delete CourseSchedule
 */
exports.delete = function (req, res) {
    CourseSchedule.deleteCourseScheduleById(req.params.courseScheduleID, function (err, result) {
        if (err) {
            logger.error(err, "LOG AT:" + __filename + ":" + __line);
            return res.status(500).send({message: 'delete CourseSchedule failed!'});
        }
        return res.send({message: 'delete CourseSchedule success!'});
    })
}


exports.index = function (req, res, next) {
    CourseSchedule.selectAllCourseSchedules(req.pageIndex, req.pageLimit, function (err, result) {
        if (err) {
            logger.error(err, "LOG AT:" + __filename + ":" + __line);
            return res.status(500).send({message: 'load CourseSchedule failed!'});
        }
        CourseSchedule.getTotal(function (err, total) {
            if (err) {
                logger.error(err, "LOG AT:" + __filename + ":" + __line);
                return res.status(500).send({message: 'load Total failed!'});
            }
            var colleges = {
                entities: result,
                total: total
            }
            if (!!result) {
                var statusCode = (result.length === 0) ? 204 : 200
//        console.log('typeof total',typeof total)
                res.json(statusCode, {total: total, entities: result})
            } else {
                res.json(204, {total: 0})
            }
        })
    })
}

exports.update = function (req, res) {
    CourseSchedule.updateCourseScheduleById(req.body, function (err, result) {
        if (err) {
            logger.error(err, "LOG AT:" + __filename + ":" + __line);
            return res.status(500).send({message: 'update CourseSchedule failed!'});
        }
        if (result === 'already exist') {
            res.json({message: 'already exist'})
        }
        return res.send({message: result});
    })
}

exports.getAll = function (req, res, next) {
    CourseSchedule.getAll(function (err, result) {
        if (err) {
            logger.error(err, "LOG AT:" + __filename + ":" + __line);
            return res.status(500).send({message: 'load all CourseSchedule failed!'});
        }
        if (!!result) {
            var statusCode = (result.length === 0) ? 204 : 200
            res.json(statusCode, {entities: result})
        } else {
            res.json(204, {total: 0})
        }
    })
}

exports.getColleageByName = function (req, res, next) {
   CourseSchedule.getColleageByUserID(req.query.id, function (err, result) {
        if (err) {
            logger.error(err, "LOG AT:" + __filename + ":" + __line);
            return res.status(500).send({message: 'get colleage by id failed!'});
        }
        if (result) {
            var statusCode = (result.length === 0) ? 204 : 200
            res.json(statusCode, {colleage: result});
        } else {
            res.json(204, {colleage: 0});
        }
    })
}


exports.getColleageByNameForCounsellor = function (req, res, next) {
   CourseSchedule.getColleageByUserIDForCounsellor(req.query.id, function (err, result) {
        if (err) {
            logger.error(err, "LOG AT:" + __filename + ":" + __line);
            return res.status(500).send({message: 'get colleage by id failed!'});
        }
        if (result) {
            var statusCode = (result.length === 0) ? 204 : 200
            res.json(statusCode, {colleage: result});
        } else {
            res.json(204, {colleage: 0});
        }
    })
}







exports.queryCourseSchedule = function (req, res, next) {
    var courseIDsArray = [];
    if (req.query.classID) {
        Course.getAllByClassID(req.query.classID, function (err, result) {
            if (err) {
                logger.error(err, "LOG AT:" + __filename + ":" + __line);
                return res.status(500).send({message: 'load all CourseSchedule failed!'});
            }
            if (!result) {
                return res.json(204, {total: 0})
            }
            result.forEach(function (value) {
                courseIDsArray.push(value.course_id);
            });
            CourseSchedule.queryCourseSchedule(courseIDsArray, req.query.evenUsed, function (err, result) {
                if (err) {
                    logger.error(err, "LOG AT:" + __filename + ":" + __line);
                    return res.status(500).send({message: 'load all CourseSchedule failed!'});
                }
                CourseSchedule.findCourseTransferByCourseID(courseIDsArray, function (err, changes) {
                    if (err) {
                        logger.error(err, "LOG AT:" + __filename + ":" + __line);
                        return res.status(500).send({message: 'load all CourseSchedule failed!'});
                    }
                    if (!!result) {
                        var statusCode = (result.length === 0) ? 204 : 200
                        res.json(statusCode, {
                            entities: result,
                            changes: changes
                        });
                    } else {
                        res.json(204, {total: 0})
                    }
                });
            });
        });
    }
    if (req.query.studentID) {
        Course.getAllByStudentID(req.query.studentID, function (err, result) {
            if (err) {
                logger.error(err, "LOG AT:" + __filename + ":" + __line);
                return res.status(500).send({message: 'load all CourseSchedule failed!'});
            }
            if (!result) {
                logger.error('null result!', "LOG AT:" + __filename + ":" + __line);
                return res.status(500).send({message: 'null result!'});
            }
            if (!result) {
                return res.json(204, {total: 0})
            }
            result.forEach(function (value) {
                courseIDsArray.push(value.course_id);
            });
            CourseSchedule.queryCourseSchedule(courseIDsArray, req.query.evenUsed, function (err, result) {
                if (err) {
                    logger.error(err, "LOG AT:" + __filename + ":" + __line);
                    return res.status(500).send({message: 'load all CourseSchedule failed!'});
                }
                CourseSchedule.findCourseTransferByCourseID(courseIDsArray, function (err, changes) {
                    if (err) {
                        logger.error(err, "LOG AT:" + __filename + ":" + __line);
                        return res.status(500).send({message: 'load all CourseSchedule failed!'});
                    }
                    if (!!result) {
                        var statusCode = (result.length === 0) ? 204 : 200
                        res.json(statusCode, {
                            entities: result,
                            changes: changes
                        });
                    } else {
                        res.json(204, {total: 0})
                    }
                });
            })
        });
    }
}

exports.getIsEvenUsed = function (req, res, next) {
    CourseSchedule.getIsEvenUsed(function (err, result) {
        if (err) {
            logger.error(err, "LOG AT:" + __filename + ":" + __line);
            return res.status(500).send({message: 'load all IsEvenUsed failed!'});
        }
        if (!!result) {
            var statusCode = (result.length === 0) ? 204 : 200
            res.json(statusCode, {entities: result})
        } else {
            res.json(204, {total: 0})
        }
    })
}