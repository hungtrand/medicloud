(function() {
	var patientCenterService = require('./patientCenter.service');

	var patientCenterController = require('./patientCenter.controller');

	var configuration = require('./configuration.js');

	var calendarDirective = require('./calendar.js');

	var appointmentModalDirective = require('./formAddPatient/modal.directive.js')

	var app = angular.module('patientCenter', ['ngRoute', 'ngResource']);

	app.config(['$routeProvider', configuration]);

	app.directive('calendarDirective', calendarDirective);

	app.directive('appointmentModalDirective', appointmentModalDirective);

	app.service('patientCenterService', ['$http', '$resource', patientCenterService]);

	app.controller('patientCenterController', ['$scope', '$routeParams', '$route', '$rootScope','patientCenterService', patientCenterController]);
})();
