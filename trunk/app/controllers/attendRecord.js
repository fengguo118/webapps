var async = require("async");
var course = require('../models/course');
var counsellor = require('../models/counsellor');
var attendRecord = require('../models/attendRecord');
var kit = require("../utils/kit");
var logger = kit.getLogger();

//考勤结果
var attendResult = [];
var attendData = [];

//exports.getByCollegeID = function (req, res) {
////  logger.info("req.query:",req.query.collegeID);
////  return;
//  async.waterfall([
//    //第一步，获取根据条件获取所有课程信息,课程信息包括：课程ID,课程名称，老师姓名，学院名称
//    function (callback2) {
//      //调用获取课程信息的方法，获取课程信息
//      course.getByCollegeID(req.query.collegeID, function (err, courses) {
//        if (err) throw err;
//        //调用回掉函数，将课程信息结果送给下面的函数去处理
//        callback2(null, courses);
//      });
//    }
//  ], function (err, courses) {
//    try {
//      if (err)  throw err;
//      if (!courses) {
//        return res.send({});
//      }
//      queryRate(err, courses, res);
//    } catch (e) {
//    }
//  });
//}

exports.getByTeacherID = function (req, res) {

    attendRecord.getByTeacherID(req.query.teacherID,function(err,result){
      if (err) {
        logger.error(err,"LOG AT:"+__filename+":"+__line);
        return res.status(500).send({message: 'load all getQueryAllInTeacherView failed!'});
      }
      if(!!result){
        var statusCode = (result.length === 0) ? 204:200
        res.json(statusCode, {entities:result})
      }else{
        res.json(204,{total:0})
      }
    })


//  logger.info("req.query:",req.query.collegeID);
//  return;
//  async.waterfall([
//    //第一步，获取根据条件获取所有课程信息,课程信息包括：课程ID,课程名称，老师姓名，学院名称
//    function (callback2) {
//      //调用获取课程信息的方法，获取课程信息
//      course.getByTeacherID(req.query.teacherID, function (err, courses) {
//        if (err) throw err;
//        //调用回掉函数，将课程信息结果送给下面的函数去处理
//        callback2(null, courses);
//      });
//    }
//  ], function (err, courses) {
//    try {
//      if (err)  throw err;
//      if (!courses) {
//        return res.send({});
//      }
//      logger.error("courses:",courses);
//      queryRate(err, courses, res);
//    } catch (e) {
//    }
//  });
}

exports.getBySubjectID = function (req, res) {

  attendRecord.getBySubjectID(req.query.subjectID,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all getBySubjectID failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200
      res.json(statusCode, {entities:result})
    }else{
      res.json(204,{total:0})
    }
  })

//  async.waterfall([
//    //第一步，获取根据条件获取所有课程信息,课程信息包括：课程ID,课程名称，老师姓名，学院名称
//    function (callback2) {
//      //调用获取课程信息的方法，获取课程信息
//      course.getBySubjectID(req.query.subjectID, function (err, courses) {
//        if (err) throw err;
//        //调用回掉函数，将课程信息结果送给下面的函数去处理
//        callback2(null, courses);
//      });
//    }
//  ], function (err, courses) {
//    try {
//      if (err)  throw err;
//      if (!courses) {
//        return res.send({});
//      }
//      queryRate(err, courses, res);
//    } catch (e) {
//    }
//  });
}

exports.getBySubjectIDAndGrade = function (req, res) {

  attendRecord.getBySubjectIDAndGrade(req.query.subjectID,req.query.grade,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all getBySubjectIDAndGrade failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200
      res.json(statusCode, {entities:result})
    }else{
      res.json(204,{total:0})
    }
  })

//  async.waterfall([
//    //第一步，获取根据条件获取所有课程信息,课程信息包括：课程ID,课程名称，老师姓名，学院名称
//    function (callback2) {
//      //调用获取课程信息的方法，获取课程信息
//      course.getBySubjectIDAndGrade(req.query.subjectID, req.query.grade, function (err, courses) {
//        if (err) throw err;
//        //调用回掉函数，将课程信息结果送给下面的函数去处理
//        callback2(null, courses);
//      });
//    }
//  ], function (err, courses) {
//    try {
//      if (err)  throw err;
//      if (!courses) {
//        return res.send({});
//      }
//      queryRate(err, courses, res);
//    } catch (e) {
//    }
//  });
}

exports.getByClassID = function (req, res) {

  attendRecord.getByClassID(req.query.classID,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all getByClassID failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200
      res.json(statusCode, {entities:result})
    }else{
      res.json(204,{total:0})
    }
  })

//  async.waterfall([
//    //第一步，获取根据条件获取所有课程信息,课程信息包括：课程ID,课程名称，老师姓名，学院名称
//    function (callback2) {
//      //调用获取课程信息的方法，获取课程信息
//      course.getByClassID(req.query.classID, function (err, courses) {
//        if (err) throw err;
//        //调用回掉函数，将课程信息结果送给下面的函数去处理
//        callback2(null, courses);
//      });
//    }
//  ], function (err, courses) {
//    try {
//      if (err)  throw err;
//      if (!courses) {
//        return res.send({});
//      }
//      queryRate(err, courses, res);
//    } catch (e) {
//    }
//  });
}


//exports.getQueryAll = function (req, res) {
//  logger.info("getQueryAll");
//  async.waterfall([
//    //第一步，获取根据条件获取所有课程信息,课程信息包括：课程ID,课程名称，老师姓名，学院名称
//    function (callback2) {
//      //调用获取课程信息的方法，获取课程信息
//      course.getQueryAll(function (err, courses) {
//        if (err)  logger.error(err);
//        //调用回掉函数，将课程信息结果送给下面的函数去处理
//        callback2(null, courses);
//      });
//    }
//  ], function (err, courses) {
//    try {
//      if (err)  throw err;
//      if (!courses) {
//        return res.send({});
//      }
//      queryRate(err, courses, res);
//    } catch (e) {
//    }
//
//  });
//}

exports.getQueryAll = function (req, res) {

  attendRecord.getQueryAll(function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all getQueryAllInCounsellorView failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200
      res.json(statusCode, {entities:result})
    }else{
      res.json(204,{total:0})
    }
  })
}

exports.getByCollegeID = function (req, res) {

  attendRecord.getByCollegeID(req.query.collegeID,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all getQueryAllInTeacherView failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200
      res.json(statusCode, {entities:result})
    }else{
      res.json(204,{total:0})
    }
  })
}


exports.getByStudentID = function (req, res) {

  attendRecord.getByStudentID(req.query.studentID,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all getByStudentID failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200
      res.json(statusCode, {entities:result})
    }else{
      res.json(204,{total:0})
    }
  })

//  logger.info("req.query:", req.query.studentID);

//  async.waterfall([
//    //第一步，获取根据条件获取所有课程信息,课程信息包括：课程ID,课程名称，老师姓名，学院名称
//    function (callback2) {
//      //调用获取课程信息的方法，获取课程信息
//      course.getByStudentID(req.query.studentID,function (err, courses) {
//        if (err) throw err;
//        //调用回掉函数，将课程信息结果送给下面的函数去处理
//        callback2(null, courses);
//      });
//    }
//  ], function (err, courses) {
//
//    console.log("courses:",courses);
//
//    queryCount(err, courses, res,req.query.studentID);
//
//
//  });
}

function queryRate(err, courses, res) {

  //获取到所有的课程信息，循环迭代其中的每一个值，计算每一个课程的考勤率
  console.log('获取到所有的课程信息:', courses);
  async.each(courses, function (courseItem, callback) {
        //对于具体某一课程，依次获取它的出席次数，旷课次数，迟到次数，早退次数，病假次数，事假次数
        console.log('开始迭代课程：', courseItem);
        async.waterfall([
          function (callback3) {
            //获取出席次数
            attendRecord.getAttendNumByCourse(courseItem.course_id, function (err, attendNum) {
              if (err) throw err;
              attendData.push(attendNum);
              callback3(null, attendNum);
            });
          },
          function (p, callback4) {
            //获取旷课次数
            attendRecord.getOutOfClassNumByCourse(courseItem.course_id, function (err, outOfClassNum) {
              if (err) throw err;
              attendData.push(outOfClassNum);
              callback4(null, outOfClassNum);
            });
          },
          function (p, callback5) {
            //获取迟到次数
            attendRecord.getLateNumByCourse(courseItem.course_id, function (err, lateNum) {
              if (err) throw err;
              attendData.push(lateNum);
              callback5(null, lateNum);
            });
          },
          function (p, callback6) {
            //获取早退次数
            attendRecord.getEarlyLeaveNumByCourse(courseItem.course_id, function (err, earlyLeaveNum) {
              if (err) throw err;
              attendData.push(earlyLeaveNum);
              callback6(null, earlyLeaveNum);
            });
          },
          function (p, callback7) {
            //获取病假次数
            attendRecord.getSickLeaveNumByCourse(courseItem.course_id, function (err, sickLeaveNum) {
              if (err) throw err;
              attendData.push(sickLeaveNum);
              callback7(null, sickLeaveNum);
            });
          },
          function (p, callback8) {
            //获取事假次数
            attendRecord.getAffairLeaveNumByCourse(courseItem.course_id, function (err, affairLeaveNum) {
              if (err) throw err;
              attendData.push(affairLeaveNum);
              callback8(null, affairLeaveNum);
            });
          }
        ], function (err, ss) {
          //
          async.waterfall([
            function (callback6) {
              attendRecord.getShouldAttendNumByCourse(courseItem.course_id, function (err, shouldAttendNum) {
                if (err) throw err;
                callback6(null, shouldAttendNum);
              })
            }
          ], function (err, shouldAttendNum) {

            // attendResult.push(attendData);
            console.log('本次', courseItem, " 迭代完成，考勤数据:", attendData, ' 应到:', shouldAttendNum.num);
            //这里把拿到的各项考勤次数和应到次数进行计算，算出各项率添加到attendResult数组中

            var one = new Object();
            one.courseName = courseItem.courseName;
            one.collegeName = courseItem.collegeName;
            one.teacherName = courseItem.teacherName;

            logger.info("@@@@@@@@@@@attendData@@@@@@@@@@@@@@@@:", attendData)

            if(shouldAttendNum.num > 0){
              attendData.forEach(function (value) {
                logger.info("@@@@@@@@@@@value@@@@@@@@@@@@@@@@:", value);
                if (!!value) {
                  if (value.type === 'attendNum') {
                    one.attendRate = value.num / shouldAttendNum.num;
                    one.attendRate = one.attendRate.toFixed(2);
                  }
                  if (value.type === 'outOfClassNum') {
                    one.outOfClassRate = value.num / shouldAttendNum.num;
                    one.outOfClassRate = one.outOfClassRate.toFixed(2);
//                    one.outOfClassRate = one.outOfClassRate*100 + '%'
                  }
                  if (value.type === 'lateNum') {
                    one.lateRate = value.num / shouldAttendNum.num;
                    one.lateRate = one.lateRate.toFixed(2);
//                    one.outOfClassRate = one.outOfClassRate*100 + '%'
                  }
                  if (value.type === 'earlyLeaveNum') {
                    one.earlyLeaveRate = value.num / shouldAttendNum.num;
                    one.earlyLeaveRate = one.earlyLeaveRate.toFixed(2);
//                    one.outOfClassRate = one.outOfClassRate*100 + '%'
                  }
                  if (value.type === 'sickLeaveNum') {
                    one.sickLeaveRate = value.num / shouldAttendNum.num;
                    one.sickLeaveRate = one.sickLeaveRate.toFixed(2);
//                    one.outOfClassRate = one.outOfClassRate*100 + '%'
                  }
                  if (value.type === 'affairLeaveNum') {
                    one.affairLeaveRate = value.num / shouldAttendNum.num;
                    one.affairLeaveRate = one.affairLeaveRate.toFixed(2);
//                    one.outOfClassRate = one.outOfClassRate*100 + '%'
                  }
                }else{
                  one.attendRate = 0;
                  one.outOfClassRate = 0;
                  one.lateRate = 0;
                  one.earlyLeaveRate = 0;
                  one.sickLeaveRate = 0;
                  one.affairLeaveRate = 0;
                }
              });
            }
            console.log("计算结束：", one);
            attendResult.push(one);
            one = new Object();
            callback();
          });
        });
      },
      function (err) {
        //返回最后的统计结果
//        if(!!attendResult){
//          var statusCode = (result.length === 0) ? 204:200
//          res.send({entities:attendResult})
//        }else{
//          res.send({})
//        }
        if (err) throw err;
        res.send({
          entities: attendResult
        });
//        console.log('attendResult done:', attendResult);
        attendResult = [];
      });
}


/**
 * 根据传入的所有课程信息，计算查询 应到次数，实到次数，病假次数，旷课次数，迟到次数，早退次数
 * @param err
 * @param courses
 * @param res
 */
function queryCount(err, courses, res,studentID) {

  //获取到所有的课程信息，循环迭代其中的每一个值，计算每一个课程的考勤率
  console.log('获取到所有的课程信息:', courses);

  if(err){
    throw err;
    return res.send({});
  }
  if(!courses){
    return res.send({});
  }


  async.each(courses, function (courseItem, callback) {
        //对于具体某一课程，依次获取它的出席次数，旷课次数，迟到次数，早退次数，病假次数，事假次数
        console.log('开始迭代课程：', courseItem);
        async.waterfall([
          function (callback3) {
            //获取出席次数
            attendRecord.getAttendNumByCourse(courseItem.course_id, function (err, attendNum) {
              if (err) throw err;
              attendData.push(attendNum);
              callback3(null, attendNum);
            });
          },
          function (p, callback4) {
            //获取旷课次数
            attendRecord.getOutOfClassNumByCourse(courseItem.course_id, function (err, outOfClassNum) {
              if (err) throw err;
              attendData.push(outOfClassNum);
              callback4(null, outOfClassNum);
            });
          },
          function (p, callback5) {
            //获取迟到次数
            attendRecord.getLateNumByCourse(courseItem.course_id, function (err, lateNum) {
              if (err) throw err;
              attendData.push(lateNum);
              callback5(null, lateNum);
            });
          },
          function (p, callback6) {
            //获取早退次数
            attendRecord.getEarlyLeaveNumByCourse(courseItem.course_id, function (err, earlyLeaveNum) {
              if (err) throw err;
              attendData.push(earlyLeaveNum);
              callback6(null, earlyLeaveNum);
            });
          },
          function (p, callback7) {
            //获取病假次数
            attendRecord.getSickLeaveNumByCourse(courseItem.course_id, function (err, sickLeaveNum) {
              if (err) throw err;
              attendData.push(sickLeaveNum);
              callback7(null, sickLeaveNum);
            });
          },
          function (p, callback8) {
            //获取事假次数
            attendRecord.getAffairLeaveNumByCourse(courseItem.course_id, function (err, affairLeaveNum) {
              if (err) throw err;
              attendData.push(affairLeaveNum);
              callback8(null, affairLeaveNum);
            });
          }
        ], function (err, ss) {
          //
          async.waterfall([
            function (callback6) {
              attendRecord.getShouldAttendNumByCourseInStudentView(courseItem.course_id, function (err, shouldAttendNum) {
                if (err) throw err;
                callback6(null, shouldAttendNum);
              })
            }
          ], function (err, shouldAttendNum) {

            // attendResult.push(attendData);
            console.log('本次', courseItem, " 迭代完成，考勤数据:", attendData, ' 应到:', shouldAttendNum.num);
            //这里把拿到的各项考勤次数和应到次数进行计算，算出各项率添加到attendResult数组中

            var one = new Object();
            one.courseName = courseItem.courseName;
            one.shouldAttend = shouldAttendNum.num;
            one.courseID = courseItem.course_id;
            one.studentID = studentID;

            logger.info("@@@@@@@@@@@attendData@@@@@@@@@@@@@@@@:", attendData);

            attendData.forEach(function (value) {
              logger.info("@@@@@@@@@@@value@@@@@@@@@@@@@@@@:", value);
              if (!!value) {
                if (value.type === 'attendNum') {
                  one.realAttend = value.num;
                }
                if (value.type === 'outOfClassNum') {
                  one.outOfClass = value.num;
                }
                if (value.type === 'lateNum') {
                  one.late = value.num;
                }
                if (value.type === 'earlyLeaveNum') {
                  one.earlyLeave = value.num;
                }
                if (value.type === 'sickLeaveNum') {
                  one.sickLeave = value.num;
                }
                if (value.type === 'affairLeaveNum') {
                  one.affairLeave = value.num;
                }
              }
            });

            console.log("计算结束：", one);
            attendResult.push(one);
            one = new Object();
            callback();
          });
        });
      },
      function (err) {
        //返回最后的统计结果
//        if(!!attendResult){
//          var statusCode = (result.length === 0) ? 204:200
//          res.send({entities:attendResult})
//        }else{
//          res.send({})
//        }
        if (err) throw err;
        res.send({
          entities: attendResult
        });
//        console.log('attendResult done:', attendResult);
        attendResult = [];
      });
}

exports.getCourseRecordDetailInStudentView = function(req, res, next) {
//  logger.info("req.query:",req.query);
//  return;
//

  attendRecord.getCourseRecordDetailInStudentView(req.query.courseID,req.query.studentID,function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all getCourseRecordDetailInStudentView failed!'});
    }

    logger.info('getCourseRecordDetailInStudentView:',result);

    if(!!result){
      var statusCode = (result.length === 0) ? 204:200;
      res.json(statusCode, {courseRateDetails:result});
    }else{
      res.json(204,{courseRateDetails:[]})
    }
  })
}

//exports.getQueryAllInCounsellorView = function (req, res) {
////  logger.info("req.query:",req.query.collegeID);
////  return;
//  async.waterfall([
//    //第一步，获取根据条件获取所有课程信息,课程信息包括：课程ID,课程名称，老师姓名，学院名称
//    function (callback2) {
//      //调用获取课程信息的方法，获取课程信息
//      course.getQueryAllInCounsellorView(req.query.collegeID, function (err, courses) {
//        if (err) throw err;
//        //调用回掉函数，将课程信息结果送给下面的函数去处理
//        callback2(null, courses);
//      });
//    }
//  ], function (err, courses) {
//    try {
//      if (err)  throw err;
//      if (!courses) {
//        return res.send({});
//      }
//      queryRate(err, courses, res);
//    } catch (e) {
//    }
//  });
//}


exports.getQueryAllInCounsellorView = function(req,res){

  attendRecord.getQueryAllInCounsellorView(function(err,result){
    if (err) {
      logger.error(err,"LOG AT:"+__filename+":"+__line);
      return res.status(500).send({message: 'load all getQueryAllInCounsellorView failed!'});
    }
    if(!!result){
      var statusCode = (result.length === 0) ? 204:200
      res.json(statusCode, {entities:result})
    }else{
      res.json(204,{total:0})
    }
  })

}


