module.exports = function($http, $rootScope, $resource) {
    var onSuccessFn;
    var onFailureFn;
    var invitationCode;
    var hpId = sessionStorage.getItem("medicloud_hp_id");
    var url = 'http://' + window.location.hostname + ':8080/api/hp/:hpId/patients/:patientId';
    var addExistingPatientUrl = 'http://' + window.location.hostname + ':8080/api/hp/:hpId/patients?addCode=:invitationCode';

    var service = {
      patients: [{
            firstName: "Peter",
            lastName: "Parker",
            email: "peterparker@gmail.com"
        }, {
            firstName: "Bruce",
            lastName: "Wayne",
            email: "brucewayne@gmail.com"
        }],
        getPatients: function() {
            var that = this;
            var client = $resource(url, {
                hpId: hpId
            });

            var promise = client.query().$promise;
            promise.then(function(patient) {
                that.patients = patient;
                (onSuccessFn || angular.noop)();
                onSuccessFn = null;
                onFailureFn = null;
            }, function(error) {
                (onFailureFn || angular.noop)(error);
                onSuccessFn = null;
                onFailureFn = null;
            });

            return this;
        },

        onSuccess: function(fn) {
            onSuccessFn = fn;
            return this;
        },

        onFailure: function(fn) {
            onFailureFn = fn;
            return this;
        },

        addPatient: function(patient) {
          debugger;
            var client = $resource(url, {
                hpId: hpId
            });
            var result = client.save(patient,
                function(response) {
                    if (response.personId) {
                        $rootScope.$broadcast('patientAdded');

                        service.patients.push(response);
                        $('#patientSuccessAlert').show();
                        setTimeout(function() {
                            $('#patientSuccessAlert').fadeOut('slow');
                        }, 3000);

                    } else {
                        $('#patientFailureAlert').show();
                    }
                    console.log(response);
                });

            return result.$promise;
        },

        addExistingPatient: function(PIN) {
          debugger;
          invitationCode = this.invitationCode;
          console.log('service code is ' + invitationCode);
          var client = $resource(addExistingPatientUrl, {
            hpId: hpId,
            invitationCode: invitationCode
          });
          var result = client.save({}, {}, function(response) {
            if (response.personId) {
              
              console.log('existing patient added');
            }
          })
        }
    }
    return service;
}
