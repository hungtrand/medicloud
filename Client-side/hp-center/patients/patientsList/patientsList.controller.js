function patientsList_ctrl($scope, $rootScope, service) {
    $scope.patientList = [];
    getPatients();
    $scope.status;
    $scope.test = "testing12";
    $scope.modalShown = false;
    $scope.patient = {};
    $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
    };
    $scope.contactClicked = false;
    $scope.selectedPatient;
    $scope.clicked = function(patient) {
      $scope.contactClicked = true;
      $scope.selectedPatient = patient;
    }

    $rootScope.$on('patientAdded', function() {
      $scope.modalShown = false;
    });

    $scope.addPatient = function(newPatientData) {
      service.addPatient(newPatientData);
      $scope.modalShown = false;
      $('#AddPatientForm')[0].reset();
    }

    function getPatients() {
      service.getPatients().onSuccess(function(patient) {
        $scope.patientList = service.patients;
        console.log($scope.patientList);
      })
      .onFailure(function(error) {
        console.log(error);
      });
    }


}
