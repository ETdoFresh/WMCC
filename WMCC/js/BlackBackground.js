var BlackBackground = function ()
{
    var instance = new GameObject();
    instance.Base = GameObject;
    instance.Type = BlackBackground;
    instance.Name = "BlackBackground" + instance.Id;
    instance.Draw = BlackBackground.Draw;
    return instance;
};

BlackBackground.Draw = function (context, gameTime)
{
    if (!this.Enabled || !this.Visible) return;
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.globalAlpha = 1;
    context.fillStyle = 'black';
    context.beginPath();
    context.fillRect(0, 0, App.Width, App.Height);
    context.closePath();
};