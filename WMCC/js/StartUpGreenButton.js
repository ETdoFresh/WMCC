var StartUpGreenButton = function () {
    var instance = new GameObject();
    instance.Base = GameObject;
    instance.Type = StartUpGreenButton;
    instance.Name = "StartUpGreenButton" + instance.Id;
    instance.Update = StartUpGreenButton.Update;
    instance.Image = instance.AddComponent(new ImageComponent("GreenButton.png"));

    return instance;
};

StartUpGreenButton.Update = function () {
    this.Transform.X = App.Width / 2;
    this.Transform.Y = App.Height / 2;
};