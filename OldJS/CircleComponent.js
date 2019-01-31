var CircleComponent = function (radius, fillStyle) {
    var instance = new Behaviour("CircleComponent", [CircleComponent]);
    instance.Draw = CircleComponent.Draw;
    instance.Radius = radius ? radius : 7;
    instance.FillStyle = fillStyle ? fillStyle : 'white';
    instance.Alpha = 1;
    return instance;
};

CircleComponent.Draw = function (context, gameTime) {
    var transform = this.GameObject.Transform;
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