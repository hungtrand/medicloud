module.exports = function($resource, $rootScope) {
    var hpId = sessionStorage.getItem("medicloud_hp_id");
    var url = 'http://' + window.location.hostname 
        + '\\:8080/api/hp/:hpId/patients/:patientId/lab-results/:labResultId';
    var labResult = $resource(
            url
            , 
            {
                hpId: '@hpId',
                patientId: '@patientId',
                labResultId: '@labResultId'
            },
            {
                update: { method: "PUT" }
            }
        );
    labResult.prototype.name = "";
    labResult.prototype.status = "";
    labResult.prototype.result = "";
    labResult.prototype.hpId = null;
    labResult.prototype.patientId = null;
    labResult.prototype.lastUpdated = null;
    labResult.prototype.infermedicaLabId = null;
    labResult.prototype.edit = function() { this.mode = "edit" }
    return labResult;
}
