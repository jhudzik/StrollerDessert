import { DessertMakers } from '../../../../collections/dessert-makers';
import template from './dessert-makers.html';

class DessertMakersController {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.subscribe('dessertMakers');

        this.helpers({
            list() {
                return DessertMakers.find();
            }
        });
    }
}

let sdDessertMakers = {
    controller: DessertMakersController,
    template
}

export default sdDessertMakers;
