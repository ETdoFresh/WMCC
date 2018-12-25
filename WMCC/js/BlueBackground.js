var BlueBackground = function () {
    var instance = new GameObject("BlueBackground", null,
        [new ScreenFitImageComponent("Background.png", 0.5, 0.5)]
    );
    return instance;
};