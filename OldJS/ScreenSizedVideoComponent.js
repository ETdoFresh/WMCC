var ScreenSizedVideoComponent = function (videos, anchor, screenPosition, screenSize, scale) {
    anchor = anchor ? anchor : { x: 0.5, y: 0.5 };
    var instance = new VideoComponent(videos, anchor);
    instance.ScreenPosition = screenPosition ? screenPosition : { x: 0.5, y: 0.5 };
    instance.ScreenSize = screenSize ? screenSize : { x: 1, y: 1 };
    instance.Scale = scale ? scale : Scale.Nonuniform;
    instance.Update = ScreenSizedVideoComponent.Update;
    return instance;
};

ScreenSizedVideoComponent.Update = function () {
    var scaleX = App.Width / this.Video.videoWidth * this.ScreenSize.x;
    var scaleY = App.Height / this.Video.videoHeight * this.ScreenSize.y;
    if (this.Scale === Scale.UniformMax) scaleX = scaleY = Math.max(scaleX, scaleY);
    if (this.Scale === Scale.UniformFit) scaleX = scaleY = Math.min(scaleX, scaleY);
    this.GameObject.Transform.ScaleX = scaleX;
    this.GameObject.Transform.ScaleY = scaleY;

    this.GameObject.Transform.X = App.Width * this.ScreenPosition.x;
    this.GameObject.Transform.Y = App.Height * this.ScreenPosition.y;
};