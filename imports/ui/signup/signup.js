/*  Signup Component. Meteor Acounts module from `accounts-base` inserts
    signups into Meteor.users collection. We extend each signup with a custom
    profile.  */
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Accounts } from 'meteor/accounts-base';

// demo only : will help generate profile data
import {generateInt, generateDesserts} from './data';

import template from './signup.html';

var sdSignup;

class SignupController {
    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);

        this.$state = $state;
        this.credentials = {
            username: '',
            password: ''
        };
        this.err = '';
        this.isDessertMaker = false;
    }

    signup() {
        var type = this.isDessertMaker ? 'dessert-maker' : 'stroller',
            // add type and space for saving ui related data to profile
            profile = {type, ui: {}},
            opts = _.extend(this.credentials, {profile});
        // Demo Only: we'll generate some data for dessert maker profiles
        if(type === 'stroller') {
            _.extend(opts.profile, {steps: generateInt(150)});
        } else {
            _.extend(opts.profile, {
                deliveries: generateInt(45, 1),
                desserts: generateDesserts()
            });
        } // \Demo Only
        Accounts.createUser(opts, (err) => {
            if(angular.isUndefined(err)) {
                let goState = type === 'dessert-maker' ? 'sd.dessert-maker' :
                    'sd.stroller';
                this.$state.go(goState, {id: Meteor.userId()});
            } else {
                this.err = err;
            }
        });
    }
}

// <sd-signup> definition
sdSignup = {
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

function routerCfg($stateProvider) {
    'ngInject';
    $stateProvider
        .state('sd.signup', {
            url: 'signup',
            views: {
                '@': {template: '<sd-signup></sd-signup'}
            }
        });
}
