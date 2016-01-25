function patientsListService($http, $rootScope) {
  var service = {
    patients: [
      {firstName: "Peter", lastName: "Parker", email: "peterparker@gmail.com"},
      {firstName: "Bruce", lastName: "Wayne", email: "brucewayne@gmail.com"}
    ],

    getPatients: function () {
      return $http.get('http://'+window.location.hostname+':8080/person/persons');
    },

    addPatient: function (patient) {
      service.patients.push(patient);
      $rootScope.$broadcast('patients.update');
    }
  }
  return service;
}
