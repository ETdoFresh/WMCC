var CornerTime = function (color) {
    var instance = new GameObject();
    instance.Base = GameObject;
    instance.Name = "CornerTime" + instance.Id;
    instance.Update = CornerTime.Update;

    instance.Text = instance.AddComponent(new TextComponent("00:00 AM", "30px Arial", "white", "right"));
    instance.Update();

    return instance;
};

CornerTime.Update = function (gameTime) {
    var scaleX = App.Width / 1920;
    var scaleY = App.Height / 1080;
    var fontSize = Math.max(scaleX, scaleY) * 30;
    var xOffset = Math.max(scaleX, scaleY) * 40;
    var yOffset = Math.max(scaleX, scaleY) * 30;
    this.Text.Font = fontSize + "px Arial";
    this.Transform.X = App.Width / 2 - xOffset;
    this.Transform.Y = yOffset;

    this.Text.Text = CornerTime.FormatAMPM(new Date());
};

CornerTime.FormatAMPM = function (date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
};