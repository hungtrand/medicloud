module.exports = function($scope, models_service, $route, $routeParams) {
	$scope.patient = models_service.getPatient($routeParams['patient_id']);
	$scope.waiting = true;
	$scope.patient
		.fetchEncounters()
		.then(
			function() { $scope.waiting = false; },
			function(failure) {	handleError(failure); }
		);

	$scope.openObservationForm = function() {
		$scope.observationForm.show();
	}

	var handleError = function(failure) {
		$scope.error = failure.error ? failure.error : failure;
				
		$scope.error = angular.isArray($scope.error) ? $scope.error.join("\n") : $scope.error;
		$scope.waiting = false;
	}
}