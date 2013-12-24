//Subject service used for articles REST endpoint
window.app.factory("Subject", function($resource){
  return $resource(window.restful.baseURL+'/subject/:subjectID', {subjectID:'@id'}, {
//    signin: {method: 'POST', params:{userID:'session'}},
//    signout: {method: 'POST', params:{userID:'signout'}},
    update: { method: 'PUT' },
    getAll:{method:'GET',params:{subjectID:'get_all'}},
    getAllByCollegeID:{method:'GET',params:{subjectID:'get_all_by_collegeID'}} ,
    getByCollege:{method:'GET',params:{subjectID:'get_by_college'}}
  });
});