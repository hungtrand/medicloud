module.exports = function($scope, models) {
    $scope.signin = function() {
		models.signin($scope.form);
    }

    $scope.$on("medicloud.healthprofessional.signin", function(evt, response) {	
    	setTimeout(function() {
    		window.location.href = "/hp-center";
    	}, 2000);
    });
}