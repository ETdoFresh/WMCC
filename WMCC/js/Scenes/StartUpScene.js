var StartUpScene = function () {
    var instance = new GameObject("StartUp Scene");
    instance.Base = GameObject;
    instance.Type = StartUpScene;
    //instance.Update = StartUpScene.Update;

    instance.AddChild(new BlackBackground());
    instance.BlueBackground = instance.AddChild(new BlueBackground());
    instance.AddChild(new CornerTime());
    instance.AddChild(new TextObject(ServerInfo.Version, null, "white", "center"));
    instance.GreenButton = instance.AddChild(new StartUpGreenButton());

    Action.Alpha(instance.BlueBackground.Image, 0.0, 1.0, 1000);
    Action.Alpha(instance.GreenButton.Image, 0.0, 1.0, 500);
    Action.Scale(instance.GreenButton.Transform, 1.0, 0.0, 2500);
    //Action.PlaySound("");

    return instance;
};

StartUpScene.Update = function (gameTime) {
    this.Base.Update.call(this, gameTime);
};