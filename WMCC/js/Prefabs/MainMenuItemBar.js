var MainMenuItemBar = function (name) {
    var instance = new GameObject();
    instance.Base = GameObject;
    instance.Type = MainMenuItemBar;
    instance.Name = "MainMenuItemBar" + instance.Id;

    var mainMenuItems = arguments;
    var i;
    for (i = 0; i < mainMenuItems.length - 1; i++)
        instance.AddChild(mainMenuItems[i + 1]);

    var selectedItem = 0;
    function UpdateBar() {
        for (i = 0; i < instance.Children.length; i++) {
            var item = instance.Children[i];
            var offsetI = i - selectedItem;
            item.ItemText.TextComponent.Alpha = 0.5;
            item.ItemText.TextComponent.Font = "lighter 25px Eras ITC, Malgun Gothic, Arial";
            item.ItemText.TextComponent.TextAlign = "center";
            item.ItemIcon.Scale = { x: 0.1, y: 0.1 };

            if (i < selectedItem) {
                item.ItemText.ScreenPosition = { x: 0.185 + 0.125 * offsetI, y: 0.7 };
                item.ItemIcon.ScreenPosition = { x: 0.185 + 0.125 * offsetI, y: 0.625 };
            }
            else if (i === selectedItem) {
                item.ItemText.TextComponent.Alpha = 1;
                item.ItemText.TextComponent.Font = "lighter 35px Eras ITC, Malgun Gothic, Arial";
                item.ItemText.TextComponent.TextAlign = "right";
                item.ItemText.ScreenPosition = { x: 0.34, y: 0.725 };
                item.ItemIcon.ScreenPosition = { x: 0.25, y: 0.625 };
                item.ItemIcon.Scale = { x: 0.2, y: 0.2 };
            }
            else {
                item.ItemText.ScreenPosition = { x: 0.325 + 0.125 * offsetI, y: 0.7 };
                item.ItemIcon.ScreenPosition = { x: 0.325 + 0.125 * offsetI, y: 0.625 };
            }
        }
    }

    UpdateBar();

    instance.SelectPrevious = function () {
        selectedItem = Math.max(selectedItem - 1, 0);
        UpdateBar();
    };

    instance.SelectNext = function () {
        selectedItem = Math.min(selectedItem + 1, instance.Children.length - 1);
        UpdateBar();
    };

    instance.Select = function () {
        console.log(instance.Children[selectedItem].Scene);
        App.ChangeScene(instance.Children[selectedItem].Scene);
    };

    return instance;
};