function formAddPatient_dir() {
    return {
        restrict: 'E',
        scope: {
            show: '=',
            submit: '='
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
            });
            element.find('#AddPatient').on('click', function() {
              element.submit();
            });
            element.on('submit', function(){
              scope.submit(scope.patient);
            });

        },
        templateUrl: 'patients/formAddPatient/formAddPatient.html',
        controller: ['$scope', function($scope) {
          $scope.patient = {
            firstName: "", lastName: ""
          };
        }],
    };
}
