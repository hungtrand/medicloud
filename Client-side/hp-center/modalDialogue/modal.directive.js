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
                    $(element[0]).modal('hide');
                }
            });
            /*element.find('#AddAppointment').on('click', function() {
              element.submit();
            });*/
            element.on('submit', function(){
                var elements = element[0].querySelectorAll('input,select,textarea');
                for (var i = elements.length; i--;) {
                    elements[i].addEventListener('invalid', function() {
                        this.scrollIntoView(false);
                    });
                }
               var data = scope.patient;
               data = angular.extend({}, scope.patient);
               scope.submit(data);
            });

        },
        templateUrl: 'modalDialogue/modal.html',
        controller: ['$scope', '$rootScope', 'patientsListService', 'calendarService', function($scope, $rootScope, patientsListService, calendarService) {
          $('[data-toggle="tooltip"]').tooltip('disable');
          $rootScope.$on('dateSelected', function() {
            console.log("Broadcast received.");
            $scope.patientList = patientsListService.getPatients();
            $scope.timesList = calendarService.getTimes();
          })
        }],
    };
}
