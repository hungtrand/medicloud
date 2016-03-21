module.exports = function($scope, patient_serv) {
	
	var sync_patient_data = function() {
		var patient_data = patient_serv.data;

		$scope.personal = {
			first_name: patient_data.profile.firstName,
			middle_name: patient_data.profile.middleName,
			last_name: patient_data.profile.lastName,
			birthdate: patient_data.profile.birthdate,
			email: patient_data.profile.email,
			address: patient_data.contactInfo.addres || '',
			city: patient_data.contactInfo.city || '',
			state: patient_data.contactInfo.state || '',
			zip: patient_data.contactInfo.zip || ''
		};

		$scope.encounters = patient_data.encounters;
		$scope.notes = patient_data.notes;
	}

	$scope.$on('patient_service.data.updated', function() {
		sync_patient_data();
	});
}
