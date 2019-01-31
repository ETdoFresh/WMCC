var RecordedTVSortMenu = function (e) {
    var instance = new MenuTemplate("RecordedTVSortMenu", [RecordedTVSortMenu]);

    var background;
    var options = ["date recorded", "title", "original air date", "shared"];

    instance.OnEnable = function () {
        background = new GameObject("RecordedTVSortMenu");
        instance.Transform().AddChild(background);
        background.AddComponent(new ScreenSizedImageComponent(
            "SeperatorBackground.png",
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: 1, y: 0.25 },
            Scale.Nonuniform
        ));
    };

    instance.OnDisable = function () {
        if (background !== null) {
            background.Destroy();
            background = null;
        }
    };

    return instance;
};