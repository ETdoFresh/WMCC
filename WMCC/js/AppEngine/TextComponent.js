var TextComponent = function (text, font, fillStyle, textAlign)
{
    var instance = new GameComponent();
    instance.Base = GameComponent;
    instance.Type = TextComponent;
    instance.Draw = TextComponent.Draw;

    instance.Name = "TextComponent" + instance.Id;
    instance.Text = text ? text : "";
    instance.Font = font ? font : "1em Arial";
    instance.FillStyle = fillStyle ? fillStyle : "black";
    instance.TextAlign = textAlign ? textAlign : "left";
    instance.Alpha = 1;

    return instance;
};

TextComponent.Draw = function (context, gameTime)
{
    if (this.Visible)
    {
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
    }

    this.Base.Draw.call(this, context, gameTime);
};