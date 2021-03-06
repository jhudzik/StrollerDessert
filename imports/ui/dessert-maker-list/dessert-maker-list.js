// Component to display a list of dessert makers and their desserts.

import { Meteor } from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './dessert-maker-list.html';

var sdDessertMakerList;

class DessertMakerListController {
    constructor($reactive, $scope) {
        'ngInject';
        $reactive(this).attach($scope);

        this.subscribe('dessertMakers');
        this.helpers({
            list() {
                // this will only return dessertMaker profile information
                return Meteor.users.find({_id: {$ne: Meteor.userId()}});
            }
        });
    }
}

sdDessertMakerList = {
    bindings: {createGoal: '&'},
    controller: DessertMakerListController,
    template
};

// we'll import the component in stroller-dash.js
export default sdDessertMakerList;
