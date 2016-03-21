module.exports = function($http, $rootScope, $resource) {
  var onSuccessFn;
  var onFailureFn;
    var url = 'http://'+window.location.hostname+':8080/hp/:hpId/patients/:patientId';
  var service = {

    patients: [
      {firstName: "Peter", lastName: "Parker", email: "peterparker@gmail.com"},
      {firstName: "Bruce", lastName: "Wayne", email: "brucewayne@gmail.com"}
    ],

    getPatients: function () {
      var that = this;
      var client = $resource(url, {
	  hpId: 1
      });

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
      
      $rootScope.$broadcast('patientAdded');
      var client = $resource(url, { hpId: 1 } );
      client.save(patient, 
        function(response) {
          if (response.personId) {
            service.patients.push(patient);
            $('#patientSuccessAlert').show();
            setTimeout(function() {
              $('#patientSuccessAlert').fadeOut('slow');
            }, 3000);
            
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
