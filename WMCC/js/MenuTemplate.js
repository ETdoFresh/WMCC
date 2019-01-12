var MenuTemplate = function (name, type) {
    name = name === null ? "MenuTemplate" : name;
    var instance = new Behaviour(name, [MenuTemplate].concat(type));

    instance.SelectFirstItem = function () { };
    instance.OnUp = function () { console.log(instance.Name + " OnUp"); };
    instance.OnDown = function () { console.log(instance.Name + " OnDown"); };
    instance.OnLeft = function () { console.log(instance.Name + " OnLeft"); };
    instance.OnRight = function () { console.log(instance.Name + " OnRight"); };
    instance.OnEnter = function () { console.log(instance.Name + " OnEnter"); };

    instance.OnPreviousMenu = function () { console.log(instance.Name + " OnPreviousMenu"); };
    instance.OnNextMenu = function () { console.log(instance.Name + " OnNextMenu"); };

    return instance;
};