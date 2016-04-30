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
        $scope.waiting = false;
        $('#AddPatientForm')[0].reset();
    });

    $scope.addPatient = function(newPatientData) {
        $scope.waiting = true;
        service.addPatient(newPatientData)
            .then(function(response) {
                if (response.personId) {
                    $scope.modalShown = false;
                }
                $scope.waiting = false;
            }, function(failure) {
                $scope.error = failure.data.message || failure.data.error 
                                || failure.message || failure.error || failure;
                $scope.waiting = false;
            });
    }

    function getPatients() {
        $scope.waiting = true;
        service.getPatients().onSuccess(function(patient) {
                $scope.waiting = false;
                $scope.patientList = service.patients;
            })
            .onFailure(function(error) {
                $scope.waiting = false;
                console.log(error);
            });
    }
}
