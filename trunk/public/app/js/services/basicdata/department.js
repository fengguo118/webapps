//Classroom service used for articles REST endpoint
window.app.factory("Department", function($resource){
  return $resource(window.restful.baseURL+'/department/:departmentID', {departmentID:'@id'}, {
//    signin: {method: 'POST', params:{userID:'session'}},
//    signout: {method: 'POST', params:{userID:'signout'}},
    update: { method: 'PUT' },
    getAll:{method:'GET',params:{departmentID:'get_all'}}
  });
});