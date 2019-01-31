var Queue = function () {
    var instance = {};
    var data = [];
    instance.Enqueue = function (record) { data.unshift(record); };
    instance.Dequeue = function () { return data.pop(); };
    instance.First = function () { return data[0]; };
    instance.Last = function () { return data[data.length - 1]; };
    instance.Count = function () { return data.length; };
    return instance;
};