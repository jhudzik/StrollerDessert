import angular from 'angular';
import template from './daily-progress.html';

let sdDailyProgress = {
    bindings: {steps: '<'},
    controller: angular.noop,
    template
};

export default sdDailyProgress;
