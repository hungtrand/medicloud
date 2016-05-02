module.exports = function($route, $httpProvider) {
    /* config navigation*/
    var auth = require("../Shared/authorization.interceptor");
    $route
	.when('/', {
	    templateUrl : 'profile/profile.html',
            controller: "patientCenter_profile_controller"
	})
        .when("/health-professionals", {
            templateUrl: 'health-professionals/directory.html',
            controller: "patientCenter_healthProfessionalsDirectory_controller"
        })
        .when("/encounters", {
            templateUrl: 'encounters/encounters.html',
            controller: "patientCenter_encounterList_controller"
        })
	.otherwise({
	    redirectTo: '/'
	})
    ;

    $httpProvider.interceptors.push(['$q', '$location', auth]);
}
