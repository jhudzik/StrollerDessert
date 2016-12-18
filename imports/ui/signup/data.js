// Helpers to mock out data for demo profiles
const DESSERTS = [
    {type: 'Brownies', steps: 35},
    {type: 'Pudding', steps: 25},
    {type: 'Apple Pie', steps: 65},
    {type: 'Oatmeal Cookies', steps: 50},
    {type: 'Peach Cobbler', steps: 90},
    {type: 'Pumpkin Pie', steps: 75}
];

function generateInt(max, min=0) {
    return Math.floor(min + Math.random() * (max - min));
}

function generateDesserts() {
    var numDesserts = generateInt(DESSERTS.length, 1),
        desserts = [];
    while(desserts.length <= numDesserts) {
        let dessert = DESSERTS[generateInt(DESSERTS.length)];
        if(desserts.indexOf(dessert) === -1) {
            desserts.push(dessert);
        }
    }
    return desserts;
}

export { generateInt, generateDesserts };
