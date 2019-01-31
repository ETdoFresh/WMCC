var TVScene = function () {
    var instance = new GameObject("TV Scene");
    instance.Transform.AddChild(new BlackBackground());

    var videoPlayer = new GameObject("VideoPlayer");
    instance.Transform.AddChild(videoPlayer);
    var c = videoPlayer.AddComponent(new ScreenSizedVideoComponent([
        { src: "http://butlerccwebdev.net/support/html5-video/media/bigbuckbunnytrailer-480p.webm", type: "video/webm" }
        , { src: "http://butlerccwebdev.net/support/html5-video/media/bigbuckbunnytrailer-480p.mp4", type: "video/mp4" }
        , { src: "http://butlerccwebdev.net/support/html5-video/media/bigbuckbunnytrailer-480p.ogg", type: "video/ogg" }]));

    var play = function () { return c.Video.play(); };
    play().then().catch();
    Input.AddKeyDownListener(KeyCode.Enter, play);
    instance.OnDestroy = function () {
        Input.RemoveKeyDownListener(KeyCode.Enter, play);
    };

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