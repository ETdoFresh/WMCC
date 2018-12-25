var ScreenPositionedImageComponent = function (filename, anchor, screenPosition) {
    anchor = anchor ? anchor : { x: 0.5, y: 0.5 };
    var instance = new ImageComponent(filename, anchor.x, anchor.y);
    instance.ScreenPosition = screenPosition ? screenPosition : { x: 0.5, y: 0.5 };
    instance.Update = ScreenPositionedImageComponent.Update;
    return instance;
};

ScreenPositionedImageComponent.Update = function () {
    this.GameObject.Transform.X = App.Width * this.ScreenPosition.x;
    this.GameObject.Transform.Y = App.Height * this.ScreenPosition.y;
};