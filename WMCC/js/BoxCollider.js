var BoxCollider = function (center, size) {
    var instance = new Behaviour("BoxCollider", [BoxCollider]);
    instance.Center = center ? center : { x: 0, y: 0 };
    instance.Size = size ? size : { x: 0.05, y: 0.05 };
    instance.Draw = BoxCollider.Draw;
    instance.GetWorldPosition = BoxCollider.GetWorldPosition;
    instance.GetWorldSize = BoxCollider.GetWorldSize;
    instance.Up = BoxCollider.Up;
    instance.Down = BoxCollider.Down;
    instance.Left = BoxCollider.Left;
    instance.Right = BoxCollider.Right;
    instance.OnMouseButtonLeftDown = function () { console.log(instance.Name + " clicked"); };

    var RunMouseDownIfInBounds = function (e) {
        if (e.x >= instance.Left() && e.x <= instance.Right() &&
            e.y >= instance.Up() && e.y <= instance.Down())
            instance.OnMouseButtonLeftDown();
    };

    instance.OnEnable = function () { Input.AddMouseDownListener(MouseButton.LEFT, RunMouseDownIfInBounds); };
    instance.OnDisable = function () { Input.RemoveMouseDownListener(MouseButton.LEFT, RunMouseDownIfInBounds); };

    return instance;
};

BoxCollider.Draw = function (context, gameTime) {
    if (!App.Debug) return;

    var x = this.Left();
    var y = this.Up();
    var width = this.GetWorldSize().x;
    var height = this.GetWorldSize().y;
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.globalAlpha = 0.75;
    context.fillStyle = "";
    context.strokeStyle = "#00FF00";
    context.beginPath();
    context.strokeRect(x, y, width, height);
    context.closePath();
};

BoxCollider.GetWorldPosition = function () {
    var x = this.Transform().GetContentX() + this.Center.x;
    var y = this.Transform().GetContentY() + this.Center.y;
    return { x: x, y: y };
};

BoxCollider.GetWorldSize = function () {
    var x = App.Width * this.Size.x / 2;
    var y = App.Height * this.Size.y;
    return { x: x, y: y };
};

BoxCollider.Up = function () {
    return this.GetWorldPosition().y - this.GetWorldSize().y / 2;
};

BoxCollider.Down = function () {
    return this.GetWorldPosition().y + this.GetWorldSize().y / 2;
};

BoxCollider.Left = function () {
    return this.GetWorldPosition().x - this.GetWorldSize().x / 2;
};

BoxCollider.Right = function () {
    return this.GetWorldPosition().x + this.GetWorldSize().x / 2;
};