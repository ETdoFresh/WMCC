var HomeButton = function () {
    var instance = new Behaviour("HomeButton", [HomeButton]);
    instance.OnEnable = HomeButton.OnEnable;
    instance.OnDisable = HomeButton.OnDisable;
    return instance;
};

HomeButton.BackToMainMenu = function () { App.ChangeScene(MainMenuScene); };

HomeButton.OnEnable = function () {
    if (this.GetComponent && !this.GetComponent(ImageComponent))
        this.GameObject.AddComponent(new ScreenSizedImageComponent("GreenButton.png"
            , { x: 0.5, y: 0.5 }
            , { x: 0.025, y: 0.05 }
            , { x: 0.075, y: 0.075 }
            , Scale.UniformFit));

    Input.AddMouseDownListener(MouseButton.LEFT, HomeButton.BackToMainMenu);
};

HomeButton.OnDisable = function () {
    Input.RemoveMouseDownListener(MouseButton.LEFT, HomeButton.BackToMainMenu);
};