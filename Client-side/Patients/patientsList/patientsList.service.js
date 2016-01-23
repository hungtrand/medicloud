function patientsListService($rootScope) {
  var service = {
    patients: [
      {firstName: "Peter", lastName: "Parker", email: "peterparker@gmail.com"},
      {firstName: "Bruce", lastName: "Wayne", email: "brucewayne@gmail.com"}
    ],

    addPatient: function (patient) {
      service.patients.push(patient);
      $rootScope.$broadcast('patients.update');
    }
  }
  return service;
}
