var openworldState = {
    preload: function() {
        game.load.image("ship", "assets/media/ship.png");
    },
    create: function() {
        var bloomFilter = new Phaser.Filter(game, null, bloomSrc);
        game.world.filters = [bloomFilter];
        game.world.setBounds(0, 0, 2048, 2048);

        game.physics.startSystem(Phaser.Physics.ARCADE);

        new PlayerShip(game);
    },
    update: function() {

    }
};