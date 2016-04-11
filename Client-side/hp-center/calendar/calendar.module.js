module.exports = function() {
	//var patientsList_ctrl = require("./patientsList/patientsList.controller");
	var calendarService = require("./calendar.service.js");
	var appointmentModalDirective = require('../modalDialogue/modal.directive');
	var calendarDirective = require('./calendar.js');

	var app = angular.module('hpCalendar', ['ngRoute', 'hpPatientList']);
	app.config(['$routeProvider', function($routeProvider) {
		'use strict';
		$routeProvider
			.when('/calendar/', {
				templateUrl: 'calendar/calendar.html'
			});
	}])
	app.service('calendarService', ["$http", "$rootScope", "$resource", calendarService]);
	app.directive('appointmentModalDirective', appointmentModalDirective);
	app.directive('calendarDirective', calendarDirective);
	//app.controller("patientsList_ctrl", ['$scope', '$rootScope', 'patientsListService', patientsList_ctrl]);
}
