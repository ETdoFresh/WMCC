var MainMenuScene = function () {
    var instance = new GameObject("MainMenu Scene");

    instance.Transform.AddChild(new BlackBackground());
    instance.Transform.AddChild(new BlueBackground());
    instance.Transform.AddChild(new CornerTime());

    var bars = [];

    bars.push(instance.Transform.AddChild(new MainMenuItemBar("TV"
        , new MainMenuItem("recorded TV", "recordedTV.png", StartUpScene)
        , new MainMenuItem("guide", "guide.png", StartUpScene)
        , new MainMenuItem("live TV", "liveTV.png", StartUpScene)
        , new MainMenuItem("search", "search.png", StartUpScene)
    )).GameObject);

    //bars.push(instance.AddChild(new MainMenuItemBar("Task"
    //    , new MainMenuItem("recorded TV", "recordedTV.png", StartUpScene)
    //    , new MainMenuItem("guide", "guide.png", StartUpScene)
    //    , new MainMenuItem("live TV", "liveTV.png", StartUpScene)
    //    , new MainMenuItem("search", "search.png", StartUpScene)
    //)));

    instance.Transform.AddChild(new SelectionSquare());

    var selectedBar = 0;
    var onLeftArrow = function (e) { bars[selectedBar].SelectPrevious(); };
    var onRightArrow = function (e) { bars[selectedBar].SelectNext(); };
    var onEnter = function (e) { bars[selectedBar].Select(); };

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