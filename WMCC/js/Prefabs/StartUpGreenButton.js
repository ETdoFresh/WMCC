var StartUpGreenButton = function () {
    var instance = new GameObject();
    instance.Base = GameObject;
    instance.Type = StartUpGreenButton;
    instance.Name = "StartUpGreenButton" + instance.Id;
    instance.Update = StartUpGreenButton.Update;
    instance.Image = instance.AddComponent(new ImageComponent("GreenButton.png"));;

    return instance;
};

StartUpGreenButton.Update = function () {
    var scaleX = App.Width / this.Image.Width * 0.1;
    var scaleY = App.Height / this.Image.Height * 0.1;
    this.Transform.X = App.Width / 2;
    this.Transform.Y = App.Height / 2;
    this.Transform.ScaleX = Math.max(scaleX, scaleY);
    this.Transform.ScaleY = Math.max(scaleX, scaleY);
};