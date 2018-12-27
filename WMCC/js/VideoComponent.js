var VideoComponent = function (videos, anchor) {
    var instance = Behaviour("VideoPlayerComponent", [VideoComponent]);
    instance.Anchor = anchor ? anchor : { x: 0, y: 0 };
    instance.Alpha = 1;
    instance.Draw = VideoComponent.Draw;

    var video = document.getElementsByTagName("video")[0];
    if (!video) video = document.createElement("video");

    for (var i = 0; i < videos.length; i++)
    {
        var source = document.createElement("source");
        source.src = videos[i].src;
        source.type = videos[i].type;
        video.appendChild(source);
    }

    instance.Video = video;

    return instance;
};

VideoComponent.Draw = function (context, gameTime) {
    if (!this.Enabled) return;

    var video = this.Video;
    var x = this.GameObject.Transform.GetContentX();
    var y = this.GameObject.Transform.GetContentY();
    var scaleX = this.GameObject.Transform.GetContentScaleX();
    var scaleY = this.GameObject.Transform.GetContentScaleY();
    var drawX = -video.videoWidth * this.Anchor.x;
    var drawY = -video.videoHeight * this.Anchor.y;
    context.setTransform(scaleX, 0, 0, scaleY, x, y);
    context.rotate(this.GameObject.Transform.GetContentRotation());
    context.globalAlpha = this.Alpha;
    context.drawImage(video, drawX, drawY);
};