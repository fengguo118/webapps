//Schedule service used for articles REST endpoint
window.app.factory("Schedule", function($resource){
  return $resource(window.restful.baseURL+'/schedule/:scheduleID', {scheduleID:'@id'}, {
//    signin: {method: 'POST', params:{userID:'session'}},
//    signout: {method: 'POST', params:{userID:'signout'}},
    update: { method: 'PUT' },
    getAll:{method:'GET',params:{scheduleID:'get_all'}} ,
    getAllByCampusID:{method:'GET',params:{scheduleID:'get_all_by_campusid'}},
    getBySeason:{method:'GET',params:{scheduleID:'get_by_season'}},
    getByCampus:{method:'GET',params:{scheduleID:'get_by_campus'}},
    getByCampusAndSeason:{method:'GET',params:{scheduleID:'get_by_campus_and_season'}}
  });
});