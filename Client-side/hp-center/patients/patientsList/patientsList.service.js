function patientsListService($http, $rootScope) {
  var onSuccessFn;
  var onFailureFn;
  var service = {

    patients: [
      {firstName: "Peter", lastName: "Parker", email: "peterparker@gmail.com"},
      {firstName: "Bruce", lastName: "Wayne", email: "brucewayne@gmail.com"}
    ],

    getPatients: function () {
      var that = this;
      var promise = $http.get('http://'+window.location.hostname+':8080/person/persons');
      promise.success(function(patient) {
        that.patients = patient;
        (onSuccessFn || angular.noop)();
        onSuccessFn = null;
        onFailureFn = null;
      })
      .error(function(error) {
        (onFailureFn || angular.noop)(error);
        onSuccessFn = null;
        onFailureFn = null;
      })
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
    }
  }
  return service;
}
