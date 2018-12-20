var LoadingCircle = function () {
    var instance = new GameObject();
    instance.Base = GameObject;
    instance.Type = LoadingCircle;
    instance.Name = "LoadingCircle" + instance.Id;
    instance.Update = LoadingCircle.Update;

    var circles = instance.Circles = [];
    circles.push(instance.AddChild(new Circle(0, 30)));
    circles.push(instance.AddChild(new Circle(30, 0)));
    circles.push(instance.AddChild(new Circle(0, -30)));
    circles.push(instance.AddChild(new Circle(-30, 0)));
    circles.push(instance.AddChild(new Circle(20, 20)));
    circles.push(instance.AddChild(new Circle(20, -20)));
    circles.push(instance.AddChild(new Circle(-20, 20)));
    circles.push(instance.AddChild(new Circle(-20, -20)));

    circles[0].Alpha = 0;
    circles[1].Alpha = 0.1;
    circles[2].Alpha = 0.2;
    circles[3].Alpha = 0.3;
    circles[4].Alpha = 0.4;
    circles[5].Alpha = 0.5;
    circles[6].Alpha = 0.6;
    circles[7].Alpha = 0.7;

    instance.CurrentIndex = 0;
    instance.NextRefreshTime = 0;
    instance.Duration = 1000;

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

    if (gameTime.TotalTime >= this.NextRefreshTime) {
        //this.Circles[this.CurrentIndex].Alpha = 1;
        this.CurrentIndex = (this.CurrentIndex + 1) % this.Circles.length;
        this.NextRefreshTime = gameTime.TotalTime + this.Duration;
    }
};