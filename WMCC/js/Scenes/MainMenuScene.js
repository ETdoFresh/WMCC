var MainMenuScene = function () {
    var instance = new GameObject("MainMenu Scene");
    instance.Base = GameObject;
    instance.Type = MainMenuScene;

    instance.AddChild(new BlackBackground());
    instance.AddChild(new BlueBackground());
    instance.AddChild(new CornerTime());

    var tvText = instance.AddChild(new TextObject("TV", "lighter 48px Eras ITC, Malgun Gothic, Arial", "white"));
    tvText.ScreenPosition = { x: 0.175, y: 0.525 };

    var recordedTVText = instance.AddChild(new TextObject("recorded tv", "lighter 30px Eras ITC, Malgun Gothic, Arial", "white", "right"));
    recordedTVText.ScreenPosition = { x: 0.325, y: 0.75 };

    var recordedTVIcon = instance.AddChild(new ImageObject("recordedTV.png"));
    recordedTVIcon.ScreenPosition = { x: 0.25, y: 0.625 };
    recordedTVIcon.Scale = { x: 0.2, y: 0.2 };

    var guideIcon = instance.AddChild(new ImageObject("guide.png"));
    guideIcon.ScreenPosition = { x: 0.4, y: 0.625 };
    guideIcon.Scale = { x: 0.1, y: 0.1 };

    var liveTVIcon = instance.AddChild(new ImageObject("liveTV.png"));
    liveTVIcon.ScreenPosition = { x: 0.5, y: 0.625 };
    liveTVIcon.Scale = { x: 0.1, y: 0.1 };

    var searchIcon = instance.AddChild(new ImageObject("search.png"));
    searchIcon.ScreenPosition = { x: 0.6, y: 0.625 };
    searchIcon.Scale = { x: 0.1, y: 0.1 };

    instance.AddChild(new SelectionSquare());

    return instance;
};