var RecordedTVItemInfo = function () {
    var instance = new MenuTemplate("RecordedTVItemInfo", [RecordedTVItemInfo]);
    var background;

    instance.OnEnable = function () {
        background = new GameObject("Background");
        instance.Transform().AddChild(background);
        background.AddComponent(new ScreenSizedImageComponent(
            "SeperatorBackground.png",
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: -0.25 },
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