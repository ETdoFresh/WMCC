var GameComponent = function (name, type)
{
    var instance = AppObject(name, [GameComponent].concat(type));
    instance.GameObject = undefined;
    instance.AppUpdate = GameComponent.AppUpdate;
    instance.Draw = DoNothing;
    instance.Awake = DoNothing;
    instance.Update = DoNothing;
    instance.OnDestroy = DoNothing;

    instance.GetComponent = function (type) { return instance.GameObject.GetComponent(type); };
    instance.AddComponent = function (component) { return instance.GameObject.AddComponent(component); };
    instance.RemoveComponent = function (component) { return instance.GameObject.RemoveComponent(component); };
    instance.GetComponentInChildren = function (type) { return instance.GameObject.GetComponentInChildren(type); };
    instance.Transform = function () { return instance.GameObject.Transform; };

    instance.ScheduleDestroy = false;
    instance.WasAwake = false;
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