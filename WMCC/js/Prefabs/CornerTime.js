var CornerTime = function (color)
{
    var instance = new GameObject();
    instance.Base = GameObject;
    instance.Name = "CornerTime" + instance.Id;
    instance.Update = CornerTime.Update;

    instance.Text = instance.AddComponent(new TextComponent("00:00 AM", "30px Arial", "white", "right"));
    instance.Update();

    return instance;
};

CornerTime.Update = function (gameTime) {
    var scaleX = App.Width / 1920;
    var scaleY = App.Height / 1080;
    var fontSize = Math.max(scaleX, scaleY) * 30;
    var xOffset = Math.max(scaleX, scaleY) * 40;
    var yOffset = Math.max(scaleX, scaleY) * 30;
    this.Text.Font = fontSize + "px Arial";
    this.Transform.X = App.Width / 2 - xOffset;
    this.Transform.Y = yOffset;
}