var app = angular.module('contactsApp', []);
app.service('patientsListService', patientsListService);
// directives
app.directive('modalDialog', formAddPatient_dir);

// controllers
app.controller("patientsList_ctrl", ['$scope', 'patientsListService', patientsList_ctrl]);
