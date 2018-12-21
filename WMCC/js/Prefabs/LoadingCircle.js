var LoadingCircle = function () {
    var instance = new GameObject();
    instance.Base = GameObject;
    instance.Type = LoadingCircle;
    instance.Name = "LoadingCircle" + instance.Id;
    instance.Update = LoadingCircle.Update;

    var circles = instance.Circles = [];
    circles.push(instance.AddChild(new Circle(0, -30)));
    circles.push(instance.AddChild(new Circle(20, -20)));
    circles.push(instance.AddChild(new Circle(30, 0)));
    circles.push(instance.AddChild(new Circle(20, 20)));
    circles.push(instance.AddChild(new Circle(0, 30)));
    circles.push(instance.AddChild(new Circle(-20, 20)));
    circles.push(instance.AddChild(new Circle(-30, 0)));
    circles.push(instance.AddChild(new Circle(-20, -20)));

    for (var i = 0; i < circles.length; i++)
        circles[i].Alpha = 0.1;

    instance.CurrentIndex = 0;
    instance.NextRefreshTime = 0;
    instance.Duration = 100;

    instance.Update(App.Time);

    return instance;
};

LoadingCircle.Update = function (gameTime) {
    var scaleX = App.Width / 1920;
    var scaleY = App.Height / 1080;
    this.Transform.ScaleX = Math.max(scaleX, scaleY);
    this.Transform.ScaleY = Math.max(scaleX, scaleY);
    this.Transform.X = App.Width / 2;
    this.Transform.Y = App.Height / 2;

    for (var i = 0; i < this.Circles.length; i++)
        this.Circles[i].Alpha = Math.max(this.Circles[i].Alpha - gameTime.DeltaTime / this.Duration / 8, 0);

    if (gameTime.TotalTime >= this.NextRefreshTime) {
        this.Circles[this.CurrentIndex].Alpha = 1;
        this.CurrentIndex = (this.CurrentIndex + 1) % this.Circles.length;
        this.NextRefreshTime = gameTime.TotalTime + this.Duration;
    }
};