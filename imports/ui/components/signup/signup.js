import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import template from './signup.html'

class SignupController {
    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$state = $state;

        this.credentials = {
            username: '',
            password: '',
        };
        this.err = '';
        this.isDessertMaker = false;
    }

    /**
     * Demo Only. Populate User Profile with Data
     */
    buildProfile(type) {
        var profile = {type};
        switch(type) {
            case 'stroller':
                let today = Math.floor(Math.random() * 100),
                    total = Math.floor(Math.random() * today +
                        Math.random() * 300);
                profile.steps = {today, total};
                break;
            case 'dessertMaker':
                break;
        }
        return profile;
    }

    signup() {
        var type = this.isDessertMaker ? 'dessertMaker' : 'stroller',
            profile = this.buildProfile(type),
            opts = angular.extend(this.credentials, {profile});
        Accounts.createUser(opts, (err) => {
            if(angular.isUndefined(err)) {
                let redirectState = this.isDessertMaker ?
                    'sd.dessert-maker' : 'sd.stroller';
                this.$state.go(redirectState, {id: Meteor.userId()});
            } else {
                this.err = err;
            }
        });
    }
}

// <sd-signup> definition
let sdSignup = {
    controller: SignupController,
    template
};

export default
    angular
        .module('stroller-dessert.signup', [
            angularMeteor,
            uiRouter
        ])
        .component('sdSignup', sdSignup)
        .config(routerCfg);

// setup signup route
function routerCfg($stateProvider) {
    'ngInject';

    $stateProvider
        .state('sd.signup', {
            url: 'signup',
            views: {
                '@': {template: '<sd-signup></sd-signup>'}
            }
        });
}
