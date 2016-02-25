function patientsList_ctrl($scope, $rootScope, service) {
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
      birthdateCheck(newPatientData.birthdate);
      emailCheck(newPatientData.email);
      if (validBirthdate && validEmail) {
        console.log("Valid birthdate and email.");
        //service.addPatient(newPatientData);
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
      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var day = today.getDate();
      console.log("Year: " + year + " Month: " + month + " Day: " + day);
      if (!birthdate.match(birthdateRE)) {
        validBirthdate = false;
        console.log("Invalid birthday.");
      }
      else {
        var dateSplit = birthdate.split('/');
        console.log(dateSplit);
        var yearInt = parseInt(dateSplit[0]);
        if (yearInt > year) {
          console.log("Year is incorrect" + yearInt);
          validBirthdate = false;
        }
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
