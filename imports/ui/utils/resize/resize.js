import template from './resize.html';

var sdResize;

class ResizeController {
    constructor($scope, $reactive, sdLayoutService) {
        'ngInject';
        $reactive(this).attach($scope);

        this.autorun(() => {
            this.getReactively('size');
            if(angular.isDefined(this.size)) {
                this.isSmall = this.size.flexSize === '60';
            }
            console.log(this.isSmall);
        });

        this.sdLayoutService = sdLayoutService;
        this.helpers({
            size() {
                return this.sdLayoutService.getSize(this.componentId);
            }
        });
    }

    setSize(size) {
        this.sdLayoutService.setSize(this.componentId, size);
    }
}

sdResize = {
    bindings: {componentId: '@'},
    controller: ResizeController,
    template
}

export default sdResize;
