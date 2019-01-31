var CornerTimeComponent = function () {
    var instance = new TextComponent("00:00 AM", "30px Arial", "white", "right");
    instance.Update = CornerTimeComponent.Update;
    return instance;
};

CornerTimeComponent.Update = function (gameTime) {
    var scaleX = App.Width / 1920;
    var scaleY = App.Height / 1080;
    var scale = this.GameObject.Transform.ScaleX = this.GameObject.Transform.ScaleY = Math.max(scaleX, scaleY);
    var xOffset = scale * 40;
    var yOffset = scale * 50;
    this.GameObject.Transform.X = App.Width - xOffset;
    this.GameObject.Transform.Y = yOffset;

    this.Text = CornerTimeComponent.FormatAMPM(new Date());
};

CornerTimeComponent.FormatAMPM = function (date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
};