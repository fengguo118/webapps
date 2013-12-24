//CollegeLeader service used for articles REST endpoint
window.app.factory("CollegeLeader", function($resource){
  return $resource(window.restful.baseURL+'/staffadmin/:ID/:userID/:position/:opration/:type', {ID:'@id',userID:'@userid',position:'collegeLeader'}, {
//    signin: {method: 'POST', params:{userID:'session'}},
//    signout: {method: 'POST', params:{userID:'signout'}},
    update: { method: 'PUT' },
    getByCollege:{method:'GET',params:{opration:'get_by_college'}},
    checkDuplication:{method:'post',params:{type:'check_duplication'}}
  });
});