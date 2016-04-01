(function() {
	var patientCenterService = require('./patientCenter.service');

	var patientCenterController = require('./patientCenter.controller');

	var configuration = require('./configuration.js');

	var app = angular.module('patientSignUp', ['ngRoute', 'ngResource', 'ngMessages']);

	app.config(['$routeProvider', '$resourceProvider', configuration]);

	app.service('patientSignUpService', ['$http', '$resource', patientSignUpService]);

	app.controller('patientSignUpController', ['$scope', '$routeParams', '$route', '$rootScope','patientSignUpService', patientSignUpController]);
})();
