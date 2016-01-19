function patientsListService($rootScope) {
  var service = {
    patients: [
      {firstName: "Peter", lastName: "Parker"},
      {firstName: "Bruce", lastName: "Wayne"}
    ],

    addPatient: function (patient) {
      service.patients.push(patient);
      $rootScope.$broadcast('patients.update');
    }
  }
  return service;
}
