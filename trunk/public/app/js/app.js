window.app = angular.module('AMS4U', ['ngCookies', 'ngResource', 'ngRoute','ui.bootstrap','ui.bootstrap.datetimepicker','$strap.directives','ngSelect','angularFileUpload','ui.bootstrap','ui.slider']);

/*
* 
*   User Managemente for main
*
*/
window.app.run(function($rootScope,localStorage, CourseSchedule,$location, $timeout){
  //.. watch change on location.path()
  $rootScope.location = $location;
  $rootScope.$watch('location.path()', function( path ) {
    //.. path to logout
    if (path == '/signout') {  
      $rootScope.setUserStatus('',false,'',false);
      $location.path('/');
    }
    if(!$rootScope.Signed){
      $location.path('/signin');
    }
  });

  //.. uncomment for cleaning
  // localStorage.set('user-access','');
  // localStorage.set('user-name','');
  // localStorage.set('is-user-signed','false');
  // localStorage.set('user-profile','USER');

  $rootScope.profileName = localStorage.get('user-profile');
  $rootScope.uuser = localStorage.get('user-access');
  $rootScope.userName = localStorage.get('user-name');
  $rootScope.Signed =  localStorage.getB('is-user-signed');
  //系统配置单双周
  $rootScope.isEvenUsed = 0;

  //.. set user signed or unsigned stae to localStorage
  $rootScope.setUserStatus = function(uname, ustate, uuser, uprofile){
    localStorage.set('user-access', uuser);
    localStorage.set('user-name', uname);
    localStorage.set('is-user-signed', ustate);
    localStorage.set('user-profile', uprofile);
    $rootScope.userName =  uname;
    $rootScope.Signed = ustate;
    $rootScope.uuser = uuser;
    $rootScope.profileName =  uprofile;

  }
});
