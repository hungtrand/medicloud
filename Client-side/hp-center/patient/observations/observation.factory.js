module.exports = function($resource) {
	var hpId = sessionStorage.getItem("medicloud_hp_id");
	var url = 'http://' + window.location.hostname + '\\:8080/api/hp/:hpId/patients/:patientId/observations';
	var observation = $resource(
		url
		, 
		{
			hpId: hpId,
			patientId: '@patientId'
		}
		,
		{
			save: { method: 'POST' }
		}
	);

	return observation;
}