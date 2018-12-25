var TextObject = function (text, font, fillStyle, textAlign) {
    var instance = new GameObject();
    instance.Base = GameObject;
    instance.Type = TextObject;
    instance.Name = "TextObject" + instance.Id;
    instance.Text = text;
    instance.TextComponent = instance.AddComponent(new TextComponent(text, font, fillStyle, textAlign));
    instance.ScreenPosition = { x: 0.5, y: 0.5 };

    instance.Update = TextObject.Update;

    return instance;
};

TextObject.Update = function (gameTime) {
    this.TextComponent.Text = this.Text;
    var scale = Math.max(App.Width / 1920, App.Height / 1080);
    this.Transform.ScaleX = scale;
    this.Transform.ScaleY = scale;
    this.Transform.X = App.Width * this.ScreenPosition.x;
    this.Transform.Y = App.Height * this.ScreenPosition.y;
};