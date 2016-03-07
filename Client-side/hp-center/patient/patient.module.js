function patient_module() {
	var timerStart = Date.now();
	var scripts = [
		"patient/main.controller.js",
		"share/modal.directive.js",
		"patient/patient.service.js",
		"patient/profile/profile.controller.js",
		"patient/conditions/conditions.controller.js",
		"condition/condition.directive.js",
		"condition/newCondition.directive.js",
		"condition/condition.factory.js",
		"condition/conditionSearch.directive.js",
		"condition/infermedicaConditions.service.js",
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
		app
			.service('infermedicaConditions_serv', ['$resource', '$rootScope', infermedicaConditions_serv])
			.service('patient_serv', ['$resource', '$rootScope', patient_serv])
			.factory('condition_fact', ['$resource', '$rootScope', condition_fact])
		;

		// directives
		app
			.directive('mcConditionSearch', conditionSearch_dir)
			.directive('mcCondition', condition_dir)
			.directive('mcNewCondition', newCondition_dir)
			.directive('mcModal', modal_dir)
		;

		// controllers
		app
			.controller("profile_ctrl", ['$scope', 'patient_serv', profile_ctrl])
			.controller("conditions_ctrl", ['$scope', 'patient_serv', conditions_ctrl])
			.controller("observations_ctrl", ['$scope', 'patient_serv', observations_ctrl])
			.controller("main_ctrl", ['$scope', 'patient_serv', main_ctrl])
		;

		console.log('*** Finished loading patient module. Module loading time: ' + (Date.now() - timerStart));

		that.module_ready();
	}

	init();
}