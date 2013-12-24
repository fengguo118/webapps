//Teacher service used for articles REST endpoint
window.app.factory("Teacher", function($resource){
  return $resource(window.restful.baseURL+'/teacher/:ID/:userID/:collegeID', {ID:'@id',userID:'@userid'}, {
//    signin: {method: 'POST', params:{userID:'session'}},
//    signout: {method: 'POST', params:{userID:'signout'}},
    update: { method: 'PUT' },
    getAll:{method:'GET',params:{userID:'get_all'}},
    getAllByCollege:{method:'GET',params:{userID:'get_all_by_college'}},
    getByCollege:{method:'GET',params:{userID:'get_by_college'}},
    checkTeacherIDDuplication:{method:'GET',params:{userID:'check_teacherid_duplication'}}
  });
});