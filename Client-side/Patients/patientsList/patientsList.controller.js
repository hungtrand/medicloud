function patientsList_ctrl($scope, service) {
    $scope.test = "testing12";
    $scope.patientList = service.patients;
    $scope.modalShown = false;
    $scope.patient = {};
    $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
    };
}
