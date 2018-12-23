var MainMenuItemBar = function (name) {
    var instance = new GameObject();
    instance.Base = GameObject;
    instance.Type = MainMenuItemBar;
    instance.Name = "MainMenuItemBar" + instance.Id;

    var mainMenuItems = arguments;
    for (var i = 0; i < mainMenuItems.length - 1; i++) {
        var item = mainMenuItems[i + 1];
        instance.AddChild(item);
        item.ItemText.ScreenPosition = { x: 0.3 + 0.1 * i, y: 0.7 };
        item.ItemIcon.ScreenPosition = { x: 0.3 + 0.1 * i, y: 0.625 };
        item.ItemIcon.Scale = { x: 0.1, y: 0.1 };

        if (i === 0) {
            item.ItemText.TextComponent.Alpha = 1;
            item.ItemText.TextComponent.TextAlign = "right";
            item.ItemText.ScreenPosition = { x: 0.325, y: 0.75 };
            item.ItemIcon.ScreenPosition = { x: 0.25, y: 0.625 };
            item.ItemIcon.Scale = { x: 0.2, y: 0.2 };
        }
        else {
            item.ItemText.TextComponent.Alpha = 0.5;
        }
    }

    return instance;
};