var ImageComponent = function (filename, anchorX, anchorY) {
    var instance = new GameComponent();
    instance.Base = GameComponent;
    instance.Type = ImageComponent;

    instance.Name = "ImageComponent(" + filename + ")" + instance.Id;
    instance.Filename = filename;
    instance.Image = undefined;
    instance.Width = 0;
    instance.Height = 0;
    instance.AnchorX = anchorX >= 0 ? anchorX : 0.5;
    instance.AnchorY = anchorY >= 0 ? anchorY : 0.5;
    instance.Alpha = 1;

    instance.LoadContent = ImageComponent.LoadContent;
    instance.Draw = ImageComponent.Draw;
    instance.Destroy = ImageComponent.Destroy;

    return instance;
};

ImageComponent.LoadContent = function () {
    this.Image = new Image();
    this.Image.src = this.Filename;
    this.Base.LoadContent.call(this);

    var that = this;
    this.Image.onload = function (ev) {
        that.Width = that.Image.width;
        that.Height = that.Image.height;
    };
};

ImageComponent.Draw = function (context, gameTime) {
    if (!this.Enabled || !this.Visible) return;

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

    this.Base.Draw.call(this, context, gameTime);
};

ImageComponent.Destroy = function () {
    this.Image.onload = null;
    this.Base.Destroy.call(this);
};