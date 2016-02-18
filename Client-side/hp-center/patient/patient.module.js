function patient_module() {
	var timerStart = Date.now();
	var scripts = [
		"patient/main.controller.js",
		"share/modal.directive.js",
		"patient/patient.service.js",
		"patient/profile/profile.controller.js",
		"patient/observations/observations.controller.js"
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
			setTimeout(init, 100); // keep on calling init to check if status is ready
			return false;
		};

		console.log("*** Initializing patient module...");
		var app = angular.module('patient', ['ngRoute', 'ngResource']);
		app.config(['$routeProvider', function($routeProvider) {
			'use strict';
			$routeProvider
				.when('/patient/:patient_id/:tab?', {
					templateUrl: 'patient/',
					controller: 'profile_ctrl'
				});
		}]);

		// services
		app.service('patient_serv', ['$resource', '$rootScope', patient_serv]);

		// directives
		app.directive('mcModal', mc_modal_dir);

		// controllers
		app.controller("profile_ctrl", ['$scope', 'patient_serv', profile_ctrl]);
		app.controller("observations_ctrl", ['$scope', 'patient_serv', observations_ctrl])
		app.controller("main_ctrl", ['$scope', 'patient_serv', main_ctrl])
		console.log('*** Finished loading patient module. Module loading time: ' + (Date.now() - timerStart));

		that.module_ready();
	}

	init();
}