var GameObject = function (name, components) {
    var instance = new AppObject(name, [GameObject]);

    instance.Components = [];
    instance.AddComponent = GameObject.AddComponent;
    instance.RemoveComponent = GameObject.RemoveComponent;
    instance.GetComponent = GameObject.GetComponent;
    instance.GetComponentInChildren = GameObject.GetComponentInChildren;

    instance.AppUpdate = GameObject.AppUpdate;
    instance.Draw = GameObject.Draw;
    instance.Destroy = GameObject.Destroy;

    instance.Transform = instance.AddComponent(new TransformComponent());
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

        if (!component.WasAwake) {
            component.WasAwake = true;
            component.Awake();
        }

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
    for (var i = 0; i < this.Components.length; i++)
        if (this.Components[i].Is(type))
            return this.Components[i];
};

GameObject.GetComponentInChildren = function (type) {
    var i;
    for (i = 0; i < this.Components.length; i++)
        if (this.Components[i].Is(type))
            return this.Components[i];

    for (i = 0; i < this.Transform.Children.length; i++) {
        var component = this.Transform.Children[i].GetComponentInChildren(type);
        if (component) return component;
    }
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
        if (this.Parent.RemoveChild)
            this.Parent.RemoveChild(this);

        this.Parent = null;
    }

    for (i in this)
        if (this.hasOwnProperty(i))
            this[i] = null;
};