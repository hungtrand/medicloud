module.exports = function($route, $httpProvider) {
    /* config navigation*/
    var auth = require("../Shared/authorization.interceptor");
    $route
	.when('/', {
	    templateUrl : 'profile/profile.html',
            controller: "patientCenter_profile_controller"
	})
	.otherwise({
	    redirectTo: '/'
	})
    ;

    $httpProvider.interceptors.push(['$q', '$location', auth]);
}
