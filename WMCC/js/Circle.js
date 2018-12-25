var Circle = function (x, y, radius, fillStyle) {
    var instance = new GameObject();
    instance.Base = GameObject;
    instance.Type = Circle;
    instance.Name = "Circle" + instance.Id;
    instance.Draw = Circle.Draw;

    instance.Transform.X = x ? x : 0;
    instance.Transform.Y = y ? y : 0;
    instance.Radius = radius ? radius : 7;
    instance.FillStyle = fillStyle ? fillStyle : 'white';
    instance.Alpha = 1;

    return instance;
};

Circle.Draw = function (context, gameTime) {
    var transform = this.Transform;
    var x = transform.GetContentX();
    var y = transform.GetContentY();
    var radius = this.Radius * transform.GetContentScaleX();
    context.setTransform(radius, 0, 0, radius, x, y);
    context.fillStyle = this.FillStyle;
    context.globalAlpha = this.Alpha;
    context.beginPath();
    context.arc(0, 0, 1, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
};