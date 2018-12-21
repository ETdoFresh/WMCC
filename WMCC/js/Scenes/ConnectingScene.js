var ConnectingScene = function()
{
    var instance = new GameObject("Logo Scene");
    instance.Base = GameObject;
    instance.Type = "Scene";

    instance.AddChild(new BlackBackground());
    instance.AddChild(new BlueBackground());
    instance.AddChild(new CornerTime());
    var loadingCircle = instance.AddChild(new LoadingCircle());

    ServerWMC.Send("WMCC^EREFRESH|GetServerVersion<Client Quit>", OnReceiveResponse);

    function OnReceiveResponse(e) {
        loadingCircle.Destroy();
        instance.AddChild(new TextObject(e.data, null, "white", "center"));
    }

    return instance;
};