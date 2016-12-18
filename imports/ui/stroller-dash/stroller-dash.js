import { Meteor } from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Goals } from '../../api/goals';

import template from './stroller-dash.html';
import sdDessertMakerList from '../dessert-maker-list/dessert-maker-list';
import sdGoalsList from '../goals-list/goals-list';
import sdDailyProgress from '../daily-progress/daily-progress';

var sdStrollerDash;

class StrollerDashController {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.subscribe('goals');
        this.helpers({
            goals() {
                return Goals.find({sId: Meteor.userId()});
            },
            stroller() {
                return Meteor.user();
            }
        });
    }

    createGoal(dm, dessert) {
        // toJson will strip angular props ($$hashkey, etc..)
        var goal = angular.fromJson(angular.toJson({
            dessert,
            sId: Meteor.userId(),
            dmId: dm._id,
            dmName: dm.username
        }));
        this.call('goals.insert', goal);
    }

    onGoalComplete(goal) {
        this.call('goals.setAsComplete', goal);
    }
}

// <stroller-dash> definition
sdStrollerDash = {
    controller: StrollerDashController,
    template
};

export default
    angular
        .module('stroller-dessert.stroller-dash', [
            angularMeteor,
            uiRouter
        ])
        .component('sdStrollerDash', sdStrollerDash)
        .component('sdDessertMakerList', sdDessertMakerList)
        .component('sdGoalsList', sdGoalsList)
        .component('sdDailyProgress', sdDailyProgress)
        .config(routerCfg);

function routerCfg($stateProvider) {
    $stateProvider
        .state('sd.stroller', {
            url: 'stroller/:id',
            views: {
                '@': {
                    template: '<sd-stroller-dash></sd-stroller-dash>'
                }
            }
        });
}
