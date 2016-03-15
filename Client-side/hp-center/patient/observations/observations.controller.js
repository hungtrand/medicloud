module.exports = function($scope, patient_serv) {
	$scope.modal = {
		show: false,
		addObservationForm: 'patient/observations/addObservationForm.html',
		actions: {}
	}

	var sync_observations = function() {
		$scope.observations = patient_serv.data.observations;
	} 

	$scope.$on('patient_service.data.updated', function() {
		sync_observations();
	});

	$scope.addObservationForm = function() {
		$scope.modal.show = true;
	}
}