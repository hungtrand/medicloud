module.exports = function() {
    var controller = function($scope, models, $route, $routeParams) {
        $scope.patient = models.getPatient($routeParams['patient_id']);
        $scope.patient.fetchObservations();
    }

    return {
        templateUrl: "patient/conditions/observationPicker.template.html",
        scope: {
            control: "="
        },
        link: function($scope, $element, $attrs) {
            var modal =  $($element[0]).find('.modal');
            
            $scope.control.show = function() {
                modal.modal('show');
                return $scope.control;
            }

            $scope.control.hide = function() {
                modal.modal('hide');
                return $scope.control;
            }

            $scope.onSelect = angular.noop;

            $scope.selectObservation = function(obs) {
                $scope.control.onSelect(obs);
                $scope.control.onSelect = angular.noop; // reset after selecting
                $scope.control.hide();
                return $scope.control;
            }

        },
        controller: ['$scope', 'models_service', '$route', '$routeParams', controller]

    }
}
