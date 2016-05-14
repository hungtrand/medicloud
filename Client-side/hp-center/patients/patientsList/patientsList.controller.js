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
    var newPatient = true;
    var existingPatientCode = {
      invitationCode: 123456
    };
    $('#patientSuccessAlert').hide();
    $('#patientFailureAlert').hide();

    $scope.clicked = function(patient) {
        $scope.contactClicked = false;

        setTimeout(function() {
            $scope.contactClicked = true;
            $scope.selectedPatient = patient;
            $scope.$apply();
        }, 200);
        
    }

    $rootScope.$on('patientAdded', function() {
        $scope.modalShown = false;
        $scope.waiting = false;
        $('#AddPatientForm')[0].reset();
    });
    $rootScope.$on('existingPatient', function() {
      newPatient = false;
      console.log("newPatient" + newPatient);
    });

    $rootScope.$on('newPatient', function() {
      newPatient = true;
      console.log("newPatient" + newPatient);

    });

    $scope.addPatient = function(newPatientData) {
        $scope.waiting = true;
        if (!newPatient) {
          service.invitationCode = newPatientData;
          existingPatientCode.invitationCode = newPatientData;
          console.log('in contoller: code is' + newPatientData);
          service.addExistingPatient(existingPatientCode);
        }
        else {
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
