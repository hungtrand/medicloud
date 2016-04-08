module.exports = function() {
	var patientsList_ctrl = require("./patientsList/patientsList.controller");
	var patientsListService = require("./patientsList/patientsList.service");
	var formAddPatient_dir = require("./patientsList/formAddPatient/formAddPatient.directive");

	var app = angular.module('hpPatientList', ['ngRoute']);
	app.config(['$routeProvider', function($routeProvider) {
		'use strict';
		$routeProvider
			.when('/patients/', {
				templateUrl: 'patients/',
				controller: 'patientsList_ctrl'
			});
	}])

	// services
	app.service('patientsListService', ["$http", "$rootScope", "$resource", patientsListService]);

	// directives
	app.directive('modalDialog', formAddPatient_dir);

	// controllers
	app.controller("patientsList_ctrl", ['$scope', '$rootScope', 'patientsListService', patientsList_ctrl]);

}
