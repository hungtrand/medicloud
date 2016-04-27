module.exports = function($resource) {
    var url = 'http://' + window.location.hostname + '\\:8080/observations';
    var obsSuggestions = $resource(url);

    return obsSuggestions;
}
