var LogoScene = function()
{
    var instance = new GameObject("Logo Scene");
    instance.Base = GameObject;
    instance.Type = "Scene";

    instance.AddChild(new BlackBackground());
    instance.AddChild(new BlueBackground());

    return instance;
};