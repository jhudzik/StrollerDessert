/*  Signup Component. Meteor Acounts module from `accounts-base` inserts
    signups into Meteor.users collection. We extend each signup with a custom
    profile.  */
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Accounts } from 'meteor/accounts-base'; //

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
        Accounts.createUser(opts, (err) => {
            var goState = this.isDessertMaker ? 'sd.dessert-maker' :
                'sd-stroller';
            this.$state.go(goState, {id: Meteor.userId()});
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
