var GameObject = function (name, parent, components) {
    var instance = new AppObject(name, [GameObject]);
    instance.Parent = parent ? parent : App.Scene;

    instance.Components = [];
    instance.AddComponent = GameObject.AddComponent;
    instance.RemoveComponent = GameObject.RemoveComponent;
    instance.GetComponent = GameObject.GetComponent;

    instance.AppUpdate = GameObject.AppUpdate;
    instance.Draw = GameObject.Draw;
    instance.Destroy = GameObject.Destroy;

    instance.Transform = instance.AddComponent(new TransformComponent(instance));
    instance.Enabled = true;
    instance.ScheduleDestroy = false;

    if (components)
        for (var i = 0; i < components.length; i++)
            instance.AddComponent(components[i]);

    return instance;
};

GameObject.AddComponent = function (component) {
    if (component && component.Is(GameComponent)) {
        this.Components.push(component);
        component.GameObject = this;
        component.Name = this.Name + "_" + component.Name;

        if (this.Initialized && !component.Initialized)
            component.Initialize();

        if (this.Loaded && !component.Loaded)
            component.LoadContent();

        return component;
    }

    console.log("Error: AddComponent(" + component + ")");
};

GameObject.RemoveComponent = function (component) {

    if (component && component.GetBaseType() === GameComponent) {
        for (var i = this.Components.length - 1; i >= 0; i--) {
            if (this.Components[i].Id === component.Id) {
                this.Components[i].GameObject = undefined;
                this.Components.splice(i, 1);
            }
        }

        return component;
    }
    console.log("Error: RemoveComponent(" + component + ")");
};

GameObject.GetComponent = function (type) {
    for (var i = this.Components.length - 1; i >= 0; i--)
        if (this.Components[i].GetType() === type)
            return this.Components[i];
};

GameObject.AppUpdate = function (gameTime) {
    if (this.Enabled) {
        for (var i = 0; i < this.Components.length; i++)
            this.Components[i].AppUpdate.call(this.Components[i], gameTime);
    }

    if (this.ScheduleDestroy)
        this.Destroy();
};

GameObject.Draw = function (context, gameTime) {
    if (!this.Enabled) return;

    for (var i = 0; i < this.Components.length; i++)
        if (this.Components[i].Draw)
            this.Components[i].Draw.call(this.Components[i], context, gameTime);
};

GameObject.Destroy = function () {
    this.OnDestroy();

    if (this.Components) {
        for (i = this.Components.length - 1; i >= 0; i--)
            this.Components[i].Destroy();

        this.Components = null;
    }

    if (this.Parent) {
        this.Parent.RemoveChild(this);
        this.Parent = null;
    }

    for (i in this)
        if (this.hasOwnProperty(i))
            this[i] = null;
};