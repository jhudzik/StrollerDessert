import angular from 'angular';

import sdHide from './hide.js';
import sdShow from './show.js';

export default angular.module('stroller-dessert.visibility', [])
        .component('sdHide', sdHide)
        .component('sdShow', sdShow);
