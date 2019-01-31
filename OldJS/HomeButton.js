var HomeButton = function () {
    var instance = new Behaviour("HomeButton", [HomeButton]);
    instance.OnEnable = HomeButton.OnEnable;
    instance.OnDisable = HomeButton.OnDisable;
    return instance;
};

HomeButton.OnEnable = function () {
    if (this.GetComponent) {
        if (!this.GetComponent(ImageComponent))
            this.GameObject.AddComponent(new ScreenSizedImageComponent("GreenButton.png"
                , { x: 0.5, y: 0.5 }
                , { x: 0.025, y: 0.05 }
                , { x: 0.075, y: 0.075 }
                , Scale.UniformFit));
        if (!this.GetComponent(BoxCollider)) {
            var b = this.GameObject.AddComponent(new BoxCollider(null, { x: 0.075, y: 0.075 }));
            b.OnMouseButtonLeftDown = function () { App.ChangeScene(MainMenuScene); };
        }
    }
};