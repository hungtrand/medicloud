module.exports = function($scope, models) {
    $scope.waiting = false;
    $scope.success = false;

    $scope.signin = function() {
        $scope.waiting = true;
        $scope.error = "";
        models.signin($scope.form);
    }

    $scope.$on("medicloud.healthprofessional.signin", function(evt, response) {
        $scope.waiting = false;
        $scope.success = true;
        $scope.error = "";
        setTimeout(function() {
            window.location.href = "/hp-center";
        }, 2000);
    });

    $scope.$on("medicloud.patient.signin", function(evt, response) {
        $scope.waiting = false;
        $scope.success = true;
        $scope.error = "";
        setTimeout(function() {
            window.location.href = "/patient-center";
        }, 2000);
    });

    $scope.$on("medicloud.signin.error", function(evt, response) {
        $scope.waiting = false;

        if (response.data.error) {
            $scope.error = response.data.error;
        } else {
            $scope.error = response.data;
        }
    });
}
