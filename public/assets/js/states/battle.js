var battleState = {
    region: null,
    enemyGroup: null,
    init: function(region) {
        this.region = region;
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

        game.world.setBounds(0, 0, this.region.width * 100, this.region.height * 100);
        if (this.region.faction === "TRRA") game.add.tileSprite(0, 0, this.region.width * 100, this.region.height * 100, "space");
        else if (this.region.faction === "BOLT") game.add.tileSprite(0, 0, this.region.width * 100, this.region.height * 100, "space2");

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.camera.flash(0xffffff, 250, true, 1);


        this.enemyGroup = game.add.group();
        this.enemyGroup.enableBody = true;
        this.enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.player = new PlayerShip(game, game.world.centerX, game.world.centerY, true);
        new Crosshair(game);

        new BoltEnemy(game, 0, 0, this.player, this.enemyGroup);
        //var music = game.add.audio("reclaim", 1, true);
        //music.play();
    },
    update: function () {
        game.physics.arcade.overlap(this.player.weapon.bullets, this.enemyGroup, function(a, b) {
            a.kill();
            b.onHit();
        }, null, this);

        game.physics.arcade.overlap(this.player, this.enemyGroup, function(a, b) {
            //a.gameOver();
        }, null, this);
    }
};