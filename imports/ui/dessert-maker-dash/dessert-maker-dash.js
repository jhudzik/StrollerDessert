import { Meteor } from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './dessert-maker-dash.html';

import sdDeliveries from '../deliveries/deliveries';
import sdEncouragedSteps from '../encouraged-steps/encouraged-steps';

var sdDessertDash;

class DessertMakerDashController {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.autorun(() => {
            this.call('goals.deliveries', null, (err, res) => {
                this.stepCount = res.reduce((a,b) => {
                    return a + b.dessert.steps;
                }, 0);
                /*  + 1 since we mocked out some deliveries when the dessert
                    maker was created. We'll just assume those all went to
                    the same child who hasn't been counted yet. In real life
                    the profile of the dessert maker would be updated. */
                this.strollerCount = getUniqueStrollerCount(res) + 1;
            });
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
        .component('sdEncouragedSteps', sdEncouragedSteps)
        .config(routerCfg);

/**
 *  Determine how many unique strollers have been treated to desserts.
 *  @param {Array} goals - Array of goals from goals collection.
 */
function getUniqueStrollerCount(goals) {
    var sIds = [];
    goals.forEach((g) => {
        if(sIds.indexOf(g.sId) === -1) {
            sIds.push(g.sId);
        }
    });
    return sIds.length;
}

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
