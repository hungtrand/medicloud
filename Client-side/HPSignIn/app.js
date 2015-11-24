(function() {
	var app = new angular.module("HPSignIn", [ 'ngRoute', 'ngResource' ]);

	/* config: navigation and REST API resource provider */
	app
		.config(["$routeProvider", "$resourceProvider", configuration]);

	/* services / models */
	app
		.service("signInServ", ["$resource", "$rootScope", signIn_serv]);

	/* controllers */
	app
		.controller("signInForm", ["$scope", "signInServ", signInForm_ctrl]);

	/* directives / views */
	app
		.directive('signInFormDir', ['signInServ', signInForm_dir]);

})();