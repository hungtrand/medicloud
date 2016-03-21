module.exports = function ($scope, service) {
	console.log("here");
	$scope.response = "testin";
	$scope.registerPatient = function(newPatientData) {
		service.patientSignUp(newPatientData);
	}
}