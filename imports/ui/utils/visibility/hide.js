/*  Triggers visibility configuration writes to a user profile. The componentId
    binding should match the `id` of the component that is to be hidden.
    Up to the user on how to implement the actual method to hide the component.
    In our case we wrap the component in a container with `ng-hide`.  */
import template from './hide.html';

var sdHide;

class HideController {
    constructor($reactive, $scope, sdLayoutService) {
        'ngInject';
        $reactive(this).attach($scope);

        this.sdLayoutService = sdLayoutService;
    }

    hide() {
        this.sdLayoutService.setVisibility(this.componentId, true);
    }
}

sdHide = {
    bindings: {componentId: '@'},
    controller: HideController,
    template
}

export default sdHide;
