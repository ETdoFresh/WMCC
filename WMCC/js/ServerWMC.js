var ServerWMC =
{
    /** @type {WebSocket} **/ Connection = undefined,
    /** @type {string} **/ IPAddress = undefined,
    /** @type {int} **/ Port = undefined,

    GetConnection: function () { /** @returns {WebSocket} **/
        if (this.Connection == undefined) {
            this.Connection = new WebSocket('ws://' + this.IPAddress + ':' + this.Port);
            this.Connection.onmessage = this.OnReceive;
        }
        else
            return this.Connection;
    },

    Send: function (data) {
        this.GetConnection().send(data);
    },

    OnReceive: function (e) {
        console.log(e.data);
    }
};