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

sdShow = {
    bindings: {componentId: '@'},
    controller: ShowController,
    template
}

export default sdShow;
