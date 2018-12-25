var ScreenPositionedTextComponent = function (text, screenPosition, font, fillStyle, textAlign) {
    var instance = new TextComponent(text, font, fillStyle, textAlign);
    instance.ScreenPosition = screenPosition ? screenPosition : { x: 0.5, y: 0.5 };
    instance.Update = ScreenPositionedTextComponent.Update;
    return instance;
};

ScreenPositionedTextComponent.Update = function (gameTime) {
    this.Text = this.Text;
    var scale = Math.max(App.Width / 1920, App.Height / 1080);
    this.GameObject.Transform.ScaleX = scale;
    this.GameObject.Transform.ScaleY = scale;
    this.GameObject.Transform.X = App.Width * this.ScreenPosition.x;
    this.GameObject.Transform.Y = App.Height * this.ScreenPosition.y;
};