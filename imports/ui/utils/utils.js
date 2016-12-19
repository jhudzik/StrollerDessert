
import sdShow from './visibility/show';
import sdHide from './visibility/hide';
import toArray from './to-array';
import { SdLayoutService } from './layout';

export default
    angular
        .module('stroller-dessert.utils', [])
        .service('sdLayoutService', SdLayoutService)
        .component('sdHide', sdHide)
        .component('sdShow', sdShow)
        .filter('toArray', toArray);
