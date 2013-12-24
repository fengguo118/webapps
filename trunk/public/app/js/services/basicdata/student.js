//Student service used for articles REST endpoint
window.app.factory("Student", function($resource){
  return $resource(window.restful.baseURL+'/student/:ID/:userID', {ID:'@id',userID:'@userid'}, {
//    signin: {method: 'POST', params:{userID:'session'}},
//    signout: {method: 'POST', params:{userID:'signout'}},
    update: { method: 'PUT' },
    getAll:{method:'GET',params:{userID:'get_all'}},
    getAllByClassID:{method:'GET',params:{userID:'get_all_by_classID'}} ,
    getAllByCollegeID:{method:'GET',params:{userID:'get_all_by_collegeID'}} ,
    getAllBySubjectID:{method:'GET',params:{userID:'get_all_by_subjectID'}} ,
    getAllBySubjectIDAndGrade:{method:'GET',params:{userID:'get_all_by_subjectID_and_grade'}} ,
    getByClassID:{method:'GET',params:{userID:'get_by_classID'}},
    getStudentIDByUserID:{method:'GET',params:{userID:'get_student_id_by_userid'}},
    checkStudentIDDuplication:{method:'GET',params:{userID:'check_studentid_duplication'}}
  });
});