module.exports = function($http, $rootScope, $resource) {
    var onSuccessFn;
    var onFailureFn;
    var hpId = sessionStorage.getItem("medicloud_hp_id");
    var patientId;
    var selectedDate;
    var url = 'http://' + window.location.hostname + ':8080/api/hp/:hpId/patients/:patientId';
    var availabilityUrl = 'http://' + window.location.hostname + ':8080/api/hp/:hpId/patients/availability?userDate=:selectedDate';
    var setAppointmentUrl = 'http://' + window.location.hostname + ':8080/api/hp/:hpId/patients/:patientId/appointment';
    var service = {
      times: [{
            appointmentTime: "9:00"
        }, {
            appointmentTime: "10:00"
        }],

        getTimes: function() {
          selectedDate = this.selectedDate;
          var that = this;
          var client = $resource(availabilityUrl, {
              hpId: hpId,
              selectedDate: selectedDate
          });
          console.log("service.getTimes() selectedDate is " + selectedDate);
          var promise = client.query().$promise;
          promise.then(function(times) {
              angular.extend(that.times, times);
              (onSuccessFn || angular.noop)();
              onSuccessFn = null;
              onFailureFn = null;
          }, function(error) {
              (onFailureFn || angular.noop)(error);
              onSuccessFn = null;
              onFailureFn = null;
          });
          return this.times;
        },
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

        addAppointment: function(appointment, selectedPatientId) {
            patientId = selectedPatientId;
            console.log('In calendar service. patientId is ' + selectedPatientId);
            var client = $resource(url, {
                hpId: hpId,
                patientId: selectedPatientId
            });
            client.save(appointment,
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
