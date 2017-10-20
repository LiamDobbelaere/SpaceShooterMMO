var openworldState = {
    preload: function () {
        game.load.image("ship", "assets/media/ship.png");
        game.load.image("space", "assets/media/space.png");
        game.load.image("crosshair", "assets/media/crosshair.png");
        game.load.image("bullet", "assets/media/bullet.png");
    },
    create: function () {
        var bloomFilter = new Phaser.Filter(game, {
            intensity: {
                type: "1f",
                value: 0.01
            }
        }, bloomSrc);
        game.world.filters = [bloomFilter];

        game.world.setBounds(0, 0, 2048, 2048);
        game.add.tileSprite(0, 0, 2048, 2048, "space");

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.camera.flash(0x000000, 250, true, 1);

        new PlayerShip(game);
        new Crosshair(game);
    },
    update: function () {

    }
};