var Behaviour = function (name, type) {
    var instance = new GameComponent(name, [Behaviour].concat(type));

    instance.OnEnable = DoNothing;
    instance.Start = DoNothing;
    instance.Update = DoNothing;
    instance.OnDisable = DoNothing;
    instance.OnDestroy = DoNothing;

    instance.Enabled = true;
    var OnEnableEvent = false;
    var OnStartEvent = false;
    var OnDisableEvent = false;

    instance.AppUpdate = function (gameTime) {
        if (instance.Enabled && !OnEnableEvent) {
            OnEnableEvent = true;
            OnDisableEvent = false;
            instance.OnEnable();
        }
        if (instance.Enabled && !OnStartEvent) {
            OnStartEvent = true;
            instance.Start();
        }
        if (!instance.Enabled && !OnDisableEvent) {
            OnEnableEvent = false;
            OnDisableEvent = true;
            instance.OnDisable();
        }

        instance.Update(gameTime);

        if (instance.ScheduleDestroy)
            instance.Destroy();
    };

    return instance;
};