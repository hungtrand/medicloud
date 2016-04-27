module.exports = function() {
    return {
        templateUrl: 'patient/conditions/activeCondition.template.html'
            , scope: {
                activeCondition: "=",
                observationPicker: "="
            }
        , link: function($scope, $element, $attrs) {

        }
        , controller: ['$scope', 'activeCondition_factory', function($scope, activeCondition_factory) {
            $scope.pickStartObservation = function() {
                $scope.observationPicker.show();
                $scope.observationPicker.onSelect = function(obs) {
                    $scope.activeCondition.startObservation = obs;
                    $scope.activeCondition.startObsId = obs.obsId;
                    activeCondition_factory.update(
                            { 
                                patientId: $scope.activeCondition.patientId,
                        activeConditionId: $scope.activeCondition.activeConditionId
                            },
                            $scope.activeCondition);
                }
            }
            $scope.pickEndObservation = function() {
                $scope.observationPicker.show();
                $scope.observationPicker.onSelect = function(obs) {
                    $scope.activeCondition.endObservation = obs;
                    $scope.activeCondition.endObsId = obs.obsId;
                    activeCondition_factory.update(
                            { 
                                patientId: $scope.activeCondition.patientId,
                        activeConditionId: $scope.activeCondition.activeConditionId
                            },
                            $scope.activeCondition);
                }
            }
        }]
    }
}
