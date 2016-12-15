import template from './show.html';

class ShowController {
    constructor($scope, $reactive, sdLayoutService) {
        'ngInject';
        $reactive(this).attach($scope);

        this.sdLayoutService = sdLayoutService;
    }

    show() {
        this.sdLayoutService.showComponent(this.componentId);
    }
}

let sdShow = {
    bindings: {componentId: '@'},
    controller: ShowController,
    template
};

export default sdShow;
