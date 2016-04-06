module.exports = function($scope, $rootScope, service) {
    $scope.patientList = [];
    getPatients();
    $scope.status;
    $scope.modalShown = false;
    $scope.patient = {};
    $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
    };
    $scope.contactClicked = false;
    $scope.selectedPatient;
    var validBirthdate = false;
    var validEmail = false;
    $('#patientSuccessAlert').hide();
    $('#patientFailureAlert').hide();

    $scope.clicked = function(patient) {
        $scope.contactClicked = true;
        $scope.selectedPatient = patient;
    }

    $rootScope.$on('patientAdded', function() {
        $scope.modalShown = false;
    });

    $scope.addPatient = function(newPatientData) {
        service.addPatient(newPatientData);
        $('#AddPatientForm')[0].reset();
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