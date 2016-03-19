(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
	var patientSignInService = require('./patientSignIn.service');
	
	var patientSignInController = require('./patientSignIn.controller');
	var app = angular.module('patientSignIn', ['ngRoute']);
	app.service('patientSignInService', ['$http', patientSignInService]);
	app.controller('patientSignInController', ['$scope', 'patientSignInService', patientSignInController]);
})();
},{"./patientSignIn.controller":2,"./patientSignIn.service":3}],2:[function(require,module,exports){
module.exports = function ($scope, service) {
	console.log("here");
	$scope.message = "testin";
}
},{}],3:[function(require,module,exports){
module.exports = function ($http) {
	var service = {
		patientSignIn: function(patient) {

		}
	}
	return service;
}
},{}]},{},[1]);
