function patientsListService($http, $rootScope, $resource) {
  var onSuccessFn;
  var onFailureFn;
  var service = {

    patients: [
      {firstName: "Peter", lastName: "Parker", email: "peterparker@gmail.com"},
      {firstName: "Bruce", lastName: "Wayne", email: "brucewayne@gmail.com"}
    ],

    getPatients: function () {
      var that = this;
      var client = $resource('http://'+window.location.hostname+':8080/person/persons');
      var promise = client.query().$promise;
      promise.then(function(patient) {
        that.patients = patient;
        (onSuccessFn || angular.noop)();
        onSuccessFn = null;
        onFailureFn = null;
      },function(error) {
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

    addPatient: function (patient) {
      service.patients.push(patient);
      $rootScope.$broadcast('patients.update');
      var client = $resource('http://'+window.location.hostname+':8080/person/addPerson');
      client.save(patient, 
        function(response) {
          debugger;
          if (response.personId) {
            $('#patientSuccessAlert').fadeIn(100);
          }
          else {
            $('#patientFailureAlert').show();
          }
          console.log(response);
      });
    }
  }
  return service;
}
