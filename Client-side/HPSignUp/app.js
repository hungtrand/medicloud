(function() {
	var app = new angular.module("HPSignUp", [ 'ngRoute', 'ngResource' ]);

	/*config: navigation and REST API resource provider*/
	app
		.config(["$routeProvider", "$resourceProvider", configuration]);

	/*services*/
	app
		.service("signUpServ", ["$resource", "$rootScope", signUp_serv])
		.service("verificationServ", ["$resource", "$rootScope", "$location", verification_serv]);

	/*controllers*/
	app
		.controller("signUpFormCtrl", ["$scope", "signUpServ", signUpForm_ctrl])
		.controller("verificationCtrl", ["$scope", "verificationServ", verification_ctrl]);

	/*directives*/
	app
		.directive('signUpFormDir', ['signUpServ', signUpForm_dir]);

})();