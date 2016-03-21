module.exports = function ($scope, $routeParams, $location, $rootScope, service) {
		$(document).on('dblclick', function() {
			console.log($routeParams);
		})
		console.log("Route params are: " + $routeParams.email);


	console.log("here");
	$scope.response = "testin";
	$scope.registerPatient = function(newPatientData) {
		service.patientSignUp(newPatientData);
	}
}
