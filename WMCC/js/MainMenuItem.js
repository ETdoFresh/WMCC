var MainMenuItem = function (name, icon, scene) {
    var instance = new GameObject("MainMenuItem");

    name = name ? name : "unknown";
    icon = icon ? icon : "unknown.png";
    instance.Scene = scene ? scene : MainMenuScene;

    var itemText = instance.Transform.AddChild(new GameObject("MainMenuItemText"));
    instance.ItemText = itemText.AddComponent(new ScreenPositionedTextComponent(name, null,
        "lighter 25px Eras ITC, Malgun Gothic, Arial", "white", "center"));

    var itemIcon = instance.Transform.AddChild(new GameObject("MainMenuItemIcon"));
    instance.ItemIcon = itemIcon.AddComponent(new ScreenSizedImageComponent(icon, null,
        null, null, Scale.UniformFit));

    return instance;
};