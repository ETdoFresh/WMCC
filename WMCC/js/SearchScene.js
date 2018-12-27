var SearchScene = function () {
    var instance = new GameObject("Search Scene");
    instance.Transform.AddChild(new BlackBackground());
    instance.Transform.AddChild(new BlueBackground());
    return instance;
};