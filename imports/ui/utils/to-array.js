/**
 *  Filter `toArray`. Converts object of objects to array of objects where each
 *  object's key is assigned to the object under _key.
 *  e.g. {x: {num: 1}, y: {num: 2}} -> [{_key:x, num: 1}, {_key: y, num: 2}]
 *  Allows us to apply angular's `filter` which expects array arguments.
 */
export default function() {
    return (inp) => {
        var toArr = [];
        if(angular.isObject(inp)) {
            angular.forEach(inp, (i, k) => {
                if(angular.isObject(i)) {
                    i._key = k;
                    toArr.push(i);
                }
            });
        }
        return toArr;
    };
}
