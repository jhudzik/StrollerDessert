import { Meteor } from 'meteor/meteor';

export class SdLayoutService {
    constructor($stateParams) {
        'ngInject';

        this.$stateParams = $stateParams;
    }

    getUICfg() {
        return Meteor.users.findOne({_id: Meteor.userId()}, {
            fields: {'profile.ui': 1},
            transform(res) {
                return res.profile.ui || {}
            }
        });
    }

    hideComponent(componentId) {
        var field = `profile.ui.${componentId}.hidden`;
        return Meteor.users.update({_id: Meteor.userId()}, {
            $set: {[field]: true}
        });
    }

    showComponent(componentId) {
        var field = `profile.ui.${componentId}.hidden`;
        return Meteor.users.update({_id: Meteor.userId()}, {
            $set: {[field]: false}
        });
    }
}
