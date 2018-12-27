var LoadingCircleComponent = function () {
    var instance = new Behaviour("LoadingCircleComponent");
    instance.Update = LoadingCircleComponent.Update;
    instance.Awake = LoadingCircleComponent.Awake;
    instance.Circles = [];
    instance.CurrentIndex = 0;
    instance.NextRefreshTime = 0;
    instance.Duration = 100;
    return instance;
};

LoadingCircleComponent.Awake = function () {
    var circles = this.Circles;
    circles.push(this.GameObject.Transform.AddChild(new Circle(0, -30)));
    circles.push(this.GameObject.Transform.AddChild(new Circle(20, -20)));
    circles.push(this.GameObject.Transform.AddChild(new Circle(30, 0)));
    circles.push(this.GameObject.Transform.AddChild(new Circle(20, 20)));
    circles.push(this.GameObject.Transform.AddChild(new Circle(0, 30)));
    circles.push(this.GameObject.Transform.AddChild(new Circle(-20, 20)));
    circles.push(this.GameObject.Transform.AddChild(new Circle(-30, 0)));
    circles.push(this.GameObject.Transform.AddChild(new Circle(-20, -20)));

    for (var i = 0; i < circles.length; i++)
        circles[i].Alpha = 0.1;
};

LoadingCircleComponent.Update = function (gameTime) {
    var transform = this.GameObject.Transform;
    var scaleX = App.Width / 1920;
    var scaleY = App.Height / 1080;
    transform.ScaleX = Math.max(scaleX, scaleY);
    transform.ScaleY = Math.max(scaleX, scaleY);
    transform.X = App.Width / 2;
    transform.Y = App.Height / 2;

    for (var i = 0; i < this.Circles.length; i++)
        this.Circles[i].GameObject.Image.Alpha = Math.max(this.Circles[i].GameObject.Image.Alpha - gameTime.DeltaTime / this.Duration / 8, 0);

    if (gameTime.TotalTime >= this.NextRefreshTime) {
        this.Circles[this.CurrentIndex].GameObject.Image.Alpha = 1;
        this.CurrentIndex = (this.CurrentIndex + 1) % this.Circles.length;
        this.NextRefreshTime = gameTime.TotalTime + this.Duration;
    }
};