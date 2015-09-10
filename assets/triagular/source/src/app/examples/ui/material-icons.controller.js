(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .controller('MaterialIconsController', MaterialIconsController);

    /* @ngInject */
    function MaterialIconsController($mdDialog, $document, icons) {
        var vm = this;
        vm.groups = [];
        vm.icons = [];
        vm.iconSource = 'Select icon below to see HTML';
        vm.selectIcon = selectIcon;

        function selectIcon($event, icon) {
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element($document.body))
                .title('Here\'s the code for that icon')
                .content('<md-icon md-font-icon="' + icon.className + '"></md-icon>')
                .ok('Thanks')
                .targetEvent($event)
            );
        }

        // init

        // create filterable data structure for icons
        angular.forEach(icons.data, function(iconGroup, groupName) {
            angular.forEach(iconGroup, function(icon, iconName) {
                vm.icons.push({
                    name: iconName,
                    group: groupName,
                    className: icon
                });
            });
            vm.groups.push(groupName);
        });

    }
})();