(function() {
	var patientSignUpService = require('./patientSignUp.service');

	var patientSignUpController = require('./patientSignUp.controller');

	var configuration = require('./configuration.js');

	var app = angular.module('patientSignUp', ['ngRoute', 'ngResource', 'ngMessages']);

	app.config(['$routeProvider', '$resourceProvider', configuration]);

	app.service('patientSignUpService', ['$resource', patientSignUpService]);

	app.controller('patientSignUpController', ['$scope', '$routeParams', '$route', '$rootScope','patientSignUpService', patientSignUpController]);
})();
