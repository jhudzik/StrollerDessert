import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import '../imports/ui/signup/signup';
import '../imports/ui/stroller-dash/stroller-dash';
import '../imports/ui/dessert-maker-dash/dessert-maker-dash';

angular
    .module('stroller-dessert', [
        angularMaterial,
        angularMeteor,
        uiRouter,
        'stroller-dessert.signup',
        'stroller-dessert.stroller-dash',
        'stroller-dessert.dessert-maker-dash'
    ])
    .config(routerCfg);

function routerCfg($stateProvider, $urlRouterProvider) {
    'ngInject';
    // root state
    $stateProvider
        .state('sd', {url: '/'});
    // reroute unmatched urls to /
    $urlRouterProvider.otherwise('/');
}