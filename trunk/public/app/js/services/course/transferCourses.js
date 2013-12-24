//TransferCourses service used for articles REST endpoint
window.app.factory("TransferCourses", function($resource){
  return $resource(window.restful.baseURL+'/transfer_courses/:transferCoursesID', {transferCoursesID:'@id'}, {
//    signin: {method: 'POST', params:{userID:'session'}},
//    signout: {method: 'POST', params:{userID:'signout'}},
    update: { method: 'PUT' },
    upload : {method : 'POST',params:{transferCoursesID:'upload'}},
    getAllFreeTime : {method:'GET',params:{transferCoursesID:'get_all_freetime'}},
    pass: { method: 'PUT' ,params:{transferCoursesID:'pass'}},
    refused: { method: 'PUT' ,params:{transferCoursesID:'refused'}},
    getTransferAheadDays: { method: 'get' ,params:{transferCoursesID:'get_transfer_ahead_days'}}
  });
});