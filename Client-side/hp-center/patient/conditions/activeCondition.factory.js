module.exports = function($resource, $rootScope) {
	var hpId = sessionStorage.getItem("medicloud_hp_id");
	var url = 'http://' + window.location.hostname + '\\:8080/api/hp/:hpId/patients/:patientId/conditions';
	var client = $resource(url, {
		hpId: hpId,
		patientId: '@patientId'
	});

	var activeCondition = function(patient) {
		this.conditionId = null;
		this.name = '';
		this.description = '';
		this.startObs = null
		this.endObs = null;
		this.inferCId = null;
		this.patient = patient;
	}

	activeCondition.prototype = {
		constructor: activeCondition

		, setStartObs: function(obs) {
			var self = this;

			self.startObs = obs;
		}

		, setEndObs: function(obs) {
			var self = this;

			self.endObs = obs;
		}

		, save: function() {
			var self = this;

			var savedCondition = client.save(
				{ patientId: self.patient.patientId }
				, self
				, function() {
					angular.extend(self, savedCondition);
				}
				, function(response) {
					$rootScope.$broadcast('error', response);
				});

			return savedCondition;
		}
	}

	return activeCondition;
}