function patientsList_ctrl($scope, service) {
    $scope.test = "testing12";
    $scope.patientList = service.patients;
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
}
