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

    instance.BlueBackground.Image.Alpha = 1;
    instance.GreenButton.Image.Alpha = 1;

    return instance;
};

StartUpScene.Update = function (gameTime) {
    this.Base.Update.call(this, gameTime);
};