//Setting up route
window.app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/crm', { templateUrl: 'views/index.html'}).
	when('/signin', { templateUrl: 'views/sign/signin.html', controller: 'SigninController'}).
	when('/setpwd', { templateUrl: 'views/sign/setpwd.html', controller: 'SettingPasswordController'}).
	otherwise({redirectTo: '/signin'});
}]);

//Setting up Restful Server
window.restful = {
	baseURL: "http://"+window.location.hostname+"\\:8888"
};

//Removing tomcat unspported headers
window.app.config(['$httpProvider', function($httpProvider, Configuration) {
	$httpProvider.defaults.withCredentials = true;
    //delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider', function($locationProvider) {
    //$locationProvider.html5Mode(true);
    $locationProvider.hashPrefix("!");
}]);