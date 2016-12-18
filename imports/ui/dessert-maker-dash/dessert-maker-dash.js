import { Meteor } from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './dessert-maker-dash.html';

var sdDessertDash;

class DessertMakerDashController {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.helpers({
            dessertMaker() {
                return Meteor.user();
            }
        });
    }
}

sdDessertMakerDash = {
    controller: DessertMakerDashController,
    template
};

export default
    angular
        .module('stroller-dessert.dessert-maker-dash', [
            angularMeteor,
            uiRouter
        ])
        .component('sdDessertMakerDash', sdDessertMakerDash)
        .config(routerCfg);

function routerCfg($stateProvider) {
    'ngInject';
    $stateProvider
        .state('sd.dessert-maker', {
            url: 'dessertmaker/:id',
            views: {
                '@': {
                    template: '<sd-dessert-maker-dash></sd-dessert-maker-dash>'
                }
            }
        })
}
