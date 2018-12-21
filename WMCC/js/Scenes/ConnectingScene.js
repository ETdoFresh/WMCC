var ConnectingScene = function () {
    var instance = new GameObject("Logo Scene");
    instance.Base = GameObject;
    instance.Type = ConnectingScene;

    instance.AddChild(new BlackBackground());
    instance.AddChild(new CornerTime());
    var loadingCircle = instance.AddChild(new LoadingCircle());
    var text = instance.AddChild(new TextObject("", null, null, "center"));

    ServerWMC.Send("WMCC^EREFRESH|GetServerVersion<Client Quit>", OnReceiveResponse);
    ServerWMC.OnError = OnError;
    ServerWMC.OnClose = OnClose;

    function OnReceiveResponse(e) {
        loadingCircle.Enabled = false;
        ParseServerInfo(e.data);
        instance.AddChild(new TextObject(ServerInfo.Version, null, "white", "center"));
        App.ChangeScene(StartUpScene, true);
    }

    function OnError(e) {
        loadingCircle.Enabled = false;
        text.Text = "There was an error with the WebSocket.";
    }

    function OnClose(e) {
        loadingCircle.Enabled = false;
        text.Text = WebSocket2.ErrorCodes[e.code];
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