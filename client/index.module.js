import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import '../imports/ui/components/signup/signup';

angular
    .module('stroller-dessert', [
        angularMaterial,
        angularMeteor,
        uiRouter,
        'stroller-dessert.signup'
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
