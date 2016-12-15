import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import '../imports/ui/components/signup/signup';
import '../imports/ui/components/stroller/stroller';

angular
    .module('stroller-dessert', [
        angularMaterial,
        angularMeteor,
        uiRouter,
        'stroller-dessert.signup',
        'stroller-dessert.stroller'
    ])
    .config(($locationProvider, $stateProvider, $urlRouterProvider) => {
        'ngInject';
        $locationProvider.html5Mode({enabled: true});
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('sd', {
                url: '/'
            });
    });
