var TestScene = function () {
    var instance = new GameObject("Test Scene");
    instance.Transform.AddChild(new BlackBackground());
    instance.Transform.AddChild(new BlueBackground());
    return instance;
};