(function() {
	// patients_module = require("./patients/patients.module");
	var patient_module = require("./patient/patient.module");
	var hpPatientList_module = require("./patients/patients.module");
	var hpCalendar_module = require('./calendar/calendar.module');
	patient_module();
	hpPatientList_module();
	hpCalendar_module();
	var app = new angular.module("hp-center", ['ngRoute', 'hpPatient', 'hpPatientList', 'hpCalendar']);

	// routing and navigation configuration
	app.config(['$routeProvider', function($routeProvider) {
		'use strict';
		$routeProvider
			.when('/', {
				templateUrl: 'dashboard/'
			})
			.otherwise({
				redirectTo: '/'
			});

	}]);

	// directives

	// services and factories

	// controllers

	// initiate
	angular.bootstrap(window.document, ['hp-center']);

})();
