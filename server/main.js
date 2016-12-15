import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  // Accounts.onCreateUser((opts, user) => {
  //     // for demo, we are going to load some mock data into the user profile
  //     return _.extend(user, {isDessertMaker: opts.isDessertMaker});
  // });
});
