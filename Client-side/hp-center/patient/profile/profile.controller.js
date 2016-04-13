module.exports = function($scope, models_service, $route, $routeParams) {
	
	$scope.patient = models_service.getPatient($routeParams['patient_id']);
}
