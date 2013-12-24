//Campus service used for articles REST endpoint
window.app.factory("Campus", function($resource){
  return $resource(window.restful.baseURL+'/campus/:campusID', {campusID:'@id'}, {
//    signin: {method: 'POST', params:{userID:'session'}},
//    signout: {method: 'POST', params:{userID:'signout'}},
    update: { method: 'PUT' },
    getAll:{method:'GET',params:{campusID:'get_all'}}
  });
});