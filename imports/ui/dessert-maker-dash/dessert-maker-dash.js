import { Meteor } from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './dessert-maker-dash.html';

import sdDeliveries from '../deliveries/deliveries';
import sdEncouragedSteps from '../encouraged-steps/encouraged-steps';

var sdDessertDash;

class DessertMakerDashController {
    constructor($scope, $reactive, sdLayoutService) {
        'ngInject';
        $reactive(this).attach($scope);

        this.sdLayoutService = sdLayoutService;
        this.autorun(() => {
            this.call('goals.deliveries', null, (err, res) => {
                /*  Count steps, but make sure we don't over count since
                    a user can have multiple goals open with a single DM.
                    We take the highest step count per user. */
                var stepCount = 0,
                    stepsToCount = {};
                res.forEach((r) => {
                    var steps = r.dessert.steps;
                    if(!stepsToCount[r.sId]) {
                        stepsToCount[r.sId] = steps;
                    } else if(stepsToCount[r.sId] < steps) {
                        stepsToCount[r.sId] = steps;
                    }
                });
                angular.forEach(stepsToCount, (steps) => {
                    stepCount += steps;
                });
                this.stepCount = stepCount;
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
            },
            uiCfg() {
                return sdLayoutService.getUiCfg()
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
