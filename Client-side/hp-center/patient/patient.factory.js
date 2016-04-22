module.exports = function($resource, $rootScope, activeCondition_factory, observation_factory) {
	var hpId = sessionStorage.getItem("medicloud_hp_id");
	var url = 'http://' + window.location.hostname + '\\:8080/api/hp/:hpId/patients/:patientId';
	var client = $resource(url, {
		hpId: hpId,
		patientId: '@patientId'
	});

	var url_cond = url + "/conditions/:conditionId";
	var cond_client = $resource(url_cond, {
		hpId: hpId,
		patientId: '@patientId',
		conditionId: '@conditionId'
	});

	var url_obs = url + "/observations/:obsId";
	var obsList = $resource(url_obs, {
		hpId: hpId,
		patientId: '@patientId',
		obsId: '@obsId'
	});

	var patient = function(patientId) {
		this.patientId = patientId;
		this.onLoadCallback = angular.noop;
		this.onFailureCallback = angular.noop;
		this.conditions = [];
		this.observations = [];
		this.fetch();
	}

	patient.prototype = {
		constructor: patient
		, onLoad: function(callback) {
			this.onLoadCallback = callback;
		}
		, onFailure: function(callback) {
			this.onFailureCallback = callback;
		}
		, fetch: function() {
			var self = this;

			var promise = client.get({
				patientId: self.patientId
			}, function(response, headers) {
				angular.extend(self, response);
				self.onLoadCallback.call(self, response);
			}, function(response) {
				$rootScope.$broadcast('error', response);
				self.onFailureCallback.call(self, response);
			});

			return promise;
		}
		, fetchConditions: function() {
			var self = this;

			self.conditions.splice(0, self.conditions.length);

			var promise = cond_client.query({
				patientId: self.patientId
			}, function(response) {
				angular.copy(response, self.conditions);
			}, function(response) {
				$rootScope.$broadcast('error', response);
			}).$promise;

			return promise;
		}
		, addActiveCondition: function(name, severity, description, infer_c_id) {
			var self = this;

			var newAC = new activeCondition_factory(self);
			newAC.name = name;
			newAC.severity = severity;
			newAC.description = description;
			newAC.inferCId = infer_c_id;

			var savedActiveCondition = newAC.save();
			savedActiveCondition.$promise
				.then(
					function(response) {
						self.conditions.unshift(savedActiveCondition);
					},
					function(response) {
						$rootScope.$broadcast('error', response);
					});

			return savedActiveCondition.$promise;
		}
		,fetchObservations: function() {
			var self = this;
			self.observations.splice(0, self.observations.length);

			var promise = obsList.query(
					{ patientId: self.patientId }
					, function(response) {
						angular.copy(response, self.observations);
					}
					, function(failure) {
						$rootScope.$broadcast('error', failure);
					}
				);

			return promise;
		}
		, addNewObservation: function(formData) {
			var self = this;
			var newObservation = observation_factory.save(
				{ hpId: hpId, patientId: self.patientId }, 
				formData
			);

			newObservation.$promise.then(
				function(response) {
					self.observations.unshift(newObservation);
				}
				,
				function(failure) {
					$rootScope.$broadcast('error', failure);
				}
			)

			return newObservation.$promise;
		}
	}

	return patient;
}