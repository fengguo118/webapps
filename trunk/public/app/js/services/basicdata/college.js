//College service used for articles REST endpoint
window.app.factory("College", function($resource){
  return $resource(window.restful.baseURL+'/college/:collegeID', {collegeID:'@id'}, {
    update: { method: 'PUT' },
    getAll:{method:'GET',params:{collegeID:'get_all'}}
  });
});