module.exports = function() {
	var patientsList_ctrl = require("./patientsList/patientsList.controller");
	var patientsListService = require("./patientsList/patientsList.service");

	var formAddPatient_dir = require("./formAddPatient/formAddPatient.directive");
	var auth = require("../../Shared/authorization.interceptor");


	var app = angular.module('hpPatientList', ['ngRoute', 'hpCalendar', 'hpPatient']);
	app.config(['$routeProvider', '$httpProvider',
		function($routeProvider, $httpProvider) {
			'use strict';
			$routeProvider
				.when('/patients/', {
					templateUrl: 'patients/',
					controller: 'patientsList_ctrl'
				});

			$httpProvider.interceptors.push(['$q', '$location', auth]);
		}
	])

	// services
	app.service('patientsListService', ["$http", "$rootScope", "$resource", patientsListService]);

	// directives
	app.directive('modalDialog', ["$rootScope", formAddPatient_dir]);

	// controllers
	app.controller("patientsList_ctrl", ['$scope', '$rootScope', 
                'patientsListService', 'calendarService', 'patient_factory', patientsList_ctrl]);

}
