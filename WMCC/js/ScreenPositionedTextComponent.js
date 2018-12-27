var ScreenPositionedTextComponent = function (text, screenPosition, font, fillStyle, textAlign, scale) {
    var instance = new TextComponent(text, font, fillStyle, textAlign);
    instance.ScreenPosition = screenPosition ? screenPosition : { x: 0.5, y: 0.5 };
    instance.Scale = scale ? scale : Scale.UniformMax;
    instance.Update = ScreenPositionedTextComponent.Update;
    return instance;
};

ScreenPositionedTextComponent.Update = function (gameTime) {
    this.Text = this.Text;
    var scaleX = App.Width / 1920;
    var scaleY = App.Height / 1080;
    if (this.Scale === Scale.UniformMax) scaleX = scaleY = Math.max(scaleX, scaleY);
    if (this.Scale === Scale.UniformFit) scaleX = scaleY = Math.min(scaleX, scaleY);
    this.GameObject.Transform.ScaleX = scaleX;
    this.GameObject.Transform.ScaleY = scaleY;
    this.GameObject.Transform.X = App.Width * this.ScreenPosition.x;
    this.GameObject.Transform.Y = App.Height * this.ScreenPosition.y;
};