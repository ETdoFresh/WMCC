var ScreenSizedImageComponent = function (filename, anchor, screenPosition, screenSize, maintainAspectRatio) {
    anchor = anchor ? anchor : { x: 0.5, y: 0.5 };
    var instance = new ImageComponent(filename, anchor.x, anchor.y);
    instance.ScreenPosition = screenPosition ? screenPosition : { x: 0.5, y: 0.5 };
    instance.ScreenSize = screenSize ? screenSize : { x: 1, y: 1 };
    instance.MaintainAspectRatio = maintainAspectRatio === null ? maintainAspectRatio : true;
    instance.Update = ScreenSizedImageComponent.Update;
    return instance;
};

ScreenSizedImageComponent.Update = function () {
    var scaleX = App.Width / this.Width * this.ScreenSize.x;
    var scaleY = App.Height / this.Height * this.ScreenSize.y;
    if (this.MaintainAspectRatio) scaleX = scaleY = Math.max(scaleX, scaleY);
    this.GameObject.Transform.ScaleX = scaleX;
    this.GameObject.Transform.ScaleY = scaleY;

    this.GameObject.Transform.X = App.Width * this.ScreenPosition.x;
    this.GameObject.Transform.Y = App.Height * this.ScreenPosition.y;
};