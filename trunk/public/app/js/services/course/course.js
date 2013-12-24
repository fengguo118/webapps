//Course service used for articles REST endpoint
window.app.factory("Course", function($resource){
  return $resource(window.restful.baseURL+'/course/:courseID', {courseID:'@id'}, {
//    signin: {method: 'POST', params:{userID:'session'}},
//    signout: {method: 'POST', params:{userID:'signout'}},
    update: { method: 'PUT' },
    getAll:{method:'GET',params:{courseID:'get_all'}},
    getByCollegeID:{method:'GET',params:{courseID:'get_all_by_collegeID'}},
    getAllByWeekAndTeacherID:{method:'GET',params:{courseID:'get_all_by_week_and_teacherID'}}
  });
});