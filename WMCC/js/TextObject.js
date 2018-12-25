var TextObject = function (text, screenPosition, font, fillStyle, textAlign) {
    var components = [new ScreenPositionedTextComponent(text, screenPosition, font, fillStyle, textAlign)];
    var instance = new GameObject("TextObject", null, components);        
    return instance;
};