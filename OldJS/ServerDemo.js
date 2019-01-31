var ServerDemo = function () {
    var instance = {};
    instance.Host = "ServerName";
    instance.Port = "9999";
    instance.Connection = undefined;

    instance.Responses = {
        "WMCC^EREFRESH|GetServerVersion<Client Quit>":
            "1.0.0.63, build: 1255<EOL>1255<EOL>smb://192.168.254.194/Users/Public/Recorded TV<EOL>14:FE:B5:B9:41:4E<EOL><EOF>",
    };

    instance.Send = function (data, callback) {
        if (!instance.Connection) {
            console.log("Connection Complete!\n\nConnection Message goes here!\n");
            instance.Connection = true;
        }

        if (instance.Responses.hasOwnProperty(data)) {
            console.log(instance.Responses[data]);
            callback({ data: instance.Responses[data] });
        }
        else {
            console.log(data);
            callback({ data: data });
        }
    };
    return instance;
};