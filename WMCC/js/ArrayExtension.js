Array.FlattenDeep = function (array) {
    return array.reduce((acc, val) => Array.isArray(val) ?
        acc.concat(Array.FlattenDeep(val)) :
        acc.concat(val), []);
};