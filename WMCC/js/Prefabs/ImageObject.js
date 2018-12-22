var ImageObject = function (file, position, scale) {
    var instance = new GameObject();
    instance.Base = GameObject;
    instance.Type = ImageObject;
    instance.Name = "ImageObject" + instance.Id;
    instance.Update = ImageObject.Update;
    instance.Image = instance.AddComponent(new ImageComponent(file));
    instance.ScreenPosition = position ? position : { x: 0.5, y: 0.5 };
    instance.Scale = scale ? scale : { x: 1, y: 1 };
    return instance;
};

ImageObject.Update = function () {
    var scale = Math.max(App.Width / 1920 * this.Scale.x, App.Height / 1080 * this.Scale.y);
    this.Transform.ScaleX = scale;
    this.Transform.ScaleY = scale;
    this.Transform.X = App.Width * this.ScreenPosition.x;
    this.Transform.Y = App.Height * this.ScreenPosition.y;
};