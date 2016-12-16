import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import { Strollers } from '../imports/collections/strollers';
import { DessertMakers } from '../imports/collections/dessert-makers';

Meteor.startup(() => {
    if(DessertMakers.find().count() === 0) {
        dessertMakers.forEach((dm) => {
            DessertMakers.insert(dm);
        });
    }
});

var dessertMakers = [
    {
        name:  "Jeff's Bakery",
        dessert: {
            types: ['Brownies', 'Apple Pie'],
            delivered: {
                total: 9
            }
        }
    },
    {
        name:  "Adam's Bakery",
        dessert: {
            types: ['Cheesecake', 'Blueberry Pie'],
            delivered: {
                total: 18
            }
        }
    }
];
