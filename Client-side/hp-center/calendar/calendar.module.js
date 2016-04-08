module.exports = function() {
	//var patientsList_ctrl = require("./patientsList/patientsList.controller");
	//var patientsListService = require("./patientsList/patientsList.service");
	//var formAddPatient_dir = require("./formAddPatient/formAddPatient.directive");
	var calendarDirective = require('./calendar.js');
	var app = angular.module('hpCalendar', ['ngRoute']);
	app.config(['$routeProvider', function($routeProvider) {
		'use strict';
		$routeProvider
			.when('/calendar/', {
				templateUrl: 'calendar/calendar.html'
			});
	}])
	//app.service('patientsListService', ["$http", "$rootScope", "$resource", patientsListService]);
	app.directive('calendarDirective', calendarDirective);
	//app.controller("patientsList_ctrl", ['$scope', '$rootScope', 'patientsListService', patientsList_ctrl]);
}
