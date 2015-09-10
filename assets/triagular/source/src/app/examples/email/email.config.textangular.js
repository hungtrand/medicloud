(function() {
    'use strict';

    angular
        .module('app.examples.email')
        .config(moduleConfig);

    function moduleConfig($provide) {
        /***
        * Setup Editor Toolbar here
        ***/
        $provide.decorator('taOptions', ['taRegisterTool', 'taTranslations', '$delegate', function(taRegisterTool, taTranslations, taOptions){
            taOptions.toolbar = [['bold', 'italics', 'underline', 'insertLink']];

            taOptions.classes = {
                focussed: 'focussed',
                toolbar: 'editor-toolbar',
                toolbarGroup: 'editor-group',
                toolbarButton: 'md-button',
                toolbarButtonActive: '',
                disabled: '',
                textEditor: 'form-control',
                htmlEditor: 'form-control'
            };
            return taOptions;
        }]);

        $provide.decorator('taTools', ['$delegate', function(taTools){
            taTools.bold.iconclass = 'icon-format-bold';
            taTools.italics.iconclass = 'icon-format-italic';
            taTools.underline.iconclass = 'icon-format-underline';
            taTools.insertLink.iconclass = 'icon-insert-link';
            return taTools;
        }]);
    }
})();