import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

angular
    .module('stroller-dessert', [
        angularMaterial,
        angularMeteor,
        uiRouter
    ]);
