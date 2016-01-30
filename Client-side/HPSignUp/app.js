(function() {
	var app = new angular.module("HPSignUp", [ 'ngRoute', 'ngResource' ]);

	/* config: navigation and REST API resource provider */
	app
		.config(["$routeProvider", "$resourceProvider", configuration]);

	/* services / models */
	app
		.service("signUpServ", ["$resource", "$rootScope", signUp_serv])
		.service("verificationServ", ["$resource", "$rootScope", "$location", verification_serv])
		.service("securityServ", ["$resource", "$rootScope", "$location", security_serv]);

	/* controllers */
	app
		.controller("signUpFormCtrl", ["$scope", "signUpServ", signUpForm_ctrl])
		.controller("verificationCtrl", ["$scope", "verificationServ", verification_ctrl])
		.controller("securityCtrl", ["$scope", "securityServ", security_ctrl]);

	/* directives / views */
	app
		.directive('signUpFormDir', ['signUpServ', signUpForm_dir])
		.directive('securitySetupFormDir', ['securityServ', securitySetupForm_dir]);

})();