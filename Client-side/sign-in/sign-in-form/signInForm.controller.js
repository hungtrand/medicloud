module.exports = function($scope, models) {
    $scope.signin = function() {
		models.signin($scope.form);
    }

    $scope.$on("medicloud.healthprofessional.signin", function(evt, response) {	
    	setTimeout(function() {
    		window.location.href = "/hp-center";
    	}, 2000);
    });

    $scope.$on("medicloud.patient.signin", function(evt, response) {	
    	setTimeout(function() {
    		window.location.href = "/patient-center";
    	}, 2000);
    });

    $scope.$on("medicloud.signin.error", function(evt, response) {	
    	$scope.error = response.data;
    });
}