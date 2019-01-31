var ImageObject = function (file, position, scale) {
    var components = [new ScreenSizedImageComponent(file, null, position, scale)];
    var instance = new GameObject("ImageObject", components);
    return instance;
};