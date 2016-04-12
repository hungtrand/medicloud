module.exports = function($rootScope, patient_factory, activeCondition_factory) {
	var models = {
		patients: []
		, patientIndex: {}
	}	

	var service = {
		
		getPatient: function(patientId) {
			if (models.patientIndex.hasOwnProperty(patientId)) {
				var index = models.patientIndex[patientId];
				return models.patients[index];
			} else {
				// never delete or slice an element out of array
				// otherwise, the indexing will be messed up and cannot retrieve the right patient
				var newPatientIndex = models.patients.length;
				models.patientIndex[patientId] = newPatientIndex;  // track this index by patient Id
				
				models.patients.push(new patient_factory(patientId));
				
				models.patients[newPatientIndex].onLoad(
					function(response) {
						$rootScope.$broadcast("patients.updated", models.patients[newPatientIndex]);
					}
				);

				models.patients[newPatientIndex].onFailure(
					function(failedResponse) {
						// instead of the deleting from the array, just delete form the index and set it to null
						models.patients[newPatientIndex] = null;
						delete models.patientIndex[patientId];
					}
				);

				return models.patients[newPatientIndex];
			}
		}

		, getPatients: function() {
			return model.patients;
		}

		, addActiveCondition: function(name, severity, description, infer_c_id) {
			var newAC = new activeCondition_factory();
			newAC.name = name;
			newAC.severity = severity;
			newAC.description = description;
			newAC.infer_c_id = infer_c_id;

			console.log(newAC);

			return newAC;
		}
	}

	return service;
}