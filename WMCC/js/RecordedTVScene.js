var RecordedTVScene = function () {
    var instance = new GameObject("Recorded TV Scene");
    instance.Transform.AddChild(new BlackBackground());
    instance.Transform.AddChild(new BlueBackground());
    instance.Transform.AddChild(new CornerTime());

    var recordedTV = instance.Transform.AddChild(new RecordedTVMenuPrefab());
    var sortMenu = recordedTV.GetComponent(RecordedTVSortMenu);
    var itemMenu = recordedTV.GetComponent(RecordedTVItemMenu);
    var itemInfo = recordedTV.GetComponent(RecordedTVItemInfo);

    sortMenu.OnNextMenu = function (e) { activeMenu = itemMenu; };
    itemMenu.OnPreviousMenu = function (e) { activeMenu = sortMenu; };

    var activeMenu = sortMenu;
    activeMenu.SelectFirstItem();

    var onUpArrow = function (e) { activeMenu.OnUp(); };
    var onDownArrow = function (e) { activeMenu.OnDown(); };
    var onLeftArrow = function (e) { activeMenu.OnLeft(); };
    var onRightArrow = function (e) { activeMenu.OnRight(); };
    var onEnter = function (e) { activeMenu.OnEnter(); };
    var onBackspace = function (e) { App.ChangeScene(MainMenuScene); };

    Input.AddKeyDownListener(KeyCode.UpArrow, onUpArrow);
    Input.AddKeyDownListener(KeyCode.DownArrow, onDownArrow);
    Input.AddKeyDownListener(KeyCode.LeftArrow, onLeftArrow);
    Input.AddKeyDownListener(KeyCode.RightArrow, onRightArrow);
    Input.AddKeyDownListener(KeyCode.Enter, onEnter);
    Input.AddKeyDownListener(KeyCode.Backspace, onBackspace);

    instance.OnDestroy = function () {
        Input.RemoveKeyDownListener(KeyCode.UpArrow, onUpArrow);
        Input.RemoveKeyDownListener(KeyCode.DownArrow, onDownArrow);
        Input.RemoveKeyDownListener(KeyCode.LeftArrow, onLeftArrow);
        Input.RemoveKeyDownListener(KeyCode.RightArrow, onRightArrow);
        Input.RemoveKeyDownListener(KeyCode.Enter, onEnter);
        Input.RemoveKeyDownListener(KeyCode.Backspace, onBackspace);
    };

    return instance;
};