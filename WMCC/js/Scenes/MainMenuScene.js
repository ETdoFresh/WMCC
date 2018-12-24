var MainMenuScene = function () {
    var instance = new GameObject("MainMenu Scene");
    instance.Base = GameObject;
    instance.Type = MainMenuScene;

    instance.AddChild(new BlackBackground());
    instance.AddChild(new BlueBackground());
    instance.AddChild(new CornerTime());

    var mainMenuBar = instance.AddChild(new MainMenuItemBar("TV"
        , new MainMenuItem("recorded TV", "recordedTV.png", StartUpScene)
        , new MainMenuItem("guide", "guide.png", StartUpScene)
        , new MainMenuItem("live TV", "liveTV.png", StartUpScene)
        , new MainMenuItem("search", "search.png", StartUpScene)
    ));

    var tvText = instance.AddChild(new TextObject("TV", "lighter 48px Eras ITC, Malgun Gothic, Arial", "white"));
    tvText.ScreenPosition = { x: 0.175, y: 0.525 };

    instance.AddChild(new SelectionSquare());

    var onLeftArrow = function (e) { mainMenuBar.SelectPrevious(); };
    var onRightArrow = function (e) { mainMenuBar.SelectNext(); };
    var onEnter = function (e) { mainMenuBar.Select(); };

    Input.AddKeyDownListener(KeyCode.LeftArrow, onLeftArrow);
    Input.AddKeyDownListener(KeyCode.RightArrow, onRightArrow);
    Input.AddKeyDownListener(KeyCode.Enter, onEnter);

    instance.OnDestroy = function () {
        Input.RemoveKeyDownListener(KeyCode.LeftArrow, onLeftArrow);
        Input.RemoveKeyDownListener(KeyCode.RightArrow, onRightArrow);
        Input.RemoveKeyDownListener(KeyCode.Enter, onEnter);
    };

    return instance;
};