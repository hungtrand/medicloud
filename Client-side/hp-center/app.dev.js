(function() {
	// patients_module = require("./patients/patients.module");
	var patient_module = require("./patient/patient.module");
	var hpPatientList_module = require("./patients/patients.module");

	patient_module();
	hpPatientList_module();

	var app = new angular.module("hp-center", ['ngRoute', 'hpPatient', 'hpPatientList']);

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