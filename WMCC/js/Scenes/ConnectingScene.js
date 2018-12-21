var ConnectingScene = function () {
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
        ParseServerInfo(e.data);
        instance.AddChild(new TextObject(ServerInfo.Version, null, "white", "center"));
    }

    function ParseServerInfo(data) {
        var lines = Parser.Parse(data);
        ServerInfo.Version = lines[0];
        ServerInfo.buildNumber = lines[1];
        ServerInfo.tvLocation = lines[2];
        ServerInfo.macAddress = lines[3];
    }

    return instance;
};