function conditions_ctrl($scope, patient_serv) {
	$scope.conditions = patient_serv.data.conditions;
	$scope.newConditions = [];

	var sync_conditions = function() {
		$scope.conditions = patient_serv.data.conditions;
	} 

	$scope.$on('patient_service.data.updated', function() {
		sync_conditions();
	});

	$scope.appendNewCondition = function() {
		$scope.newConditions.unshift({
			"conditionId": 0,
			"name": '',
			"startObs": null,
			"endObs": null,
			"comments": ''	
		});
	}

	$scope.$on('newCondition.cancel', function(evt, data) {
		var indexToRemove = $scope.newConditions.indexOf(data);
		$scope.newConditions.splice(indexToRemove, 1);
	});

	$scope.$on('newCondition.save', function(evt, data) {
		console.log('saved');
	});
}