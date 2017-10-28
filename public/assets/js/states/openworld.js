var openworldState = {
    regions: null,
    player: null,
    user: null,
    regionObjects: null,
    init: function(userinfo) {
        this.regions = userinfo.regions;
        this.user = userinfo.user;
        this.regionObjects = [];
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

        var tiles = 20;

        game.world.setBounds(0, 0, Region.size * tiles, Region.size * tiles);
        game.add.tileSprite(0, 0, Region.size * tiles, Region.size * tiles, "space_trra");

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.camera.flash(0x000000, 250, true, 1);

        var size = Region.size;
        var regionObjects = this.regionObjects;

        for (var y = 0; y < tiles; y++) {
            regionObjects[y] = [];

            for (var x = 0; x < tiles; x++) {
                var found = false;

                this.regions.forEach(function(region) {
                    if (region.x === x && region.y === y) {
                        var r = new Region(game, region);
                        found = true;

                        regionObjects[y][x] = r;
                    }
                });

                if (!found) {
                    var r = new Region(game, {
                        x: x,
                        y: y,
                        faction: "NEUT"
                    });

                    regionObjects[y][x] = r;
                }
            }
        }

        //r1= new Region(game, 500, 800, 1024, 1024);


        this.player = new PlayerShip(game, 200, 200, false, this.user);
        new Crosshair(game);
        new HUD(game, this.user);

        console.log(regionObjects);

        var self = this;
        socket.on("update-region", function(region) {
            self.updateRegion(region);
        });
    },
    update: function () {
        //game.physics.arcade.collide(r1, player);

        var p = this.player;

        this.regionObjects.forEach(function(row) {
            row.forEach(function(region) {
                game.physics.arcade.overlap(region, p, function() {
                    p.onOverlapRegion(region.region);
                }, null);
            });
        });
    },
    updateRegion: function(region) {
        this.regionObjects[region.y][region.x].region = region;
        this.regionObjects[region.y][region.x].refresh();
    },
    shutdown: function() {

    }
};