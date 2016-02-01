function formAddPatient_dir() {
    return {
        restrict: 'E',
        scope: {
            show: '='
        },
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        link: function(scope, element, attrs) {

            scope.$watch('show', function(newValue) {
                if (newValue) {
                    $(element[0]).modal('show');
                } else {
                    $(element[0]).modal('hide');
                }
            })

        },
        templateUrl: 'patients/formAddPatient/formAddPatient.html',
        controller: ['$scope', '$rootScope', 'patientsListService', function($scope, $rootScope, service) {
            $scope.testing = 'qwerty';
            $scope.addPatient = function() {
              service.patients.push($scope.patient);
              $rootScope.$broadcast('patientAdded');
                $.ajax({
                    method: 'POST',
                    data: $('#AddPatientForm').serialize(),
                    url: 'http://blahblahblah'
                });
            };
        }],
    };
}
