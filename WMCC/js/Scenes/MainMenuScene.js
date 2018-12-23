var MainMenuScene = function () {
    var instance = new GameObject("MainMenu Scene");
    instance.Base = GameObject;
    instance.Type = MainMenuScene;

    instance.AddChild(new BlackBackground());
    instance.AddChild(new BlueBackground());
    instance.AddChild(new CornerTime());

    var mainMenuBar = instance.AddChild(new MainMenuItemBar("TV"
        , new MainMenuItem("recorded TV", "recordedTV.png", MainMenuScene)
        , new MainMenuItem("guide", "guide.png", MainMenuScene)
        , new MainMenuItem("live TV", "liveTV.png", MainMenuScene)
        , new MainMenuItem("search", "search.png", MainMenuScene)
    ));

    var tvText = instance.AddChild(new TextObject("TV", "lighter 48px Eras ITC, Malgun Gothic, Arial", "white"));
    tvText.ScreenPosition = { x: 0.175, y: 0.525 };

    Input.AddKeyDownListener(KeyCode.LeftArrow, function (e) { console.log("Input: Left Arrow"); });
    Input.AddKeyDownListener(KeyCode.RightArrow, function (e) { console.log("Input: Right Arrow"); });
    Input.AddKeyDownListener(KeyCode.Enter, function (e) { console.log("Input: Enter"); });

    instance.AddChild(new SelectionSquare());

    return instance;
};