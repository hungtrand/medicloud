module.exports = function($scope, models_service, $route, $routeParams, 
                            labResult_factory, labTests_factory) {
	$scope.patient = models_service.getPatient($routeParams['patient_id']);
	$scope.loading = true;
        $scope.loadingLabTests = true;
        $scope.newLabs = [];
	$scope.patient
		.fetchLabResults()
		.then(
			function() { $scope.loading = false; },
			function(failure) { handleError(failure); }
		);

        $scope.labStatusChoices = [
            "Started", "Pending", "Received", "Processing", "Delivered", "Completed", "Cancelled"    
        ];

        $scope.labTestSuggestions = labTests_factory.query();
        $scope.labTestSuggestions.$promise.then(
                function(response) {
                    $scope.loadingLabTests = false;
                });

	$scope.addLabResult = function() {
            var newLab = new labResult_factory();

            $scope.newLabs.push(newLab);
        }

        $scope.saveNewLab = function(newLab, index) {
            if (!newLab.name) return !(newLab._error = 'name');
            if (!newLab.category) return !(newLab._error = 'category');
            if (!newLab.status) return !(newLab._error = 'status');

            newLab.loading = true;
            $scope.patient.saveLabResult(newLab)
                .then(function() {
                    $scope.newLabs.splice(index, 1);
                });
        }

        $scope.saveLab = function(lab) {
            lab.loading = true;
            lab.$update().then(
                function() {
                    lab.loading = false;
                    lab.edit = false;
                },
                function(failure) {
                    lab.loading = false;
                }
            );
        }

        $scope.selectLabTest = function(newLab, labTest) {
            newLab.name = labTest.name;
            newLab.category = labTest.category;
            newLab.readonly = true;
            newLab.infermedicaLabId = labTest.id;
        }

	var handleError = function(failure) {
		$scope.error = failure.error ? failure.error : failure;
				
		$scope.error = angular.isArray($scope.error) ? $scope.error.join("\n") : $scope.error;
		$scope.waiting = false;
	}
}
