var BlueBackground = function (parent)
{
    var instance = new GameObject();
    instance.Base = GameObject;
    instance.Name = "BlueBackground" + instance.Id;
    instance.Initialize = BlueBackground.Initialize;
    instance.Update = BlueBackground.Update;

    instance.image = undefined;

    return instance;
};

BlueBackground.Initialize = function ()
{
    this.Base.Initialize.call(this);
    this.image = this.AddComponent(new ImageComponent("Background.png"));
};

BlueBackground.Update = function ()
{
    var scaleX = App.Width / this.image.Width;
    var scaleY = App.Height / this.image.Height;
    this.Transform.X = App.Width / 2;
    this.Transform.Y = App.Height / 2;
    this.Transform.ScaleX = Math.max(scaleX, scaleY);
    this.Transform.ScaleY = Math.max(scaleX, scaleY);
};