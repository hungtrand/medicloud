(function() {
    'use strict';

    angular
        .module('app.examples.menulevels')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/examples/menulevels');

        $stateProvider
        .state('triangular.admin-default.menu-levels', {
            url: '/menu-levels/:level',
            controller: 'LevelController',
            controllerAs: 'vm',
            templateUrl: 'app/examples/menulevels/level.tmpl.html'
        });

        triMenuProvider.addMenu({
            name: 'MENU.LEVELS.LEVELS',
            icon: 'icon-receipt',
            type: 'dropdown',
            priority: 6.1,
            children: [{
                name: 'MENU.LEVELS.1-1',
                type: 'dropdown',
                children: [{
                    name: 'MENU.LEVELS.2-1',
                    type: 'dropdown',
                    children: [{
                        name: 'MENU.LEVELS.3-1',
                        type: 'dropdown',
                        children: [{
                            name: 'MENU.LEVELS.4-1',
                            type: 'link',
                            state: 'triangular.admin-default.menu-levels',
                            params: {
                                level: 'Item1-1-1-1'
                            }
                        },{
                            name: 'MENU.LEVELS.4-2',
                            type: 'link',
                            state: 'triangular.admin-default.menu-levels',
                            params: {
                                level: 'Item1-1-1-2'
                            }
                        },{
                            name: 'MENU.LEVELS.4-3',
                            type: 'link',
                            state: 'triangular.admin-default.menu-levels',
                            params: {
                                level: 'Item1-1-1-3'
                            }
                        }]
                    }]
                }]
            }]
        });
    }
})();