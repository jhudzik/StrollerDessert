/*  Goal documents contain a reference to a dessert maker, a stroller,
    a dessert, and the steps required to fulfil the goal.  */
import { Meteor } from 'meteor/meteor';
export const Goals = new Mongo.Collection('goals');

if(Meteor.isServer) {
    Meteor.publish('goals', () => {
        return Goals.find();
    });
}

Meteor.methods({
    'goals.insert'(goal) {
        if(!this.userId) {
            throw new Error('Authorization Error');
        }
        _.extend(goal, {createdAt: new Date()});
        Goals.insert(goal);
    }
});
