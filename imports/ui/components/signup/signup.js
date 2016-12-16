import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import { DessertMakers } from '../../../collections/dessert-makers';
import { Strollers } from '../../../collections/strollers';

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
     * Demo Only. We need a bunch of integers.
     */
    generateInteger(max, min=0) {
        return Math.floor(min + Math.random() * (max - min));
    }

    /**
     * Demo Only. Populate User Profile with Data
     */
    buildProfile(type, username) {
        var profile;
        switch(type) {
            case 'stroller':
                profile = {type};
                let today = this.generateInteger(100),
                    total = this.generateInteger(300, today);
                let goals = [
                    {
                        stepsNeeded: this.generateInteger(75, 15),
                        dessert: {
                            maker: "Jeff's Bakery",
                            type: 'Apple Pie'
                        }
                    },
                    {
                        stepsNeeded: this.generateInteger(125, 55),
                        dessert: {
                            maker: "Adam's Bakery",
                            type: 'Cheesecake'
                        }
                    }
                ];
                profile.goals = goals;
                profile.steps = {today, total};
                break;
            case 'dessertMaker':
                profile = {
                    name: username,
                    dessert: {
                        types: ['Cherry Pie', 'Baklava'],
                        delivered: {
                            total: Math.floor(Math.random() * 50)
                        }
                    }
                };
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
                let redirectState;
                if(this.isDessertMaker) {
                    redirectState = 'sd.dessert-maker';
                    DessertMakers.insert(profile);
                } else {
                    redirectState = 'sd.stroller';
                    Strollers.insert(profile);
                }
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
