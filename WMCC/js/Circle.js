var Circle = function (x, y, radius, fillStyle) {
    var instance = new GameObject("Circle");
    instance.Image = instance.AddComponent(new CircleComponent(radius, fillStyle));
    instance.Transform.X = x ? x : 0;
    instance.Transform.Y = y ? y : 0;
    return instance;
};