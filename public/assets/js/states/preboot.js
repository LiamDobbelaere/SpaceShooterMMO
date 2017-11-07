var prebootState = {
    preload: function() {
        game.load.image("ship_trra", "assets/media/ship_trra.png");
        game.load.image("ship_bolt", "assets/media/ship_bolt.png");
        game.load.image("ship_h3-rb", "assets/media/ship_h3-rb.png");

        game.load.image("space_trra", "assets/media/space_trra.png");
        game.load.image("space_bolt", "assets/media/space_bolt.png");
        game.load.image("space_h3-rb", "assets/media/space_h3-rb.png");
        game.load.image("space_neut", "assets/media/space_neut.png");

        game.load.image("logo_trra", "assets/media/logo_trra.png");
        game.load.image("logo_bolt", "assets/media/logo_bolt.png");
        game.load.image("logo_h3-rb", "assets/media/logo_h3-rb.png");

        game.load.image("crosshair", "assets/media/crosshair.png");
        game.load.image("bullet", "assets/media/bullet.png");
        game.load.image("money", "assets/media/money.png");
        game.load.image("region", "assets/media/region.png");
        game.load.image("white", "assets/media/white.png");
        game.load.image("bolt", "assets/media/bolt.png");
        game.load.image("asteroid", "assets/media/asteroid.png");

        game.load.audio("blaster", "assets/audio/sfx/blaster.wav");
        game.load.audio("time", "assets/audio/sfx/time.wav");
        game.load.audio("cling", "assets/audio/sfx/cling.wav");
        game.load.audio("level_trra", "assets/audio/music/level_trra.ogg");
        game.load.audio("level_neut", "assets/audio/music/level_neut.ogg");
        game.load.audio("level_bolt", "assets/audio/music/level_bolt.ogg");
        game.load.audio("level_h3-rb", "assets/audio/music/level_bolt.ogg");
        game.load.audio("worldmap", "assets/audio/music/worldmap.ogg");
    },
    create: function () {
        game.state.start("boot");
    }
};