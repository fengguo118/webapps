//SchoolLeader service used for articles REST endpoint
window.app.factory("SchoolLeader", function($resource){
  return $resource(window.restful.baseURL+'/staffadmin/:ID/:userID/:position/:type', {ID:'@id',userID:'@userid',position:'schoolLeader'}, {
//    signin: {method: 'POST', params:{userID:'session'}},
//    signout: {method: 'POST', params:{userID:'signout'}},
    update: { method: 'PUT' },
    checkDuplication:{method:'post',params:{type:'check_duplication'}}
  });
});