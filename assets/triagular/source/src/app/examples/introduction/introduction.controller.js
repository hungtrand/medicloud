(function() {
    'use strict';

    angular
        .module('app.examples.introduction')
        .controller('IntroductionController', IntroductionController);

    /* @ngInject */
    function IntroductionController(triSettings) {
        var vm = this;
        vm.version = triSettings.version;
        vm.featureRows = [
            [{
                name: 'Fully Responsive',
                icon: 'icon-computer',
                palette: 'cyan',
                hue: '200'
            },{
                name: 'Beautiful Themes',
                icon: 'icon-palette',
                palette: 'cyan',
                hue: '300'
            },{
                name: 'API Ready',
                icon: 'icon-share',
                palette: 'cyan',
                hue: '400'
            },{
                name: '5 Star Support',
                icon: 'icon-star',
                palette: 'cyan',
                hue: '500'
            }],
            [{
                name: 'Built with AngularJS',
                icon: 'fa fa-google',
                palette: 'cyan',
                hue: '600'
            },{
                name: 'Angular Material',
                icon: 'fa fa-th-large',
                palette: 'cyan',
                hue: '700'
            },{
                name: 'Gulp Build',
                icon: 'fa fa-terminal',
                palette: 'cyan',
                hue: '800'
            },{
                name: 'SASS Stylesheets',
                icon: 'fa fa-css3',
                palette: 'cyan',
                hue: '900'
            }]
        ];
    }
})();