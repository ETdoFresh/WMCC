var TransformComponent = function (x, y, rotation, scaleX, scaleY)
{
    var instance = new Behaviour("TransformComponent", [TransformComponent]);
    instance.X = x ? x : 0;
    instance.Y = y ? y : 0;
    instance.Rotation = rotation ? rotation : 0;
    instance.ScaleX = scaleX ? scaleX : 1;
    instance.ScaleY = scaleY ? scaleY : 1;
    
    instance.GetContentX = TransformComponent.GetContentX;
    instance.GetContentY = TransformComponent.GetContentY;
    instance.GetContentRotation = TransformComponent.GetContentRotation;
    instance.GetContentScaleX = TransformComponent.GetContentScaleX;
    instance.GetContentScaleY = TransformComponent.GetContentScaleY;

    instance.Children = [];
    instance.AddChild = TransformComponent.AddChild;
    instance.RemoveChild = TransformComponent.RemoveChild;
    instance.GetChildByName = TransformComponent.GetChildByName;
    instance.GetChildrenByName = TransformComponent.GetChildrenByName;

    instance.AppUpdate = TransformComponent.AppUpdate;
    instance.Draw = TransformComponent.Draw;

    instance.Awake();
    return instance;
};

TransformComponent.GetContentX = function()
{
    if (this.GameObject.Parent && this.GameObject.Parent.Transform)
        return this.X + this.GameObject.Parent.Transform.GetContentX();
    else
        return this.X;
};

TransformComponent.GetContentY = function()
{
    if (this.GameObject.Parent && this.GameObject.Parent.Transform)
        return this.Y + this.GameObject.Parent.Transform.GetContentY();
    else
        return this.Y;
};

TransformComponent.GetContentRotation = function()
{
    if (this.GameObject.Parent && this.GameObject.Parent.Transform)
        return this.Rotation + this.GameObject.Parent.Transform.GetContentRotation();
    else
        return this.Rotation;
};

TransformComponent.GetContentScaleX = function()
{
    if (this.GameObject.Parent && this.GameObject.Parent.Transform)
        return this.ScaleX * this.GameObject.Parent.Transform.GetContentScaleX();
    else
        return this.ScaleX;
};

TransformComponent.GetContentScaleY = function()
{
    if (this.GameObject.Parent && this.GameObject.Parent.Transform)
        return this.ScaleY * this.GameObject.Parent.Transform.GetContentScaleY();
    else
        return this.ScaleY;
};

TransformComponent.AddChild = function (child) {
    if (child && child.Is(GameObject)) {
        this.Children.push(child);
        child.Parent = this;

        if (this.Initialized && !child.Initialized)
            child.Initialize();

        if (this.Loaded && !child.Loaded)
            child.LoadContent();

        return child;
    }
    console.log("Cannot insert component as child. Try AddComponent function!");
};

TransformComponent.RemoveChild = function (child) {
    if (child && child.GetBaseType() === GameObject) {
        for (var i = this.Children.length - 1; i >= 0; i--) {
            if (this.Children[i].Id === child.Id) {
                this.Children[i].Parent = undefined;
                this.Children.splice(i, 1);
            }
        }
    }
};

TransformComponent.GetChildByName = function (name) {
    for (var i = 0; i < this.Children.length; i++)
        if (this.Children[i].Name.indexOf(name) > -1)
            return this.Children[i];
};

TransformComponent.GetChildrenByName = function (name) {
    var children = [];
    for (var i = 0; i < this.Children.length; i++)
        if (this.Children[i].Name.indexOf(name) > -1)
            children.push(this.Children[i]);
    return children;
};

TransformComponent.AppUpdate = function (gameTime) {
    if (this.Enabled) {
        for (var i = 0; i < this.Children.length; i++)
            this.Children[i].AppUpdate.call(this.Children[i], gameTime);
    }
};

TransformComponent.Draw = function (context, gameTime) {
    if (!this.Enabled) return;

    for (var i = 0; i < this.Children.length; i++)
        if (this.Children[i].Draw)
            this.Children[i].Draw.call(this.Children[i], context, gameTime);
};