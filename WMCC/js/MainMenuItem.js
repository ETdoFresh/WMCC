var MainMenuItem = function (name, icon, scene) {
    var instance = new GameObject("MainMenuItem");

    name = name ? name : "unknown";
    icon = icon ? icon : "unknown.png";
    instance.Scene = scene ? scene : MainMenuScene;

    instance.ItemText = instance.AddComponent(new ScreenPositionedTextComponent(name, null, "lighter 25px Eras ITC, Malgun Gothic, Arial", "white", "center"));
    instance.ItemIcon = instance.AddComponent(new ScreenSizedImageComponent(icon, null, null, null, Scale.UniformFit));
    return instance;
};