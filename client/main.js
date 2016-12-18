import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import '../imports/ui/signup/signup';
import '../imports/ui/stroller-dash/stroller-dash';

angular
    .module('stroller-dessert', [
        angularMaterial,
        angularMeteor,
        uiRouter,
        'stroller-dessert.signup',
        'stroller-dessert.stroller-dash'
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
