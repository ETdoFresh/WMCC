var CenterScreenComponent = function () {
    var instance = new Behaviour("CenterScreen", [CenterScreenComponent]);
    instance.Update = CenterScreenComponent.Update;
    return instance;
};

CenterScreenComponent.Update = function (gameTime) {
    var transform = this.GameObject.Transform;
    transform.X = App.Width / 2;
    transform.Y = App.Height / 2;
};