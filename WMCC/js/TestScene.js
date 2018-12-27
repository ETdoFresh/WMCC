var TestScene = function () {
    var instance = new GameObject("Test Scene");
    //App.ChangeScene(ConnectingScene);

    instance.Transform.AddChild(new BlackBackground());

    var videoPlayer = new GameObject("VideoPlayer");
    instance.Transform.AddChild(videoPlayer);
    var c = videoPlayer.AddComponent(new ScreenSizedVideoComponent([
        { src: "http://butlerccwebdev.net/support/html5-video/media/bigbuckbunnytrailer-480p.webm", type: "video/webm" }
        , { src: "http://butlerccwebdev.net/support/html5-video/media/bigbuckbunnytrailer-480p.mp4", type: "video/mp4" }
        , { src: "http://butlerccwebdev.net/support/html5-video/media/bigbuckbunnytrailer-480p.ogg", type: "video/ogg" }]));

    var play = function () { c.Video.play(); };
    Input.AddKeyDownListener(KeyCode.Enter, play);
    instance.OnDestroy = function () { Input.RemoveKeyDownListener(KeyCode.Enter, play); };
    return instance;
};