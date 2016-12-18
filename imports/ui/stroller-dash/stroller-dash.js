import { Meteor } from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './stroller-dash.html';
import sdDessertMakerList from '../dessert-maker-list/dessert-maker-list';

var sdStrollerDash;

class StrollerDashController {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.helpers({
            stroller() {
                return Meteor.user();
            }
        });
    }

    createGoal(dm, dessert) {
        // toJson will strip angular props ($$hashkey, etc..)
        Meteor.call('goals.insert', angular.toJson({
            dessert,
            sId: Meteor.userId(),
            dmId: dm._id,
            dmName: dm.username
        }));
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
