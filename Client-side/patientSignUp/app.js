(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
	var patientSignUpService = require('./patientSignUp.service');
	
	var patientSignUpController = require('./patientSignUp.controller');

	var app = angular.module('patientSignUp', ['ngRoute', 'ngResource']);
	app.service('patientSignUpService', ['$http', '$resource', patientSignUpService]);
	app.controller('patientSignUpController', ['$scope', 'patientSignUpService', patientSignUpController]);
})();
},{"./patientSignUp.controller":2,"./patientSignUp.service":3}],2:[function(require,module,exports){
module.exports = function ($scope, service) {
	console.log("here");
	$scope.response = "testin";
	$scope.registerPatient = function(newPatientData) {
		service.patientSignUp(newPatientData);
	}
}
},{}],3:[function(require,module,exports){
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
