var ScreenFitImageComponent = function (filename, anchorX, anchorY) {
    var instance = new ImageComponent(filename, anchorX, anchorY);
    instance.Update = ScreenFitImageComponent.Update;
    return instance;
};

ScreenFitImageComponent.Update = function () {
    var scaleX = App.Width / this.Width;
    var scaleY = App.Height / this.Height;
    this.GameObject.Transform.X = App.Width / 2;
    this.GameObject.Transform.Y = App.Height / 2;
    this.GameObject.Transform.ScaleX = Math.max(scaleX, scaleY);
    this.GameObject.Transform.ScaleY = Math.max(scaleX, scaleY);
};