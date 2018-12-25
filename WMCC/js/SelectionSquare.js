var SelectionSquare = function ()
{
    var instance = new GameObject();
    instance.Base = GameObject;
    instance.Type = SelectionSquare;
    instance.Name = "SelectionSquare" + instance.Id;
    instance.Update = SelectionSquare.Update;
    instance.Image = instance.AddComponent(new ImageComponent("selection.png"));

    return instance;
};

SelectionSquare.Update = function ()
{
    var scaleX = App.Width / this.Image.Width * 0.15;
    var scaleY = App.Height / this.Image.Height * 0.15;
    this.Transform.X = App.Width / 4;
    this.Transform.Y = App.Height / 4 * 2.5;
    this.Transform.ScaleX = Math.max(scaleX, scaleY);
    this.Transform.ScaleY = Math.max(scaleX, scaleY);
};