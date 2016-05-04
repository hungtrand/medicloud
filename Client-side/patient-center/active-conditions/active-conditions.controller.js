module.exports = function($scope, model) {
    $scope.error = "";
    $scope.loading = true;
    $scope.ready = false;

    $scope.activeConditions = model.activeConditionList;
    $scope.activeConditions.$promise.then(
        function(response) {
            setTimeout(function() {
                $scope.ready = true;
                $scope.loading = false;
                $scope.$apply();
            }, 300);             
        },
        function(failure) {
            $scope.error = failure.data.message || failure.data.error || failure.data
                            || failure.message || failure.error || failure;
        }
    );


}
