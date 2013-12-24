var courseSchedule = require("../models/courseSchedule");

courseSchedule.queryCourseSchedule(null,function(err,result){


  var schdedule = {
     _2 : {
        timeName : "",
        Monday : "",
        Tuesday : "",
        Wednesday : "",
        Thursday : "",
        Friday : "",
        Saturday : ""
      },
     _4 : {
        timeName : "",
        Monday : "",
        Tuesday : "",
        Wednesday : "",
        Thursday : "",
        Friday : "",
        Saturday : ""
      },
     _6 : {
        timeName : "",
        Monday : "",
        Tuesday : "",
        Wednesday : "",
        Thursday : "",
        Friday : "",
        Saturday : ""
      },
     _8 : {
        timeName : "",
        Monday : "",
        Tuesday : "",
        Wednesday : "",
        Thursday : "",
        Friday : "",
        Saturday : ""
      },
     _10 : {
        timeName : "",
        Monday : "",
        Tuesday : "",
        Wednesday : "",
        Thursday : "",
        Friday : "",
        Saturday : ""
      }
  };

  result.forEach(function(value){
//    console.log(value)
    switch (value.sortNum){
      case 2 :
        if(!schdedule._2.timeName)
          schdedule._2.timeName = value.timeName;
        oneItem(value,schdedule._2);
        break;
      case 4 :
        if(!schdedule._4.timeName)
          schdedule._4.timeName = value.timeName;
        oneItem(value,schdedule._4);
        break;
      case 6 :
        if(!schdedule._6.timeName)
          schdedule._6.timeName = value.timeName;
        oneItem(value,schdedule._6);
        break;
      case 8 :
        if(!schdedule._8.timeName)
          schdedule._8.timeName = value.timeName;
        oneItem(value,schdedule._8);
        break;
      case 10 :
        if(!schdedule._10.timeName)
          schdedule._10.timeName = value.timeName;
        oneItem(value,schdedule._10);
        break;
    }
  });

  console.log("schdedule:",schdedule)

  return;
})

function oneItem(param,obj){
  switch (param.day_of_week){
    case 1 :
      obj.Monday = param.courseName;
      break;
    case 2 :
      obj.Tuesday = param.courseName;
      break;
    case 3 :
      obj.Wednesday = param.courseName;
      break;
    case 4 :
      obj.Thursday = param.courseName;
      break;
    case 5 :
      obj.Friday = param.courseName;
      break;
    case 6 :
      obj.Saturday = param.courseName;
      break;
  }
}

//console.log(result)