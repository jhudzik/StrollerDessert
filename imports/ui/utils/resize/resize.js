import template from './resize.html';

var sdResize;
const DEFAULT_MIN_FLEX='45';

class ResizeController {
    constructor($scope, $reactive, sdLayoutService) {
        'ngInject';
        $reactive(this).attach($scope);

        this.autorun(() => {
            this.getReactively('size');
            if(angular.isDefined(this.size)) {
                this.isSmall = this.size.flexSize === this.minFlex ||
                    this.size.flexSize === DEFAULT_MIN_FLEX;
            }
        });

        this.sdLayoutService = sdLayoutService;
        this.helpers({
            size() {
                return this.sdLayoutService.getSize(this.componentId);
            }
        });
    }

    setSize(size=DEFAULT_MIN_FLEX) {
        this.sdLayoutService.setSize(this.componentId, size);
    }
}

// <sd-resize> definition
sdResize = {
    bindings: {
        componentId: '@',
        minFlex: '@'
    },
    controller: ResizeController,
    template
}

export default sdResize;
