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
      birthdateCheck(newPatientData.birthdate);
      emailCheck(newPatientData.email);
      if (validBirthdate && validEmail) {
        service.addPatient(newPatientData);
      }
      else {
        console.log("email" + validEmail);
        console.log("birthdate" + validBirthdate);
      }
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

    function birthdateCheck(birthdate) {
      var birthdateRE = /^\d{4}\/\d{1,2}\/\d{1,2}$/;
      if (!birthdate.match(birthdateRE)) {
        validBirthdate = false;
        console.log("Invalid birthday.");
      }
      else {
        validBirthdate = true;
        console.log("Valid birthdate.");
      }
    }

    function emailCheck(patientEmail) {
      if (patientEmail.indexOf('@') >= 0 && patientEmail.indexOf('.') >= 0) {
        validEmail = true;
      }
      else {
        validEmail = false;
      }
    }


}
