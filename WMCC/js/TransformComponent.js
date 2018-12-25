var TransformComponent = function (gameObject, x, y, rotation, scaleX, scaleY)
{
    var instance = new GameComponent();
    instance.Base = GameComponent;
    instance.Type = TransformComponent;

    instance.Name = "TransformComponent" + instance.Id;
    instance.GameObject = gameObject;
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