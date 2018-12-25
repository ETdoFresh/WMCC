var BlackBackground = function ()
{
    var instance = new GameObject("BlackBackground", null,
        [new RectangleComponent(0, 0, 1, 1, 1, 'black')]
    );
    return instance;
};