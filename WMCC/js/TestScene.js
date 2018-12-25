var TestScene = function () {
    var instance = new GameObject("Test Scene");
    instance.Transform.AddChild(new BlackBackground());
    var blueBackground = instance.Transform.AddChild(new BlueBackground());
    instance.Transform.AddChild(new CornerTime());
    var text = instance.Transform.AddChild(new TextObject("ServerWMC " + ServerInfo.Version, null, "50px", "white", "center"));
    var greenButton = instance.Transform.AddChild(new StartUpGreenButton());

    Action.Alpha(blueBackground.GetComponent(ImageComponent), 0.0, 1.0, 1000);
    Action.Alpha(greenButton.GetComponent(ImageComponent), 0.0, 1.0, 500);
    Action.Scale(greenButton.GetComponent(TransformComponent), 1.0, 0.0, 2500);
    text.GetComponent(TextComponent).Alpha = 0;
    //Action.PlaySound("");

    setTimeout(function () { text.GetComponent(TextComponent).Alpha = 1; }, 500);
    setTimeout(function () { Action.Alpha(text.GetComponent(TextComponent), 1.0, 0.0, 1000); }, 3000);
    setTimeout(function () { Action.Alpha(greenButton.GetComponent(ImageComponent), 1.0, 0.0, 2000); }, 1000);
    setTimeout(function () { App.ChangeScene(MainMenuScene); }, 4000);
    return instance;
};