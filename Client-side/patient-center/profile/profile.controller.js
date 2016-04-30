module.exports = function($scope, model) {
    $scope.ready = false;
    
    $scope.profile = model.profile;
    $scope.profile.$promise.then(
        function(response) {
            $scope.ready = true;
            console.log($scope.profile);
        },
        function(failure) {
            $scope.error = failure.data.message || failure.data.error ||
                            failure.message || failure.error || failure;
        }
    ); 

    console.log("patient-center: profile.controller initiated")
}
