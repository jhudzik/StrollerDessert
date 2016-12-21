// Component to display a list of goals.

import template from './goals-list.html';

var sdGoals;

class SdGoalsController {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        // watch our goals collection - update status as complete if necessary
        $scope.$watchCollection(
            () => {return this.goals;},
            (goals) => {
                goals.forEach((g) => {
                    if(g.dessert.steps <= this.steps && !g.complete) {
                        this.onComplete({goal: g});
                    }
                });
            }
        );
    }
}

// <sd-goals> definition
sdGoals = {
    bindings: {
        goals: '<',
        onComplete: '&',
        steps: '<'
    },
    controller: SdGoalsController,
    template
};

export default sdGoals;
