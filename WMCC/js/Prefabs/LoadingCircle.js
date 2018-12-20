var LoadingCircle = function () {
    var instance = new GameObject();
    instance.Base = GameObject;
    instance.Name = "LoadingCircle" + instance.Id;
    instance.Update = LoadingCircle.Update;

    instance.AddComponent(new ImageComponent("Loading.gif"));
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
};