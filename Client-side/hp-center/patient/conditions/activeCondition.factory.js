module.exports = function($resource, $rootScope) {
    var hpId = sessionStorage.getItem("medicloud_hp_id");
    var url = 'http://' + window.location.hostname + '\\:8080/api/hp/:hpId/patients/:patientId/conditions/:activeConditionId';
    var client = $resource(url, {
        hpId: hpId,
        patientId: '@patientId',
        activeConditionId: '@activeConditionId'
    }, {
        update: { method: 'PUT' }
    });

    return client;
}
