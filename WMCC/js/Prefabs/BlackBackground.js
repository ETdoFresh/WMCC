var BlackBackground = function ()
{
    var instance = new GameObject();
    instance.Base = GameObject;
    instance.Name = "BlackBackground" + instance.Id;
    instance.Draw = BlackBackground.Draw;
    return instance;
};

BlackBackground.Draw = function (context, gameTime)
{
    context.save();
    context.fillStyle = 'black';
    context.fillRect(0, 0, App.Width, App.Height);
    context.restore();
};