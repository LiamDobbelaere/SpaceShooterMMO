var bootState = {
    preload: function() {
        game.load.image("ship", "assets/media/ship.png");
        game.load.image("space", "assets/media/space.png");
        game.load.image("crosshair", "assets/media/crosshair.png");
        game.load.image("bullet", "assets/media/bullet.png");
        game.load.image("region", "assets/media/region.png");
        game.load.image("white", "assets/media/white.png");
        game.load.audio("blaster", "assets/audio/sfx/blaster.wav");
        //game.load.audio("reclaim", "assets/audio/reclaim.ogg");
    },
    create: function() {
        var style = { font: "32px Arial", fill: "#ffffff", align: "center" };
        var text = game.add.text(game.world.centerX, game.world.centerY, "Connecting...", style);
        text.anchor.set(0.5);

        //var music = game.add.audio("reclaim", 1, true);
        //music.play();

        var tweenA = game.add.tween(text).to( { alpha: 0 }, 1000, "Linear");

        tweenA.start();
        tweenA.repeat(-1);
        tweenA.yoyo(true);

        if (socket) socket.disconnect(true);

        socket = io();
        socket.on("connect", function() {
            text.text = "Downloading regions..."
        });
        socket.on("receive-regions", this.startGame)
    },
    update: function() {

    },
    startGame: function(regions) {
        game.state.start("openworld", true, false, regions);
    }
};