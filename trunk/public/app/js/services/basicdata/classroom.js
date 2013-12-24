//Classroom service used for articles REST endpoint
window.app.factory("Classroom", function($resource){
  return $resource(window.restful.baseURL+'/classroom/:classroomID', {classroomID:'@id'}, {
//    signin: {method: 'POST', params:{userID:'session'}},
//    signout: {method: 'POST', params:{userID:'signout'}},
    update: { method: 'PUT' },
    getAll:{method:'GET',params:{classroomID:'get_all'}} ,
    getByCampus:{method:'GET',params:{classroomID:'get_by_campus'}},
    getByBuilding:{method:'GET',params:{classroomID:'get_by_building'}}
  });
});