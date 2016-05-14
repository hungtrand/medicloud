module.exports = function($scope, model) {
    $scope.error = "";
    $scope.loading = true;
    $scope.ready = false;
    $scope.labs = model.labResultList;
    $scope.labs.$promise.then(
        function(response) {
             setTimeout(function() {
                $scope.loading = false;
                $scope.ready = true;
                $scope.$apply();
             }, 300);
        },
        function(failure) {
            $scope.loading = false;
            $scope.error = failure.data.message || failure.data.error || failure.data
                            || failure.message || failure.error || failure;
        }
    );


}
