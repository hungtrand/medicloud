module.exports = function ($scope, $routeParams, $route, $rootScope, service) {
    $scope.state = "";
    $scope.loading = true;
    $scope.verified = false;

    var verificationInfo= {
        email: $routeParams["email"],
        token: $routeParams["token"]
    }
    
    var verification = service.verify(verificationInfo);
    verification.$promise.then(function(response) {
            if (response.success) {
                $scope.loading = false;
                $scope.verified = true;
            } else {
                $scope.error = response.message || response.error || response;
                $scope.loading = false;
            }
        }, 
        function(failure) {
            $scope.loading = false;
            $scope.error = failure.data.message || failure.data.error || 
                            failure.error || failure.message || failure;
        })

    $scope.registerPatient = function(newPatientData) {
        newPatientData.email = $routeParams.email;
        if (newPatientData.password === newPatientData.confPassword) {
            $scope.loading = true;
            var signup = service.signup(verificationInfo, newPatientData);

            signup.$promise.then(function(response) {
                    if (response.success) {
                        $scope.state = 'success';
                        setTimeout(function() {
                            window.location.href = "/sign-in";
                        }, 2000);
                    }
                },
                function(failure) {
                    $scope.error = failure.data.error || failure.data.message 
                                    || failure.message || failure.error || failure;
                    $scope.loading = false;
                });

        }
        else {
            $scope.state = 'mismatchedPasswords';
        }
    }
}
