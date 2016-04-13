module.exports = function($http, $rootScope, $resource) {
    var onSuccessFn;
    var onFailureFn;
    var hpId = sessionStorage.getItem("medicloud_hp_id");
    var url = 'http://' + window.location.hostname + ':8080/api/hp/:hpId/patients/:patientId';
    var service = {
      patients: [],
        getPatients: function() {
            var that = this;
            var client = $resource(url, {
                hpId: hpId
            });

            var promise = client.query().$promise;
            promise.then(function(patient) {
                angular.extend(that.patients, patient);
                (onSuccessFn || angular.noop)();
                onSuccessFn = null;
                onFailureFn = null;
            }, function(error) {
                (onFailureFn || angular.noop)(error);
                onSuccessFn = null;
                onFailureFn = null;
            });

            return this.patients;
        },

        onSuccess: function(fn) {
            onSuccessFn = fn;
            return this;
        },

        onFailure: function(fn) {
            onFailureFn = fn;
            return this;
        }
    }
    return service;
}