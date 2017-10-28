var bootState = {
    preload: function() {
        game.load.image("ship_trra", "assets/media/ship_trra.png");
        game.load.image("ship_bolt", "assets/media/ship_bolt.png");
        game.load.image("space_trra", "assets/media/space_trra.png");
        game.load.image("space_bolt", "assets/media/space_bolt.png");
        game.load.image("space_neut", "assets/media/space_neut.png");
        game.load.image("crosshair", "assets/media/crosshair.png");
        game.load.image("bullet", "assets/media/bullet.png");
        game.load.image("money", "assets/media/money.png");
        game.load.image("region", "assets/media/region.png");
        game.load.image("white", "assets/media/white.png");
        game.load.image("bolt", "assets/media/bolt.png");
        game.load.audio("blaster", "assets/audio/sfx/blaster.wav");
        game.load.audio("time", "assets/audio/sfx/time.wav");
        game.load.audio("cling", "assets/audio/sfx/cling.wav");
        game.load.audio("reclaim", "assets/audio/music/reclaim.ogg");
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