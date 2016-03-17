(function() {
	var patientSignInService = require('./patientSignIn.service');
	
	var patientSignInController = require('./patientSignIn.controller');
	var app = angular.module('patientSignIn', ['ngRoute']);
	app.service('patientSignInService', ['$http', patientSignInService]);
	app.controller('patientSignInController', ['$scope', 'patientSignInService', patientSignInController]);
})();