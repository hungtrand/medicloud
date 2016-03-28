(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
	var patientSignUpService = require('./patientSignUp.service');

	var patientSignUpController = require('./patientSignUp.controller');

	var configuration = require('./configuration.js');

	var app = angular.module('patientSignUp', ['ngRoute', 'ngResource', 'ngMessages']);

	app.config(['$routeProvider', '$resourceProvider', configuration]);

	app.service('patientSignUpService', ['$http', '$resource', patientSignUpService]);

	app.controller('patientSignUpController', ['$scope', '$routeParams', '$route', '$rootScope','patientSignUpService', patientSignUpController]);
})();

},{"./configuration.js":2,"./patientSignUp.controller":3,"./patientSignUp.service":4}],2:[function(require,module,exports){
module.exports = function configuration($routeProvider, $resourceProvider) {
	/* config navigation*/
	$routeProvider
		.when('/:email', {
			templateUrl : '/',
			controller	: 'patientSignUpController'
		});
	/* config ngResource for REST API*/
}

},{}],3:[function(require,module,exports){
module.exports = function ($scope, $routeParams, $route, $rootScope, service) {
	$scope.response = "testin";
	$scope.state = "";
	$scope.registerPatient = function(newPatientData) {
		newPatientData.email = $routeParams.email;
		if (newPatientData.password === newPatientData.confPassword) {
			service.patientSignUp(newPatientData);
			$scope.state = 'success';
			window.location.href = "../patientCenter";
		}
		else {
			$scope.state = 'mismatchedPasswords';
		}
	}
}

},{}],4:[function(require,module,exports){
module.exports = function ($http, $resource) {
	var service = {
		patientSignUp: function(patient) {
			var client = $resource('http://'+window.location.hostname+':8080/user/patientSignUp');
			client.save(patient);
		}
	}
	return service;
}

},{}]},{},[1]);
