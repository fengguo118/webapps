//AttendRecord service used for articles REST endpoint
window.app.factory("AttendRecord", function($resource){
  return $resource(window.restful.baseURL+'/attendRecord/:attendRecordID', {attendRecordID:'@id'}, {
//    signin: {method: 'POST', params:{userID:'session'}},
//    signout: {method: 'POST', params:{userID:'signout'}},
//    update: { method: 'PUT' },
//    getAll:{method:'GET',params:{courseID:'get_all'}},
    getQueryAll:{method:'GET',params:{attendRecordID:'get_all'}},
    getByCollegeID:{method:'GET',params:{attendRecordID:'get_by_collegeID'}},
    getBySubjectID:{method:'GET',params:{attendRecordID:'get_by_subjectID'}},
    getBySubjectIDAndGrade:{method:'GET',params:{attendRecordID:'get_by_subjectID_and_grade'}},
    getByClassID:{method:'GET',params:{attendRecordID:'get_by_classID'}},
    getByStudentID:{method:'GET',params:{attendRecordID:'get_by_studentID'}} ,
    getByTeacherID:{method:'GET',params:{attendRecordID:'get_by_teacherID'}} ,
    getCourseRecordDetailInStudentView:{method:'GET',params:{attendRecordID:'get_course_record_detail_in_student_view'}} ,
    getQueryAllInCounsellorView:{method:'GET',params:{attendRecordID:'get_query_all_in_counsellor_view'}} ,
    getQueryAll:{method:'GET',params:{attendRecordID:'get_query_all'}},
    getByCollegeID:{method:'GET',params:{attendRecordID:'get_by_collegeid'}}
  });
});