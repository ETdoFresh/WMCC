var ServerWMC =
{
    /** @type {WebSocket} **/ Connection: undefined,
    /** @type {string} **/ Host: "localhost",
    /** @type {int} **/ Port: "9081",
    Queue: new Queue(),
    AwaitingMessage: false,

    /** @returns {WebSocket} **/
    GetConnection: function () {
        if (ServerWMC.Connection === undefined) {
            ServerWMC.Connection = new WebSocket('ws://' + ServerWMC.Host + ':' + ServerWMC.Port);
            ServerWMC.AwaitingMessage = true;
            ServerWMC.Connection.onmessage = ServerWMC.OnReceive;
            return ServerWMC.Connection;
        }
        else
            return ServerWMC.Connection;
    },

    Send: function (data, callback) {
        var connection = ServerWMC.GetConnection();

        if (ServerWMC.AwaitingMessage) {
            ServerWMC.Queue.Enqueue([data, callback]);
            return;
        }

        if (connection.readyState === connection.OPEN) {
            this.AwaitingMessage = true;
            connection.send(data);
            connection.onmessage = function (e) { ServerWMC.OnReceive(e); if (callback) callback(e); };
        }
        else {
            var previousOnOpen = function () { };
            if (typeof connection.onopen === "function") previousOnOpen = connection.onopen;

            connection.onopen = function () {
                previousOnOpen();
                this.AwaitingMessage = true;
                connection.onmessage = function (e) { ServerWMC.OnReceive(e); if (callback) callback(e); };
                connection.send(data);
            };
        }
    },

    OnReceive: function (e) {
        if (ServerWMC.AwaitingMessage) {
            ServerWMC.AwaitingMessage = false;
            if (ServerWMC.Queue.Count() > 0) {
                var item = ServerWMC.Queue.Dequeue();
                ServerWMC.Send(item[0], item[1]);
            }
        }
        console.log(e.data);
    }
};