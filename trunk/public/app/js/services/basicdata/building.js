//Building service used for articles REST endpoint
window.app.factory("Building", function($resource){
  return $resource(window.restful.baseURL+'/building/:buildingID', {buildingID:'@id'}, {
//    signin: {method: 'POST', params:{userID:'session'}},
//    signout: {method: 'POST', params:{userID:'signout'}},
    update: { method: 'PUT' },
    getAll:{method:'GET',params:{buildingID:'get_all'}},
    getAllByCampusID:{method:'GET',params:{buildingID:'get_all_by_campusid'}} ,
    getByCampus:{method:'GET',params:{buildingID:'get_by_campus'}}
  });
});