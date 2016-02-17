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
    $scope.clicked = function(patientIndex) {
      $scope.contactClicked = true;
      $scope.patientIndex = patientIndex;
      $scope.selectedPatient = this.patientList[$scope.patientIndex];
    }

    $rootScope.$on('patientAdded', function() {
      $scope.modalShown = false;
    });

    $scope.addPatient = function(newPatientData) {
      service.addPatient(newPatientData);
    }

    function getPatients() {
      service.getPatients().onSuccess(function(patient) {
        $scope.patientList = service.patients;
      })
      .onFailure(function(error) {
        console.log(error);
      });
    }


}
