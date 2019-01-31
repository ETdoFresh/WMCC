var AppObject = function (name, type) {
    var instance = {};
    instance.Types = [AppObject].concat(type);
    instance.Id = AppObject.NextId++;
    instance.Name = (name ? name : "Object") + instance.Id;
    instance.Is = AppObject.Is;
    instance.FindObjectOfType = AppObject.FindObjectOfType;
    instance.FindObjectsOfType = AppObject.FindObjectsOfType;
    instance.OnDestroy = DoNothing;
    instance.Destroy = function () { instance.OnDestroy(); };
    return instance;
};

AppObject.NextId = 0;

AppObject.Is = function (type) {
    return this.Types.includes(type);
};

AppObject.FindObjectOfType = function (type) {
    for (var i = 0; i < GameObject.All.length; i++)
        for (var j = 0; j < GameObject.All[i].Components.length; j++)
            if (GameObject.All[i].Components[j].Is(type))
                return GameObject.All[i].Components[j];
};

AppObject.FindObjectsOfType = function (type) {
    var objects = [];
    for (var i = 0; i < GameObject.All.length; i++)
        for (var j = 0; j < GameObject.All[i].Components.length; j++)
            if (GameObject.All[i].Components[j].Is(type))
                objects.push(GameObject.All[i].Components[j]);
    return objects;
};