var App =
{
    Canvas: undefined,
    Context: undefined,
    Width: undefined,
    Height: undefined,
    Time: { Start: 0, LastTime: 0, DeltaTime: 0, TotalTime: 0 },
    Debug: true,
    Server: new ServerDemo(),
    //Server: new ServerWMC(),

    StartApp: function (scene)
    {
        App.Canvas = document.getElementById("AppCanvas");
        App.Context = App.Canvas.getContext("2d");
        App.Width = App.Canvas.width;
        App.Height = App.Canvas.height;

        App.Time.Start = new Date().getTime();
        App.Time.LastTime = App.Time.Start;

        this.OnResize();
        App.DoNotDestroy = new GameObject("DoNotDestroy");
        App.ChangeScene(scene);
        App.Loop();
    },

    Loop: function ()
    {
        App.Time.DeltaTime = new Date().getTime() - App.Time.LastTime;
        App.Time.LastTime += App.Time.DeltaTime;
        App.Time.TotalTime += App.Time.DeltaTime;

        Action.Update(App.Time);
        App.DoNotDestroy.AppUpdate(App.Time);
        App.Scene.AppUpdate(App.Time);

        App.Context.setTransform(1, 0, 0, 1, 0, 0);
        App.Context.clearRect(0, 0, App.Canvas.width, App.Canvas.height);
        App.Context.beginPath();
        App.Scene.Draw(App.Context, App.Time);
        App.DoNotDestroy.Draw(App.Context, App.Time);

        //Mouse.CalculateGameCoordinates();

        requestAnimationFrame(App.Loop, undefined);
    },

    ChangeScene: function (scene, destroyPreviousScene = true)
    {
        if (App.Scene && destroyPreviousScene)
            App.Scene.Destroy();

        App.Scene = null;
        var newScene = new scene();
        var redirectedToAnotherScene = App.Scene !== null;
        if (!redirectedToAnotherScene)
            App.Scene = newScene;
    },

    OnResize: function ()
    {
        App.Canvas.width = App.Width = window.innerWidth;
        App.Canvas.height = App.Height = window.innerHeight;
    }
};