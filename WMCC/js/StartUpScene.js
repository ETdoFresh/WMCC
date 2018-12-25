var StartUpScene = function () {
    var instance = new GameObject("StartUp Scene");
    instance.Base = GameObject;
    instance.Type = StartUpScene;

    instance.AddChild(new BlackBackground());
    var blueBackground = instance.BlueBackground = instance.AddChild(new BlueBackground());
    instance.AddChild(new CornerTime());
    var text = instance.AddChild(new TextObject("ServerWMC " + ServerInfo.Version, "50px", "white", "center"));
    var greenButton = instance.AddChild(new StartUpGreenButton());

    Action.Alpha(blueBackground.Image, 0.0, 1.0, 1000);
    Action.Alpha(greenButton.Image, 0.0, 1.0, 500);
    Action.Scale(greenButton.Transform, 1.0, 0.0, 2500);
    text.TextComponent.Alpha = 0;
    //Action.PlaySound("");

    setTimeout(function () { text.TextComponent.Alpha = 1; }, 500);
    setTimeout(function () { Action.Alpha(text.TextComponent, 1.0, 0.0, 1000); }, 3000);
    setTimeout(function () { Action.Alpha(greenButton.Image, 1.0, 0.0, 2000); }, 1000);
    setTimeout(function () { App.ChangeScene(MainMenuScene); }, 4000);

    return instance;
};