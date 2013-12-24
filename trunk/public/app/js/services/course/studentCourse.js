//CourseSchedule service used for articles REST endpoint
window.app.factory("StudentCourse", function($resource){
  return $resource(window.restful.baseURL+'/student_course/:studentCourseID', {courseScheduleID:'@id'}, {
//    signin: {method: 'POST', params:{userID:'session'}},
//    signout: {method: 'POST', params:{userID:'signout'}},
    update: { method: 'PUT' },
    upload : {method : 'POST',params:{studentCourseID:'upload'}}
//    getAll:{method:'GET',params:{studentID:'get_all'}}
  });
});