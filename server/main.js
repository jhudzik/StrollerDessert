import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Accounts.onCreateUser((opts, user) => {
      return _.extend(user, {isDessertMaker: opts.isDessertMaker});
  });
});
