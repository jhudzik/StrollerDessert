import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.publish('dessertMakers', () => {
    return Meteor.users.find({'profile.type': 'dessertMaker'});
});
