module.exports = function($scope, model) {
    $scope.error = "";
    $scope.loading = false;
    $scope.hpList = model.hpList;

    $scope.hpList.$promise.then(
        function(response) {
             
        },
        function(failure) {
            $scope.error = failure.data.message || failure.data.error || failure.data
                            || failure.message || failure.error || failure;
        }
    );

    $scope.getBackgroundColor = function(index) {
        if (index % 2) {
            return "bg-aqua-active";
        } else if (index % 3) {
            return "bg-navy-active";
        } else if (index % 4) {
            return "bg-orange-active";
        } else if (index % 5) {
            return "bg-olive-active";
        } else if (index % 6) {
            return "bg-maroon-active";
        } else {
            return "bg-teal-active";
        }
    }

    console.log("health-professionals: directory.controller init.");
}
