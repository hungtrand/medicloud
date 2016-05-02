module.exports = function($scope, model) {
    $scope.encounters = model.encounterList;
    $scope.error = "";
    $scope.waiting = false;
    $scope.encounters = model.encounterList;
    $scope.encounters.$promise.then(
        function(response) {
             
        },
        function(failure) {
            $scope.error = failure.data.message || failure.data.error || failure.data
                            || failure.message || failure.error || failure;
        }
    );


}
