var bootState = {
    preload: function() {

    },
    create: function() {
        var style = { font: "32px Arial", fill: "#ffffff", align: "center" };
        var text = game.add.text(game.camera.x + game.camera.width / 2, game.camera.y + game.camera.height / 2, "Connecting...", style);
        text.anchor.set(0.5);

        var tweenA = game.add.tween(text).to( { alpha: 0 }, 1000, "Linear");

        tweenA.start();
        tweenA.repeat(-1);
        tweenA.yoyo(true);

        if (socket) socket.disconnect(true);

        socket = io();
        socket.on("connect", function() {
            text.text = "Downloading regions..."
        });
        socket.on("receive-userinfo", this.startGame)
    },
    update: function() {

    },
    startGame: function(userinfo) {
        game.state.start("openworld", true, false, userinfo);
    },
    shutdown: function() {
        socket.off("connect");
        socket.off("receive-userinfo");
    }
};