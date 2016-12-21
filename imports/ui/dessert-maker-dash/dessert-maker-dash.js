import { Meteor } from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './dessert-maker-dash.html';

import sdDeliveries from '../deliveries/deliveries';
import sdEncouragedSteps from '../encouraged-steps/encouraged-steps';
import sdWhoWhere from '../who-where/who-where';

var sdDessertDash;

class DessertMakerDashController {
    constructor($scope, $reactive, $filter, sdLayoutService) {
        'ngInject';
        $reactive(this).attach($scope);

        this.sdLayoutService = sdLayoutService;
        this.autorun(() => {
            this.call('goals.deliveries', null, (err, res) => {
                /*  Count steps, but make sure we don't over count since
                    a user can have multiple goals open with a single DM.
                    We take the highest step count per user. */
                this.stepCount = _getUniqueStepCount(res);
                /*  + 1 since we mocked out some deliveries when the dessert
                    maker was created. We'll just assume those all went to
                    the same child who hasn't been counted yet. In real life
                    the profile of the dessert maker would be updated. */
                this.strollerCount = _getUniqueStrollerCount(res) + 1;
                this.deliveries = res;
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
        .component('sdWhoWhere', sdWhoWhere)
        .config(routerCfg);

/**
 *  Determine how many unique steps have been taken since Strollers can have
 *  multiple goals in progress for a Dessert Maker. For instance, if a user
 *  has completed goal one with 35 steps for Dessert Maker X, and later
 *  completes goal two with 50 steps for Dessert Maker X, we make sure the
 *  encouraged # of steps is 50, not 35+50.
 *  @param {Array} goals - Array of objects from goals collection.
 *  @return {Number} stepCount - The unique step count.
 */
function _getUniqueStepCount(goals) {
    var stepCount = 5, // starting @ 5 for Demo Only!
        stepsToCount = {};
    goals.forEach((g) => {
        var steps = g.dessert.steps;
        if(!stepsToCount[g.sId]) {
            stepsToCount[g.sId] = steps;
        } else if(stepsToCount[g.sId] < steps) {
            stepsToCount[g.sId] = steps;
        }
    });
    angular.forEach(stepsToCount, (steps) => {
        stepCount += steps;
    });
    return stepCount;
}

/**
 *  Determine how many unique strollers have been treated to desserts.
 *  @param {Array} goals - Array of goals from goals collection.
 */
function _getUniqueStrollerCount(goals) {
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
