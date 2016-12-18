import { Meteor } from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './dessert-maker-dash.html';

import sdDeliveries from '../deliveries/deliveries';

var sdDessertDash;

class DessertMakerDashController {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.autorun(() => {
            this.call('goals.deliveryCount', null, (err, res) => {
                /*  Since we generated some mock data during signup,
                    we update the count accordingly. This is a Demo Only
                    procedure. In real life, we'd update the dessert maker
                    profile accordingly.  */
                this.deliveryCount = res + this.dessertMaker.profile.deliveries;
            })
        });

        this.subscribe('goals');
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
        .component('sdDeliveries', sdDeliveries)
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
