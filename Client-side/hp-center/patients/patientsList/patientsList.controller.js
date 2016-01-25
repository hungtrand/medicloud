function patientsList_ctrl($scope, service) {
    $scope.patientList;
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

    function getPatients() {
      service.getPatients().success(function(patient) {
        $scope.patientList = patient;
      })
      .error(function(error) {
        $scope.status = 'Error';
      })
    }


}
