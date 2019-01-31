var RectangleComponent = function (topPercent, leftPercent, widthPercent, heightPercent, alpha, fillStyle) {
    var instance = new Behaviour("RectangleComponent", [RectangleComponent]);
    instance.TopPercent = topPercent ? topPercent : 0;
    instance.LeftPercent = leftPercent ? leftPercent : 0;
    instance.WidthPercent = widthPercent ? widthPercent : 1;
    instance.HeightPercent = heightPercent ? heightPercent : 1;
    instance.Alpha = alpha ? alpha : 1;
    instance.FillStyle = fillStyle ? fillStyle : 'black';
    instance.Draw = RectangleComponent.Draw;
    return instance;
};

RectangleComponent.Draw = function (context, gameTime) {
    if (!this.Enabled) return;
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.globalAlpha = this.Alpha;
    context.fillStyle = this.FillStyle;
    context.beginPath();
    context.fillRect(this.TopPercent * App.Width
        , this.LeftPercent * App.Height
        , this.WidthPercent * App.Width
        , this.HeightPercent * App.Height);
    context.closePath();
};