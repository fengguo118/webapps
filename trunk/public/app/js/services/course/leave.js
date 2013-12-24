//Leave service used for articles REST endpoint
window.app.factory("Leave", function($resource){
  return $resource(window.restful.baseURL+'/leave/:leaveID', {leaveID:'@id'}, {
//    signin: {method: 'POST', params:{userID:'session'}},
//    signout: {method: 'POST', params:{userID:'signout'}},
    update: { method: 'PUT' } ,
    getLeaveAheadDays:{method:'GET',params:{leaveID:'get_leave_ahead_days'}}
  });
});