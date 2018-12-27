var BlueBackground = function () {
    var components = [new ScreenSizedImageComponent("Background.png", null, null, null, Scale.UniformMax)];
    var instance = new GameObject("BlueBackground", null, components);
    return instance;
};