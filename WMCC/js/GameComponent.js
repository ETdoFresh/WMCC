var GameComponent = function (name, type)
{
    var instance = AppObject(name, [GameComponent].concat(type));
    instance.GameObject = undefined;
    instance.AppUpdate = GameComponent.AppUpdate;
    instance.Draw = DoNothing;
    instance.Awake = DoNothing;
    instance.Update = DoNothing;
    instance.OnDestroy = DoNothing;
    instance.ScheduleDestroy = false;
    return instance;
};

GameComponent.AppUpdate = function (gameTime)
{
    this.Update(gameTime);
    if (this.ScheduleDestroy)
        this.Destroy();
};

GameComponent.Destroy = function ()
{
    this.OnDestroy();

    if (this.GameObject)
    {
        this.GameObject.RemoveComponent(this);
        this.GameObject = null;
    }

    for (var i in this)
        if (this.hasOwnProperty(i))
            this[i] = null;
};