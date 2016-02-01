function patient_module() {
	var timerStart = Date.now();
	var scripts = [
		"patient/profile/profile.service.js",
		"patient/profile/profile.controller.js"
	];

	var status = includeScripts(scripts);
	var that = this;
	var init = function() {
		if (!status.ready) {
			if (status.timeElapsed % 10000 == 0 && status.timeElapsed > 10000) {
				var conf = confirm('The application takes too long to load. Continue waiting?');
				if (!conf) {
					return false;
				}
			}
			setTimeout(init, 100);
			return false;
		};

		console.log("*** Initializing patient module...");
		var app = angular.module('patient', ['ngRoute', 'ngResource']);
		app.config(['$routeProvider', function($routeProvider) {
			'use strict';
			$routeProvider
				.when('/patient/:patient_id?', {
					templateUrl: 'patient/',
					controller: 'profile_ctrl'
				});
		}]);

		// services
		app.service('profile_serv', ["$resource", profileService]);

		// directives
		// app.directive('modalDialog', formAddPatient_dir);

		// controllers
		app.controller("profile_ctrl", ['$scope', 'profile_serv', profileController]);

		console.log('*** Finished loading patient module. Module loading time: ' + (Date.now() - timerStart));

		that.module_ready();
	}

	init();
}