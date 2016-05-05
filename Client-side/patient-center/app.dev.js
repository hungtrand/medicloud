(function() {
    var configuration = require('./configuration');

    var calendar_directive = require('./calendar');
    var profileView_directive = require("./profile/profile-view.directive");
    var profileEdit_directive = require("./profile/profile-edit.directive");

    var appointmentModal_directive = require('./appointment-modal/modal.directive');
    
    var profile_factory = require('./profile/profile.factory');
    var hpList_factory = require('./health-professionals/hp-list.factory');
    var encounterList_factory = require("./encounters/encounter-list.factory");
    var activeConditionList_factory = require("./active-conditions/active-condition-list.factory");

    var patientCenterModel_service = require("./model.service");

    var main_controller = require("./main.controller");
    var profile_controller = require("./profile/profile.controller");
    var healthProfessionalsDirectory_controller = require("./health-professionals/health-professionals-directory.controller");
    var encounterList_controller = require("./encounters/encounters.controller");
    var activeConditionList_controller = require("./active-conditions/active-conditions.controller");

    var app = angular.module('patientCenter', ['ngRoute', 'ngResource', 'ngAnimate']);

    app.config(['$routeProvider', '$httpProvider', configuration]);

    app
        .directive('calendar_directive', calendar_directive)
        .directive('appointmentModal_directive', appointmentModal_directive)
        .directive('patientCenterProfileView', profileView_directive)
        .directive('patientCenterProfileEdit', profileEdit_directive)
    ;

    app
        .factory('patientCenter_profile_factory', ['$resource', profile_factory])
        .factory('patientCenter_hpList_factory', ['$resource', hpList_factory])
        .factory('patientCenter_encounterList_factory', ['$resource', encounterList_factory])
        .factory('patientCenter_activeConditionList_factory', ['$resource', activeConditionList_factory])
    ;

    app
        .service('patientCenter_model_service', 
                ['$resource', 'patientCenter_profile_factory', 
                'patientCenter_hpList_factory','patientCenter_encounterList_factory',
                'patientCenter_activeConditionList_factory',
                patientCenterModel_service])
    ;

    app
        .controller('patientCenter_main_controller', 
            ['$scope', 'patientCenter_model_service', main_controller])
        .controller("patientCenter_profile_controller",
            ['$scope', '$filter', 'patientCenter_model_service', profile_controller])
        .controller("patientCenter_healthProfessionalsDirectory_controller", 
            ['$scope', 'patientCenter_model_service', healthProfessionalsDirectory_controller])
        .controller("patientCenter_encounterList_controller",
            ['$scope', 'patientCenter_model_service', encounterList_controller])
        .controller("patientCenter_activeConditionList_controller",
            ['$scope', 'patientCenter_model_service', activeConditionList_controller])
    ;
})();
