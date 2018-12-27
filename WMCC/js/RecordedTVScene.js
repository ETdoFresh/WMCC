var RecordedTVScene = function () {
    var instance = new GameObject("Recorded TV Scene");
    instance.Transform.AddChild(new BlackBackground());
    instance.Transform.AddChild(new BlueBackground());
    return instance;
};