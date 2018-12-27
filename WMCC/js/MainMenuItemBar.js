var MainMenuItemBar = function (name) {
    var instance = new GameObject();
    instance.Base = GameObject;
    instance.Type = MainMenuItemBar;
    instance.Name = "MainMenuItemBar" + instance.Id;

    instance.Transform.AddChild(new TextObject("TV", { x: 0.1525, y: 0.525 }, "lighter 48px Eras ITC, Malgun Gothic, Arial", "white"));

    var mainMenuItems = arguments;
    var items = [];
    var i;
    for (i = 0; i < mainMenuItems.length - 1; i++) {
        var item = instance.Transform.AddChild(mainMenuItems[i + 1]);
        items.push(item);
    }

    var selectedItem = 0;
    function UpdateBar() {
        for (i = 0; i < items.length; i++) {
            var item = items[i];
            var text = item.ItemText;
            var icon = item.ItemIcon;
            var offsetI = i - selectedItem;
            text.Alpha = 0.5;
            text.Font = "lighter 25px Eras ITC, Malgun Gothic, Arial";
            text.TextAlign = "center";
            icon.ScreenSize = { x: 0.1, y: 0.1 };

            if (i < selectedItem) {
                text.ScreenPosition = { x: 0.185 + 0.125 * offsetI, y: 0.7 };
                icon.ScreenPosition = { x: 0.185 + 0.125 * offsetI, y: 0.625 };
            }
            else if (i === selectedItem) {
                text.Alpha = 1;
                text.Font = "lighter 30px Eras ITC, Malgun Gothic, Arial";
                text.TextAlign = "right";
                text.ScreenPosition = { x: 0.35, y: 0.75 };
                icon.ScreenPosition = { x: 0.25, y: 0.625 };
                icon.ScreenSize = { x: 0.19, y: 0.19 };
            }
            else {
                text.ScreenPosition = { x: 0.325 + 0.125 * offsetI, y: 0.7 };
                icon.ScreenPosition = { x: 0.325 + 0.125 * offsetI, y: 0.625 };
            }
        }
    }

    UpdateBar();

    instance.SelectPrevious = function () {
        selectedItem = Math.max(selectedItem - 1, 0);
        UpdateBar();
    };

    instance.SelectNext = function () {
        selectedItem = Math.min(selectedItem + 1, items.length - 1);
        UpdateBar();
    };

    instance.Select = function () {
        App.ChangeScene(items[selectedItem].Scene);
    };

    instance.ActivateBar = function () {
        for (var i = 0; i < items.length; i++)
            items[i].Enabled = true;
    };

    instance.DeactivateBar = function () {
        for (var i = 0; i < items.length; i++)
            items[i].Enabled = false;
    };

    return instance;
};