import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Accounts } from 'meteor/accounts-base';

import template from './signup.html'

class SignupController {
    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);

        this.credentials = {
            username: '',
            password: '',
            isDessertMaker: false
        };
        this.err = '';
        this.$state = $state;
    }

    signup() {
        Accounts.createUser(this.credentials, (err) => {
            if(angular.isUndefined(err)) {
                let redirectState = this.credentials.isDessertMaker ?
                    'sd.dessert-maker' : 'sd.stroller';
                $state.go(redirectState);
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
