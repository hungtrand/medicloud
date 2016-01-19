function patientsList_ctrl($scope) {
    $scope.test = "testing12";
    $scope.patientList = [{
        lastName: 'Tran',
        firstName: 'Hung'
    }, {
        lastName: 'Tsui',
        firstName: 'Helen'
    }]
    $scope.modalShown = false;
    $scope.patient = {};
    $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
    };
}