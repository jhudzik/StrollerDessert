import template from './hide.html';

class HideController {
    constructor($scope, $reactive, sdLayoutService) {
        'ngInject';
        $reactive(this).attach($scope);

        this.sdLayoutService = sdLayoutService;
    }

    hide() {
        this.sdLayoutService.hideComponent(this.componentId);
    }
}

let sdHide = {
    bindings: {componentId: '@'},
    controller: HideController,
    template
};

export default sdHide;
