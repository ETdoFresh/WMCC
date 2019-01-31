var MouseButton =
{
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2,

    GetMouseButtonFromNumber: function (code) {
        return Object.keys(MouseButton).find(function (key) { return MouseButton[key] === code; });
    }
};