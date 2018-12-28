var TransformComponent = function (x, y, rotation, scaleX, scaleY) {
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
    instance.Parent = App.Scene;
    instance.AddChild = TransformComponent.AddChild;
    instance.RemoveChild = TransformComponent.RemoveChild;
    instance.GetChildByName = TransformComponent.GetChildByName;
    instance.GetChildrenByName = TransformComponent.GetChildrenByName;
    instance.OnDestroy = TransformComponent.OnDestroy;

    instance.AppUpdate = TransformComponent.AppUpdate;
    instance.Draw = TransformComponent.Draw;

    instance.Awake();
    return instance;
};

TransformComponent.GetContentX = function () {
    if (this.Parent && this.Parent.GetContentX)
        return this.X + this.Parent.GetContentX();
    else
        return this.X;
};

TransformComponent.GetContentY = function () {
    if (this.Parent && this.Parent.GetContentY)
        return this.Y + this.Parent.GetContentY();
    else
        return this.Y;
};

TransformComponent.GetContentRotation = function () {
    if (this.Parent && this.Parent.GetContentRotation)
        return this.Rotation + this.Parent.GetContentRotation();
    else
        return this.Rotation;
};

TransformComponent.GetContentScaleX = function () {
    if (this.Parent && this.Parent.GetContentScaleX)
        return this.ScaleX * this.Parent.GetContentScaleX();
    else
        return this.ScaleX;
};

TransformComponent.GetContentScaleY = function () {
    if (this.Parent && this.Parent.GetContentScaleY)
        return this.ScaleY * this.Parent.GetContentScaleY();
    else
        return this.ScaleY;
};

TransformComponent.AddChild = function (child) {
    if (child && child.Is(GameObject))
        child = child.Transform;

    if (child && child.Is(TransformComponent)) {
        this.Children.push(child);
        child.Parent = this;
        return child;
    }
    console.log("Cannot insert component as child. Try AddComponent function!");
};

TransformComponent.RemoveChild = function (child) {
    if (child && child.Is(GameObject))
        child = child.Transform;

    if (child && child.Is(TransformComponent)) {
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
        for (var i = 0; this.Children && i < this.Children.length; i++)
            if (this.Children[i].GameObject && this.Children[i].GameObject.AppUpdate)
                this.Children[i].GameObject.AppUpdate.call(this.Children[i].GameObject, gameTime);
    }
};

TransformComponent.Draw = function (context, gameTime) {
    if (!this.Enabled) return;

    for (var i = 0; this.Children && i < this.Children.length; i++)
        if (this.Children[i].GameObject && this.Children[i].GameObject.Draw)
            this.Children[i].GameObject.Draw.call(this.Children[i].GameObject, context, gameTime);
};

TransformComponent.OnDestroy = function () {
    for (var i = 0; this.Children && i < this.Children.length; i++)
        if (this.Children[i].GameObject)
            this.Children[i].GameObject.Destroy();
};