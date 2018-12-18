var App =
{
    Canvas: undefined,
    Context: undefined,
    Width: undefined,
    Height: undefined,
    Time: { Start: 0, LastTime: 0, DeltaTime: 0, TotalTime: 0 },

    StartApp: function ()
    {
        App.Canvas = document.getElementById("AppCanvas");
        App.Context = App.Canvas.getContext("2d");
        App.Width = App.Canvas.width;
        App.Height = App.Canvas.height;

        App.Time.Start = new Date().getTime();
        App.Time.LastTime = App.Time.Start;

        this.OnResize();
        App.ChangeScene(new LogoScene());
        App.Loop();
    },

    Loop: function ()
    {
        App.Time.DeltaTime = new Date().getTime() - App.Time.LastTime;
        App.Time.LastTime += App.Time.DeltaTime;
        App.Time.TotalTime += App.Time.DeltaTime;

        App.Scene.Update(App.Time);

        App.Context.clearRect(0, 0, App.Canvas.width, App.Canvas.height);
        App.Scene.Draw(App.Context, App.Time);

        //Mouse.CalculateGameCoordinates();

        requestAnimationFrame(App.Loop, undefined);
    },

    ChangeScene: function (scene, destroyPreviousScene)
    {
        if (destroyPreviousScene)
            App.Scene.Destroy();

        App.Scene = scene;
        App.Scene.Initialize();
    },

    OnResize: function ()
    {
        App.Canvas.width = App.Width = window.innerWidth;
        App.Canvas.height = App.Height = window.innerHeight;
    }
};