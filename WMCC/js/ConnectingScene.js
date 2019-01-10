var ConnectingScene = function () {
    var instance = new GameObject("Connecting Scene");
    instance.Transform.AddChild(new BlackBackground());
    instance.Transform.AddChild(new CornerTime());
    var loadingCircle = instance.Transform.AddChild(new LoadingCircle());
    var text = instance.Transform.AddChild(new TextObject());

    var i = 0;
    var commands = ["IPAddress: 192.168.254.194", "Port: 9080", "WMCC^EREFRESH|GetServerVersion<Client Quit>"];
    App.Server.Send(commands[i], OnReceiveResponse);
    App.Server.OnError = OnError;
    App.Server.OnClose = OnClose;

    function OnReceiveResponse(e) {
        if (i < commands.length - 1) {
            i++;
            App.Server.Send(commands[i], OnReceiveResponse);
            return;
        }
        loadingCircle.Enabled = false;
        ParseServerInfo(e.data);
        instance.Transform.AddChild(new TextObject(ServerInfo.Version, null, "white", "center"));

        if (!e.data.startsWith("Error"))
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