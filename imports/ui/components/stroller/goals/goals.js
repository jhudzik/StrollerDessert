import template from './goals.html';

console.log(template);

class GoalsController {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }

    isCompleted() {

    }
}

let sdGoals = {
    bindings: {
        goals: '<',
        // requestDessert: '&',
        stepsToday: '<',
    },
    controller: GoalsController,
    template
}

export default sdGoals;
