var TestScene = function () {
    var instance = new GameObject("Test Scene");
    instance.Transform.AddChild(new BlackBackground());
    App.ChangeScene(ConnectingScene);
    return instance;
};