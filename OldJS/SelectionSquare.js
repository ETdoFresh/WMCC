var SelectionSquare = function ()
{
    var instance = new GameObject("SelectionSquare");
    instance.Image = instance.AddComponent(
        new ScreenSizedImageComponent("selection.png", null,
            { x: 0.25, y: 0.625 }, { x: 0.2, y: 0.2 }));
    return instance;
};