var AppObject = function (name, type) {
    var instance = {};
    instance.Types = [AppObject].concat(type);
    instance.Id = AppObject.NextId++;
    instance.Name = (name ? name : "Object") + instance.Id;
    instance.Is = AppObject.Is;
    instance.OnDestroy = DoNothing;
    instance.Destroy = function () { instance.OnDestroy(); };
    return instance;
};

AppObject.NextId = 0;

AppObject.Is = function (type) {
    return this.Types.includes(type);
};