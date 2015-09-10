(function() {
    'use strict';

    angular
        .module('app.examples.introduction')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        // setup translations path
        $translatePartialLoaderProvider.addPart('app/examples/introduction');

        // add routes
        $stateProvider
        .state('triangular.admin-default.introduction', {
            url: '/introduction',
            templateUrl: 'app/examples/introduction/introduction.tmpl.html',
            controller: 'IntroductionController',
            controllerAs: 'vm'
        });

        // add menu to triangular
        triMenuProvider.addMenu({
            name: 'MENU.INTRODUCTION.INTRODUCTION',
            state: 'triangular.admin-default.introduction',
            type: 'link',
            icon: 'icon-info-outline',
            priority: 0.1
        });
        triMenuProvider.addMenu({
            type: 'divider',
            priority: 0.2
        });
    }
})();