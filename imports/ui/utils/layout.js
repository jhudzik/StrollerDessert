import { Meteor } from 'meteor/meteor';

export class SdLayoutService {
    constructor($stateParams) {
        'ngInject';
        this.$stateParams = $stateParams;
    }

    getSize(componentId) {
        var field = `profile.ui.${componentId}.flexSize`;
        return Meteor.users.findOne({_id: Meteor.userId()}, {
            transform(res) {
                var flexSize,
                    uiProfile = res.profile.ui;
                if(angular.isDefined(uiProfile[componentId])) {
                    flexSize = uiProfile[componentId].flexSize || '60';
                } else {
                    flexSize = '60';
                }
                return {flexSize};
            }
        })
    }

    getUiCfg() {
        return Meteor.users.findOne({_id: Meteor.userId()}, {
            fields: {'profile.ui': 1},
            transform(res) {
                return res.profile.ui || {}
            }
        });
    }

    setSize(componentId, size) {
        var field = `profile.ui.${componentId}.flexSize`;
        return Meteor.users.update({_id: Meteor.userId()}, {
            $set: {[field]: size}
        });
    }

    setVisibility(componentId, hide=false) {
        var field = `profile.ui.${componentId}.hidden`;
        return Meteor.users.update({_id: Meteor.userId()}, {
            $set: {[field]: hide}
        });
    }
}
