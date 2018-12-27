var Input = {
    KeyDown: [],

    AddKeyDownListener: function (keyCode, callback) {
        this.KeyDown.push({ keyCode: keyCode, callback: callback });
    },

    RemoveKeyDownListener: function (keyCode, callback) {
        for (var i = this.KeyDown.length - 1; i >= 0; i--)
            if (this.KeyDown[i].keyCode === keyCode && this.KeyDown[i].callback === callback)
                this.KeyDown.splice(i, 1);
    }
};

window.addEventListener("keydown", function (e) {
    for (var i = 0; i < Input.KeyDown.length; i++)
        if (Input.KeyDown[i].keyCode === e.keyCode)
            Input.KeyDown[i].callback(e);
}, false);