var app = angular.module('contactsApp', []);

// directives
app.directive('modalDialog', formAddPatient_dir);

// controllers
app.controller("patientsList_ctrl", patientsList_ctrl);


