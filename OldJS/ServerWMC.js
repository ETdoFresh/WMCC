var ServerWMC = function()
{
    var instance = {};

    instance.Connection = undefined;
    instance.Host = "localhost";
    instance.Port = "9081";
    instance.Queue = new Queue();
    instance.AwaitingMessage = false;

    instance.GetConnection = function () {
        if (instance.Connection === undefined) {
            instance.Connection = new WebSocket('ws://' + instance.Host + ':' + instance.Port);
            instance.AwaitingMessage = true;
            instance.Connection.onmessage = instance.OnReceive;
            instance.Connection.onerror = function (e) { instance.OnError(e); };
            instance.Connection.onclose = function (e) { instance.OnClose(e); };
            return instance.Connection;
        }
        else
            return instance.Connection;
    };

    instance.Send = function (data, callback) {
        var connection = instance.GetConnection();

        if (instance.AwaitingMessage) {
            instance.Queue.Enqueue([data, callback]);
            return;
        }

        if (connection.readyState === connection.OPEN) {
            this.AwaitingMessage = true;
            connection.send(data);
            connection.onmessage = function (e) { instance.OnReceive(e); if (callback) callback(e); };
        }
        else {
            var previousOnOpen = function () { };
            if (typeof connection.onopen === "function") previousOnOpen = connection.onopen;

            connection.onopen = function () {
                previousOnOpen();
                this.AwaitingMessage = true;
                connection.onmessage = function (e) { instance.OnReceive(e); if (callback) callback(e); };
                connection.send(data);
            };
        }
    };

    instance.OnReceive = function (e) {
        if (instance.AwaitingMessage) {
            instance.AwaitingMessage = false;
            if (instance.Queue.Count() > 0) {
                var item = instance.Queue.Dequeue();
                instance.Send(item[0], item[1]);
            }
        }
        console.log(e.data);
    };

    instance.OnError = function (e) { };
    instance.OnClose = function (e) { };

    return instance;
};