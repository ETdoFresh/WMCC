var TextComponent = function (text, font, fillStyle, textAlign) {
    var instance = new Behaviour("TextComponent", [TextComponent]);
    instance.Text = text ? text : "";
    instance.Font = font ? font : "1em Arial";
    instance.FillStyle = fillStyle ? fillStyle : "white";
    instance.TextAlign = textAlign ? textAlign : "left";
    instance.Alpha = 1;
    instance.Draw = TextComponent.Draw;
    return instance;
};

TextComponent.Draw = function (context, gameTime) {
    if (!this.Enabled) return;

    var x = this.GameObject.Transform.GetContentX();
    var y = this.GameObject.Transform.GetContentY();
    var scaleX = this.GameObject.Transform.GetContentScaleX();
    var scaleY = this.GameObject.Transform.GetContentScaleY();

    context.setTransform(scaleX, 0, 0, scaleY, x, y);
    context.rotate(this.GameObject.Transform.Rotation);
    context.globalAlpha = this.Alpha;
    context.font = this.Font;
    context.fillStyle = this.FillStyle;
    context.textAlign = this.TextAlign;
    context.fillText(this.Text, 0, 0);
};