(function() {
	var patientSignUpService = require('./patientSignUp.service');

	var patientSignUpController = require('./patientSignUp.controller');

	var app = angular.module('patientSignUp', ['ngRoute', 'ngResource']);
	app.service('patientSignUpService', ['$http', '$resource', patientSignUpService]);

	app.controller('patientSignUpController', ['$scope', '$routeParams', '$location', '$rootScope','patientSignUpService', patientSignUpController]);
})();
