module.exports = function($resource, $rootScope, activeCondition_factory, observation_factory, encounterList_factory) {
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
        this.encounters = [];
        this.lastVisit = null;
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

            var newAC = activeCondition_factory.save({
                name: name,
                severity: severity,
                description: description,
                inferCId: infer_c_id,
                patient: self,
                patientId: self.patientId
            });

            newAC.$promise
                .then(
                        function(response) {
                            self.conditions.unshift(newAC);
                        },
                        function(response) {
                            $rootScope.$broadcast('error', response);
                        });

            return newAC.$promise;
        }
        ,fetchObservations: function() {
            var self = this;
            self.observations.splice(0, self.observations.length);

            var newList = obsList.query(
                    { patientId: self.patientId }
                    , function(response) {
                        angular.copy(response, self.observations);
                    }
                    , function(failure) {
                        $rootScope.$broadcast('error', failure);
                    }
                    );

            return newList.$promise;
        }
        , addNewObservation: function(formData) {
            var self = this;
            var newObservation = observation_factory.save(
                    { hpId: hpId, patientId: self.patientId }, 
                    formData
                    );

            newObservation.$promise.then(
                    function(response) {
                        self.fetchObservations();
                        self.fetchEncounters();
                    }
                    ,
                    function(failure) {
                        $rootScope.$broadcast('error', failure);
                    }
                    )

                return newObservation.$promise;
        }
        , fetchEncounters: function() {
            var self = this;
            self.encounters.splice(0, self.encounters.length);

            var newList = encounterList_factory.query(
                    { hpId: hpId, patientId: self.patientId }
                    , function(response) {
                        angular.copy(response, self.encounters);
                        if (self.encounters.length > 0) {
                            self.lastVisit = self.encounters[0].encounterDateTime;
                        }
                    }
                    , function(failure) {
                        $rootScope.$broadcast('error', failure);
                    }
                    );

            return newList.$promise;
        }
    }

    return patient;
}
