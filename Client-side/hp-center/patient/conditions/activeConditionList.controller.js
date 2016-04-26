module.exports = function($scope, models_service, $route, $routeParams) {
	$scope.patient = models_service.getPatient($routeParams['patient_id']);
	$scope.patient.fetchConditions();
	$scope.newActiveConditionForms = [];
    
        $scope.observationPickerControl = {};
	$scope.getNewActiveConditionForm = function() {
		$scope.newActiveConditionForms.unshift({});
	}

	$scope.removeForm = function(index) {
		$scope.newActiveConditionForms.splice(index, 1);
	}
}
