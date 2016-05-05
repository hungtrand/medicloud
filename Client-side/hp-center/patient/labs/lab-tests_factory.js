module.exports = function($resource) {
    var url = 'http://' + window.location.hostname + '\\:8080/labs';
    var labTests = $resource(url);

    return labTests;
}
