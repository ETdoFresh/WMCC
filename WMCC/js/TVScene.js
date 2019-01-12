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
    return instance;
};