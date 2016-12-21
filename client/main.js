import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import '../imports/ui/utils/utils';
import '../imports/ui/signup/signup';
import '../imports/ui/stroller-dash/stroller-dash';
import '../imports/ui/dessert-maker-dash/dessert-maker-dash';

import template from './intro.html';

angular
    .module('stroller-dessert', [
        angularMaterial,
        angularMeteor,
        uiRouter,
        'stroller-dessert.utils',
        'stroller-dessert.signup',
        'stroller-dessert.stroller-dash',
        'stroller-dessert.dessert-maker-dash'
    ])
    .config(cfg)
    .config(routerCfg);

function cfg($locationProvider) {
    'ngInject';
    $locationProvider.html5Mode({enabled: true});
}

// setup the root state
function routerCfg($stateProvider, $urlRouterProvider) {
    'ngInject';
    // root state
    $stateProvider
        .state('sd', {
            url: '/',
            template
        });
    // reroute unmatched urls to /
    $urlRouterProvider.otherwise('/');
}
