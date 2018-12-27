var GuideScene = function () {
    var instance = new GameObject("Guide Scene");
    instance.Transform.AddChild(new BlackBackground());
    instance.Transform.AddChild(new BlueBackground());
    return instance;
};