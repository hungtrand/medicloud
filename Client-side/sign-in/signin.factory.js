module.exports = function($resource) {
    var factory = function(form) {
        var url = 'http://'+window.location.hostname+'\\:8080/signin';
        this.client = $resource(url);

    }

    factory.prototype = {
        constructor: factory
            ,
        post: function(formInputs) {
            var self = this;

            var promise = self.client.save(formInputs).$promise;

            promise
                .then(
                        function(response) { 
                            angular.extend(self, response.data);
                        }
                     );


            return promise;
        }
    }

    return factory;
}
