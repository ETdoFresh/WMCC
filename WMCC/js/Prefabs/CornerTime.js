var CornerTime = function (color) {
    var instance = new GameObject();
    instance.Base = GameObject;
    instance.Type = CornerTime;
    instance.Name = "CornerTime" + instance.Id;
    instance.Update = CornerTime.Update;

    instance.Text = instance.AddComponent(new TextComponent("00:00 AM", "30px Arial", "white", "right"));
    instance.Update();

    return instance;
};

CornerTime.Update = function (gameTime) {
    var scaleX =  App.Width / 1920;
    var scaleY =  App.Height / 1080;
    var scale = this.Transform.ScaleX = this.Transform.ScaleY = Math.max(scaleX, scaleY);
    var xOffset = scale * 40;
    var yOffset = scale * 50;
    this.Transform.X = App.Width - xOffset;
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