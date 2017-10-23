var openworldState = {
    regions: null,
    player: null,
    init: function(regions) {
        this.regions = regions;
    },
    preload: function () {

    },
    create: function () {
        var bloomFilter = new Phaser.Filter(game, {
            intensity: {
                type: "1f",
                value: 0.01
            }
        }, bloomSrc);
        game.world.filters = [bloomFilter];

        game.world.setBounds(0, 0, 8096, 8096);
        game.add.tileSprite(0, 0, 8096, 8096, "space");

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.camera.flash(0x000000, 250, true, 1);

        this.regions.forEach(function(region) {
            var r = new Region(game, region);
            region.gameObject = r;
        });

        //new Region(game, 0, 0, 200, 500);
        //r1= new Region(game, 500, 800, 1024, 1024);


        this.player = new PlayerShip(game, 200, 200, false);
        new Crosshair(game);

    },
    update: function () {
        //game.physics.arcade.collide(r1, player);

        var p = this.player;

        this.regions.forEach(function(region) {
            game.physics.arcade.overlap(region.gameObject, p, function() {
                p.onOverlapRegion(region);
            }, null);
        });
    }
};