/*  Triggers visibility configuration writes to a user profile. The componentId
    binding should match the `id` attribute of the component that is to be displayed.
    Up to the user on how to implement the actual method to display the component.
    In our case we wrap the component in a container with `ng-hide`.  */
import template from './show.html';

var sdShow;

class ShowController {
    constructor($reactive, $scope, sdLayoutService) {
        'ngInject';
        $reactive(this).attach($scope);

        this.sdLayoutService = sdLayoutService;
    }

    show() {
        this.sdLayoutService.setVisibility(this.componentId);
    }
}

// <sd-show> definition
sdShow = {
    bindings: {componentId: '@'},
    controller: ShowController,
    template
}

export default sdShow;
