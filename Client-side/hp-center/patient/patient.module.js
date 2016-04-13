module.exports = function() {
	var auth = require("../../Shared/authorization.interceptor");

	var main_ctrl = require(".//main.controller");
	var modal_dir = require("./../share/modal.directive");
	var models_service = require("./models.service");

	var patient_factory = require("./patient.factory");
	var profile_ctrl = require("./profile/profile.controller");
	var conditionList_ctrl = require("./conditions/activeConditionList.controller");
	// var condition_dir = require("./../condition/condition.directive");
	var newActiveCondition_dir = require("./conditions/newActiveCondition.directive");
	var activeCondition_factory = require("./conditions/activeCondition.factory");
	var conditionSearch_dir = require("./../conditionSearch/conditionSearch.directive");
	var infermedicaConditions_serv = require("./../conditionSearch/infermedicaConditions.service");
	var observations_ctrl = require("./observations/observations.controller");
    
        // initialize angular module 
	var app = angular.module('hpPatient', ['ngRoute', 'ngResource']);
	app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
		'use strict';
		$routeProvider
			.when('/patient/:patient_id/:tab?', {
				templateUrl: 'patient/',
				controller: 'profile_ctrl'
			});

		$httpProvider.interceptors.push(['$q', '$location', auth]);
	}]);

	// services
	app
		.service('models_service', ['$rootScope', 'patient_factory', 'activeCondition_factory', models_service])
		.service('infermedicaConditions_serv', 
			 ['$resource', '$rootScope', infermedicaConditions_serv])
		.service('patient_factory', ['$resource', '$rootScope', '$route', '$routeParams', patient_factory])
		.factory('activeCondition_factory', ['$resource', '$rootScope', activeCondition_factory])
	;

	// directives
	app
		.directive('mcConditionSearch', conditionSearch_dir)
		.directive('mcNewActiveCondition', newActiveCondition_dir)
		.directive('mcModal', modal_dir)
	;

	// controllers
	app
		.controller("profile_ctrl", ['$scope', 'models_service', '$route', '$routeParams', profile_ctrl])
		.controller("conditionList_ctrl", ['$scope', 'models_service', '$route', '$routeParams', conditionList_ctrl])
		.controller("observations_ctrl", ['$scope', 'models_service', '$route', '$routeParams', observations_ctrl])
		.controller("main_ctrl", ['$scope', 'models_service', '$route', '$routeParams', main_ctrl])
	;
}
