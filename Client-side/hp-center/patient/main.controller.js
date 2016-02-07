function main_ctrl($scope) {
	/* include files */
	$scope.incConditionList = "patient/conditions/conditionList.html";
	$scope.incObservationList = "patient/observations/observationList.html";

	$scope.modalMessage = {
		show: false,
		title: 'patient/message/formMessage.title.html',
		body: 'patient/message/formMessage.html',
		footer: 'patient/message/formMessage.footer.html',
		actions: {
			send: function() {
				console.log('Sent');
			}
		}
	}
}