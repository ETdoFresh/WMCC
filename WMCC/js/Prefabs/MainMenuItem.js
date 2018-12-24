var MainMenuItem = function (name, icon, scene) {
    var instance = new GameObject();
    instance.Base = GameObject;
    instance.Type = MainMenuItem;
    instance.Name = "MainMenuItem" + instance.Id;

    name = name ? name : "unknown";
    icon = icon ? icon : "unknown.png";
    instance.Scene = scene ? scene : MainMenuScene;

    instance.ItemText = instance.AddChild(new TextObject(name, "lighter 25px Eras ITC, Malgun Gothic, Arial", "white", "center"));
    instance.ItemIcon = instance.AddChild(new ImageObject(icon));
    return instance;
};