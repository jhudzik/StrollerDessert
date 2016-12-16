import angular from 'angular';

import toArray from './filters/to-array.js';
import { SdLayoutService } from './layout/layout.service';

let utilsModule =
    angular
        .module('stroller-dessert.utils', [])
        .filter('toArray', toArray)
        .service('sdLayoutService', SdLayoutService);

export default utilsModule;
