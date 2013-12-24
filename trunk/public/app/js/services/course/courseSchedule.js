//CourseSchedule service used for articles REST endpoint
window.app.factory("CourseSchedule", function($resource){
  return $resource(window.restful.baseURL+'/course_schedule/:courseScheduleID', {courseScheduleID:'@id'}, {
//    signin: {method: 'POST', params:{userID:'session'}},
//    signout: {method: 'POST', params:{userID:'signout'}},
    update: { method: 'PUT' },
    queryCourseSchedule:{method:'GET',params:{courseScheduleID:'query_course_schedule'}},
    getIsEvenUsed:{method:'GET',params:{courseScheduleID:'get_is_evenused'}},
    getColleage:{method:'GET',params:{courseScheduleID:'getColleageByName'}},
    getColleageForCounsellor:{method:'GET',params:{courseScheduleID:'getColleageByNameForCounsellor'}}
  });
});