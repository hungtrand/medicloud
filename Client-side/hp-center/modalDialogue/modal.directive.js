module.exports = function() {
    return {
        restrict: 'E',
        scope: {
            show: '=',
            submit: '='
        },
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        link: function(scope, element, attrs) {
            $(document).on('dblclick', function() {
              console.log("scope.show is " + scope.show);
            })
            scope.$watch('show', function(newValue) {
                if (newValue) {
                    $(element[0]).modal('show');
                } else {
                    $(element[0]).on('hidden.bs.modal', function() {
                      scope.show = false;
                      scope.$apply();
                    });
                }
            });

        },
        templateUrl: 'modalDialogue/modal.html',
        controller: ['$scope', '$rootScope', 'patientsListService', 'calendarService', function($scope, $rootScope, patientsListService, calendarService) {
          var appointment = {
            appointmentTime: '9:00',
            appointmentDate: '2000-01-01',
            reason: 'N/A'
          };
          var selectedPatientId;
          $scope.selectedPatient = 'Select a patient';
          $scope.selectedTime = 'Select a time';
          $scope.appointmentList = calendarService.appointments;
          $scope.timesList = calendarService.times;
          $('[data-toggle="tooltip"]').tooltip('disable');
          $rootScope.$on('dateSelected', function(event, args) {
            console.log("Broadcast received. Date is " + args.date);
            $scope.patientList = patientsListService.getPatients();
            calendarService.getTimes();
            calendarService.getAppointments().then(function() {
              console.log('appointmentList is ' + $scope.appointmentList);
            });

            appointment.appointmentDate = args.date;
          });

          $scope.selectPatient = function(patient) {
            $scope.selectedPatient = patient;
            selectedPatientId = $scope.selectedPatient.patientId;
          }

          $scope.selectTime = function(time) {
            $scope.selectedTime = time;
            appointment.appointmentTime = $scope.selectedTime;
          }

          $scope.submitAppointment = function() {
            appointment.reason = $scope.reason;
            calendarService.addAppointment(appointment, selectedPatientId);
            console.log('Appointment is ' + appointment);
          }

          function getAppointments() {

          }

          $scope.$on('appointmentAdded', function() {
            $('.modal.in').modal('hide')
            $('#AddAppointmentForm')[0].reset();
            $scope.selectedTime = 'Select a time';
          }
        );
        }],
    };
}
