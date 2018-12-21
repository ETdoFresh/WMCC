var BlueBackground = function ()
{
    var instance = new GameObject();
    instance.Base = GameObject;
    instance.Type = BlueBackground;
    instance.Name = "BlueBackground" + instance.Id;
    instance.Update = BlueBackground.Update;
    instance.Image = instance.AddComponent(new ImageComponent("Background.png"));

    return instance;
};

BlueBackground.Update = function ()
{
    var scaleX = App.Width / this.Image.Width;
    var scaleY = App.Height / this.Image.Height;
    this.Transform.X = App.Width / 2;
    this.Transform.Y = App.Height / 2;
    this.Transform.ScaleX = Math.max(scaleX, scaleY);
    this.Transform.ScaleY = Math.max(scaleX, scaleY);
};