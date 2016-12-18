
import template from './deliveries.html';

var sdDeliveries;

class DeliveriesController {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }
}

sdDeliveries = {
    bindings: {total: '<'},
    controller: DeliveriesController,
    template
}

export default sdDeliveries;
