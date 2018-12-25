var ImageComponent = function (filename, anchorX, anchorY) {
    var instance = new Behaviour("ImageComponent", [ImageComponent]);
    instance.Filename = filename;
    instance.Width = 0;
    instance.Height = 0;
    instance.AnchorX = anchorX >= 0 ? anchorX : 0.5;
    instance.AnchorY = anchorY >= 0 ? anchorY : 0.5;
    instance.Alpha = 1;

    instance.Draw = ImageComponent.Draw;

    instance.Image = new Image();
    instance.Image.src = filename;
    instance.Image.onload = function (ev) {
        instance.Width = instance.Image.width;
        instance.Height = instance.Image.height;
        instance.Image.onload = null;
    };

    return instance;
};

ImageComponent.Draw = function (context, gameTime) {
    if (!this.Enabled) return;

    var image = this.Image;
    var x = this.GameObject.Transform.GetContentX();
    var y = this.GameObject.Transform.GetContentY();
    var scaleX = this.GameObject.Transform.GetContentScaleX();
    var scaleY = this.GameObject.Transform.GetContentScaleY();
    var drawX = -this.Width * this.AnchorX;
    var drawY = -this.Height * this.AnchorY;
    context.setTransform(scaleX, 0, 0, scaleY, x, y);
    context.rotate(this.GameObject.Transform.GetContentRotation());
    context.globalAlpha = this.Alpha;
    context.drawImage(image, drawX, drawY);
};