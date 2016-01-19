function formAddPatient_dir() {
    console.log('e');
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
        templateUrl: 'formAddPatient/formAddPatient.html',
        controller: ['$scope', function($scope) {
            $scope.testing = 'qwerty';
            $scope.addPatient = function() {
                $.ajax({
                    method: 'POST',
                    data: $('#AddPatientForm').serialize()
                });
            };
        }],
    };
}