var Circle = function (x, y, radius, fillStyle) {
    var instance = new GameObject();
    instance.Base = GameObject;
    instance.Name = "Circle" + instance.Id;
    instance.Draw = Circle.Draw;

    instance.Transform.X = x ? x : 0;
    instance.Transform.Y = y ? y : 0;
    instance.Radius = radius ? radius : 10;
    instance.FillStyle = fillStyle ? fillStyle : 'white';

    return instance;
};

Circle.Draw = function (context, gameTime) {
    var transform = this.Transform;
    var x = transform.GetContentX();
    var y = transform.GetContentY();
    var radius = this.Radius * transform.GetContentScaleX();
    context.save();
    context.translate(x, y);
    context.fillStyle = this.FillStyle;
    context.arc(0, 0, radius, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.restore();
}