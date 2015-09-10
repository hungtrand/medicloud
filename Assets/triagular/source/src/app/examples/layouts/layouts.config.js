(function() {
    'use strict';

    angular
        .module('app.examples.layouts')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/examples/layouts');

        $stateProvider
        .state('triangular.admin-default.layouts-composer', {
            url: '/layouts/composer',
            templateUrl: 'app/examples/layouts/composer.tmpl.html',
            controller: 'LayoutsComposerController',
            controllerAs: 'vm'
        });

        triMenuProvider.addMenu({
            name: 'MENU.LAYOUTS.TITLE',
            icon: 'icon-view-module',
            type: 'dropdown',
            priority: 2.4,
            children: [{
                name: 'MENU.LAYOUTS.COMPOSER',
                type: 'link',
                state: 'triangular.admin-default.layouts-composer'
            }]
        });
    }
})();