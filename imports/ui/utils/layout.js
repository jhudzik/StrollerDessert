import { Meteor } from 'meteor/meteor';

export class SdLayoutService {
    constructor($stateParams) {
        'ngInject';
        this.$stateParams = $stateParams;
    }

    /**
     *  Get flexSize of component from current user's UI Profile.
     *  @param {String} componentId - The Id of the component whose flexSize
     *      we need to determine. If component flexSize is undefined,
     *      we default to '', which => `flex:1` when used with the
     *      angular material flex directive.
     *  @return {Object} - {flexSize}, where flexSize is a String.
     */
    getSize(componentId) {
        var field = `profile.ui.${componentId}.flexSize`;
        return Meteor.users.findOne({_id: Meteor.userId()}, {
            transform(res) {
                var flexSize,
                    uiProfile = res.profile.ui;
                if(angular.isDefined(uiProfile[componentId])) {
                    flexSize = uiProfile[componentId].flexSize || '';
                } else {
                    flexSize = '';
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
