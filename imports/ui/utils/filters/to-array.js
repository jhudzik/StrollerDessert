export default function() {
    return (inp) => {
        var toArr = [];
        if(angular.isObject(inp)) {
            angular.forEach(inp, (i, k) => {
                i._key = k;
                toArr.push(i);
            });
        }
        return toArr;
    };
}
