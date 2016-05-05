module.exports = function($scope, $filter, model) {
    $scope.ready = false;
    $scope.error = "";
    $scope.mode = "view";
    $scope.profile = model.profile;
    $scope.formData = {};
    $scope.error = "";
    $scope.loading = true;
    angular.copy($scope.profile, $scope.formData);

    $scope.toggleMode = function(strMode) {
        $scope.mode = strMode;
    }

    $scope.saveProfile = function() {
        $scope.error = "";
        $scope.loading = true;

        var submitData = angular.copy($scope.formData);
        submitData.birthdate = $filter('date')($scope.formData.birthdate, "yyyy-MM-dd");

        model.saveProfile(submitData)
            .then(function(response) {
                $scope.loading = false;
            }, function(failure) {
                $scope.loading = false;
                $scope.error = failure.data.message || failure.data.error || failure.data
                || failure.message || failure.error || failure;
            });
    }



    $scope.profile.$promise.then(
            function(response) {
                if ($scope.profile.personId) {
                    setTimeout(function() { 
                        $scope.ready = true;
                        $scope.loading = false;
                        $scope.$apply(); 
                    }, 300);
                }
            },
            function(failure) {
                $scope.loading = false;
                $scope.error = failure.data.message || failure.data.error ||
                        failure.message || failure.error || failure;
            }
            ); 

    console.log("patient-center: profile.controller initiated")
}
