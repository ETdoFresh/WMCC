var TextObject = function (text, font, fillStyle, textAlign) {
    var instance = new GameObject();
    instance.Base = GameObject;
    instance.Type = TextObject;
    instance.Name = "TextObject" + instance.Id;
    instance.Text = text;
    instance.TextComponent = instance.AddComponent(new TextComponent(text, font, fillStyle, textAlign));

    instance.Update = TextObject.Update;

    return instance;
};

TextObject.Update = function (gameTime) {
    this.TextComponent.Text = this.Text;
    this.Transform.X = App.Width / 2;
    this.Transform.Y = App.Height / 2;
}