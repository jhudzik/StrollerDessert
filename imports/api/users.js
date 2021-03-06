import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


if(Meteor.isServer) {
    Meteor.publish('dessertMakers', () => {
        return Meteor.users.find({'profile.type': 'dessert-maker'}, {
            fields: {profile: 1, username: 1}
        });
    });
}
