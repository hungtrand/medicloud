module.exports = function() {
	var main_ctrl = require(".//main.controller");
	var modal_dir = require("./../share/modal.directive");
	var patient_serv = require("./patient.service");
	var profile_ctrl = require("./profile/profile.controller");
	var conditionList_ctrl = require("./conditions/activeConditionList.controller");
	// var condition_dir = require("./../condition/condition.directive");
	var newActiveCondition_dir = require("./conditions/newActiveCondition.directive");
	var condition_fact = require("./conditions/activeCondition.factory");
	var conditionSearch_dir = require("./../conditionSearch/conditionSearch.directive");
	var infermedicaConditions_serv = require("./../conditionSearch/infermedicaConditions.service");
	var observations_ctrl = require("./observations/observations.controller");

	var app = angular.module('hpPatient', ['ngRoute', 'ngResource']);
	app.config(['$routeProvider', function($routeProvider) {
		'use strict';
		$routeProvider
			.when('/patient/:patient_id/:tab?', {
				templateUrl: 'patient/',
				controller: 'profile_ctrl'
			});
	}]);

	// services
	app
		.service('infermedicaConditions_serv', ['$resource', '$rootScope', infermedicaConditions_serv])
		.service('patient_serv', ['$resource', '$rootScope', patient_serv])
		.factory('condition_fact', ['$resource', '$rootScope', condition_fact])
	;

	// directives
	app
		.directive('mcConditionSearch', conditionSearch_dir)
		.directive('mcNewActiveCondition', newActiveCondition_dir)
		.directive('mcModal', modal_dir)
	;

	// controllers
	app
		.controller("profile_ctrl", ['$scope', 'patient_serv', profile_ctrl])
		.controller("conditionList_ctrl", ['$scope', 'patient_serv', conditionList_ctrl])
		.controller("observations_ctrl", ['$scope', 'patient_serv', observations_ctrl])
		.controller("main_ctrl", ['$scope', 'patient_serv', main_ctrl])
	;
}