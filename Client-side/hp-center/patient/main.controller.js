function main_ctrl($scope, patient_serv) {
	/* include files */
	$scope.incConditionList = "patient/conditions/conditions.html";
	$scope.incObservationList = "patient/observations/observations.html";

	/***** fetch inital data from services ******/
	patient_serv.fetch();

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