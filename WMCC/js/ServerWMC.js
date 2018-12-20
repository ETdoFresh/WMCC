var ServerWMC =
{
    /** @type {WebSocket} **/ Connection: undefined,
    /** @type {string} **/ Host: "localhost",
    /** @type {int} **/ Port: "9081",

    GetConnection: function () { /** @returns {WebSocket} **/
        if (this.Connection === undefined) {
            this.Connection = new WebSocket('ws://' + this.Host + ':' + this.Port);
            this.Connection.onmessage = this.OnReceive;
            return this.Connection;
        }
        else
            return this.Connection;
    },

    Send: function (data) {
        var connection = this.GetConnection();
        if (connection.readyState === connection.OPEN)
            connection.send(data);
        else {
            var previousOnOpen = function () { };
            if (typeof connection.onopen === "function")
                previousOnOpen = connection.onopen;

            connection.onopen = function () {
                previousOnOpen();
                connection.send(data);
            };
        }
    },

    OnReceive: function (e) {
        console.log(e.data);
    }
};