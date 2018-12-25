var Action = {
    CreateObject: function (obj) { App.Scene.AddChild(new obj()); },

    AlphaValues: [],
    Alpha: function (obj, startValue, finishValue, duration) {
        obj.Alpha = startValue;
        this.AlphaValues.push({
            obj: obj,
            startValue: startValue,
            finishValue: finishValue,
            duration: duration,
            startTime: App.Time.TotalTime
        });
    },

    ScaleValues: [],
    Scale: function (obj, startValue, finishValue, duration) {
        obj.ScaleX = obj.ScaleY = startValue;
        this.ScaleValues.push({
            obj: obj,
            startValue: startValue,
            finishValue: finishValue,
            duration: duration,
            startTime: App.Time.TotalTime
        });
    },

    Update: function (gameTime) {
        var i;
        for (i = this.AlphaValues.length - 1; i >= 0; i--) {
            var a = this.AlphaValues[i];
            this.AlphaValues[i].obj.Alpha =
                this.CalculateValue(a.startValue, a.finishValue, a.startTime, gameTime.TotalTime, a.duration);
            if (gameTime.TotalTime >= a.startTime + a.duration)
                this.AlphaValues.splice(i, 1);
        }

        for (i = this.ScaleValues.length - 1; i >= 0; i--) {
            var s = this.ScaleValues[i];
            this.ScaleValues[i].obj.ScaleX = this.ScaleValues[i].obj.ScaleY =
                this.CalculateValue(s.startValue, s.finishValue, s.startTime, gameTime.TotalTime, s.duration);
            if (gameTime.TotalTime >= s.startTime + s.duration)
                this.ScaleValues.splice(i, 1);
        }
    },

    CalculateValue: function (startValue, finishValue, startTime, currentTime, duration) {
        return startValue + (finishValue - startValue) * Math.clamp01((currentTime - startTime) / duration);
    },

    PlaySound: function (src) {
        var sound = document.createElement("audio");
        sound.src = src;
        sound.setAttribute("preload", "auto");
        sound.setAttribute("controls", "none");
        sound.style.display = "none";
        document.body.appendChild(sound);
        sound.play();
    }
};