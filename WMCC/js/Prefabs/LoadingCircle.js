var LoadingCircle = function () {
    var instance = new GameObject();
    instance.Base = GameObject;
    instance.Name = "LoadingCircle" + instance.Id;
    instance.Update = LoadingCircle.Update;

    //var circles = [new CircleComponent()];
    //for (var circle in circles)
    instance.AddChild(new Circle(0, 30));
    instance.AddChild(new Circle(30, 0));
    instance.AddChild(new Circle(0, -30));
    instance.AddChild(new Circle(-30, 0));

    instance.Update();

    return instance;
};

LoadingCircle.Update = function (gameTime) {
    var scaleX = App.Width / 1920;
    var scaleY = App.Height / 1080;
    this.Transform.ScaleX = Math.max(scaleX, scaleY);
    this.Transform.ScaleY = Math.max(scaleX, scaleY);
    this.Transform.X = App.Width / 2;
    this.Transform.Y = App.Height / 2;
    this.Transform.Rotation = (this.Transform.Rotation + 1) % 360;
};