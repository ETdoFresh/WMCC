var MainMenuItemBar = function (selectedItem, title, children) {
    selectedItem = selectedItem ? selectedItem : 0;
    title = title ? title : "Not Specified";
    children = children ? children : [];

    var instance = new GameObject("MainMenuItemBar");
    instance.Transform.AddChild(new TextObject(title, { x: 0.1525, y: 0.525 }, "lighter 48px Eras ITC, Malgun Gothic, Arial", "white"));

    var items = [];
    var i;
    for (i = 0; i < children.length; i++) {
        var item = instance.Transform.AddChild(children[i]);
        items.push(item);
    }

    function UpdateBar() {
        for (i = 0; i < items.length; i++) {
            var item = items[i];
            var text = item.GetComponentInChildren(TextComponent);
            var icon = item.GetComponentInChildren(ImageComponent);
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
        MainMenuItem.LastSelected = selectedItem;
        UpdateBar();
    };

    instance.SelectNext = function () {
        selectedItem = Math.min(selectedItem + 1, items.length - 1);
        MainMenuItem.LastSelected = selectedItem;
        UpdateBar();
    };

    instance.Select = function () {
        if (items[selectedItem].GameObject.Scene === ConnectingScene)
            AppObject.FindObjectOfType(HomeButton).GameObject.Destroy();

        App.ChangeScene(items[selectedItem].GameObject.Scene);
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