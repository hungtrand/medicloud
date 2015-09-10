(function() {
    'use strict';

    angular
        .module('app.examples.menulevels')
        .controller('LevelController', LevelController);

    /* @ngInject */
    function LevelController($stateParams) {
        var vm = this;
        vm.level = $stateParams.level;
    }
})();
