var Input = function () {
    var instance = {};
    var keyDown = [];
    //var keyPress = [];
    //var keyUp = [];

    instance.AddKeyDownListener = function (keyCode, callback) {
        keyDown.push({ keyCode: keyCode, callback: callback });
    };

    instance.RemoveKeyDownListener = function (keyCode, callback) {
        for (var i = keyDown.length - 1; i >= 0; i--)
            if (keyDown[i].keyCode === keyCode && keyDown[i].callback === callback)
                keyDown.splice(i, 1);
    };

    window.addEventListener("keydown", function (e) {
        for (var i = 0; i < keyDown.length; i++)
            if (keyDown[i].keyCode === e.keyCode)
                keyDown[i].callback(e);
    }, false);

    ////window.addEventListener("keypress", OnKeyDownListener, false);
    ////window.addEventListener("keyup", OnKeyDownListener, false);

    return instance;
};

Input = new Input();