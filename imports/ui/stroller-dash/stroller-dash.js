import { Meteor } from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './stroller-dash.html';
console.log(template);

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
        .config(routerCfg);

function routerCfg($stateProvider) {
    $stateProvider
        .state('sd.stroller', {
            url: 'stroller/:id',
            views: {
                '@': {template: '<sd-stroller-dash></sd-stroller-dash>'}
            }
        });
}
