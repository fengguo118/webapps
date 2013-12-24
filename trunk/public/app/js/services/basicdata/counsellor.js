//Counsellor service used for articles REST endpoint
window.app.factory("Counsellor", function($resource){
  return $resource(window.restful.baseURL+'/counsellor/:ID/:userID', {ID:'@id',userID:'@userid'}, {
//    signin: {method: 'POST', params:{userID:'session'}},
//    signout: {method: 'POST', params:{userID:'signout'}},
    update: { method: 'PUT' },
    getAllByCollege:{method:'GET',params:{userID:'get_all_by_college'}},
    getByCollege:{method:'GET',params:{userID:'get_by_college'}},
    checkDuplication:{method:'GET',params:{userID:'check_duplication'}}
//    getAll:{method:'GET',params:{studentID:'get_all'}}
  });
});