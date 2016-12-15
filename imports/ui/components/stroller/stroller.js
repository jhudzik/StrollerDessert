import { Meteor } from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './stroller.html';

// stroller components
import sdDailyProgress from './daily-progress/daily-progress.js';

class StrollerController {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.helpers({
            stroller() {
                return Meteor.user();
            }
        });
    }
}

let sdStrollerDashboard = {
    controller: StrollerController,
    template
};

export default angular.module('stroller-dessert.stroller', [
        angularMeteor,
        uiRouter
    ])
    .component('sdStrollerDashboard', sdStrollerDashboard)
    // stroller components
    .component('sdDailyProgress', sdDailyProgress)
    .config(routerCfg);

function routerCfg($stateProvider) {
    $stateProvider
        .state('sd.stroller', {
            data: {requireLogin: true},
            url: 'stroller/:id',
            views: {
                'header@': {},
                '@': {
                    template: '<sd-stroller-dashboard></sd-stroller-dashboard>'
                }
            }
        })
}
