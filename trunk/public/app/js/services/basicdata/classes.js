//Classes service used for articles REST endpoint
window.app.factory("Classes", function($resource){
  return $resource(window.restful.baseURL+'/class/:classID', {classID:'@id'}, {
//    signin: {method: 'POST', params:{userID:'session'}},
//    signout: {method: 'POST', params:{userID:'signout'}},
    update: { method: 'PUT' },
    getAll:{method:'GET',params:{classID:'get_all'}},
    getAllByTeacherID:{method:'GET',params:{classID:'get_all_by_teacher_id'}},
    getAllByCounsellorID:{method:'GET',params:{classID:'get_all_by_counsellor_id'}},
    getAllBySubjectIDAndGrade:{method:'GET',params:{classID:'get_all_by_subjectid_and_grade'}} ,
    getByCollege:{method:'GET',params:{classID:'get_by_college'}},
    getBySubject:{method:'GET',params:{classID:'get_by_subject'}},
    getBySubjectIDAndGrade:{method:'GET',params:{classID:'get_by_subject_and_grade'}},
    getBySelectedCourseID:{method:'GET',params:{classID:'get_by_selected_courseID'}}
  });
});