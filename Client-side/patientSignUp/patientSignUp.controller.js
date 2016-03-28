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
