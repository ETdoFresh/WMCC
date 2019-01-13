var SearchScene = function () {
    var instance = new GameObject("Search Scene");
    instance.Transform.AddChild(new BlackBackground());
    instance.Transform.AddChild(new BlueBackground());

    var onUpArrow = function (e) { console.log(instance.Name + " onUpArrow"); };
    var onDownArrow = function (e) { console.log(instance.Name + " onDownArrow"); };
    var onLeftArrow = function (e) { console.log(instance.Name + " onLeftArrow"); };
    var onRightArrow = function (e) { console.log(instance.Name + " onRightArrow"); };
    var onEnter = function (e) { console.log(instance.Name + " onEnter"); };
    var onBackspace = function (e) { App.ChangeScene(MainMenuScene); };

    Input.AddKeyDownListener(KeyCode.UpArrow, onUpArrow);
    Input.AddKeyDownListener(KeyCode.DownArrow, onDownArrow);
    Input.AddKeyDownListener(KeyCode.LeftArrow, onLeftArrow);
    Input.AddKeyDownListener(KeyCode.RightArrow, onRightArrow);
    Input.AddKeyDownListener(KeyCode.Enter, onEnter);
    Input.AddKeyDownListener(KeyCode.Backspace, onBackspace);

    instance.OnDestroy = function () {
        Input.RemoveKeyDownListener(KeyCode.UpArrow, onUpArrow);
        Input.RemoveKeyDownListener(KeyCode.DownArrow, onDownArrow);
        Input.RemoveKeyDownListener(KeyCode.LeftArrow, onLeftArrow);
        Input.RemoveKeyDownListener(KeyCode.RightArrow, onRightArrow);
        Input.RemoveKeyDownListener(KeyCode.Enter, onEnter);
        Input.RemoveKeyDownListener(KeyCode.Backspace, onBackspace);
    };

    return instance;
};