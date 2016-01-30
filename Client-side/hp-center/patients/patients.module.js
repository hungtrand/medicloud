function patients_module() {
	var timerStart = Date.now();
	var scripts = [
		"patients/formAddPatient/formAddPatient.directive.js",
		"patients/patientsList/patientsList.controller.js",
		"patients/patientsList/patientsList.service.js"
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

		console.log("*** Initializing patients module...");
		var app = angular.module('patientsApp', ['ngRoute']);
		app.config(['$routeProvider', function($routeProvider) {
			'use strict';
			$routeProvider
				.when('/patients/', {
					templateUrl: 'patients/',
					controller: 'patientsList_ctrl'
				});
		}])

		// services
		app.service('patientsListService', ["$http", "$rootScope", patientsListService]);

		// directives
		app.directive('modalDialog', formAddPatient_dir);

		// controllers
		app.controller("patientsList_ctrl", ['$scope', '$rootScope', 'patientsListService', patientsList_ctrl]);

		console.log('*** Finished loading patients module. Module loading time: ' + (Date.now() - timerStart));

		that.module_ready();
	}

	init();
}
