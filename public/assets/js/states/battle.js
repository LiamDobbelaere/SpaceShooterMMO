var battleState = {
    region: null,
    enemyGroup: null,
    user: null,
    init: function(data) {
        this.region = data.region;
        this.user = data.user;
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

        game.world.setBounds(0, 0, 1024, 1024);
        game.add.tileSprite(0, 0, 1024, 1024, "space_" + this.region.faction.toLowerCase());

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.camera.flash(0xffffff, 250, true, 1);


        this.enemyGroup = game.add.group();
        this.enemyGroup.enableBody = true;
        this.enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.player = new PlayerShip(game, game.world.centerX, game.world.centerY, true, this.user);
        new Crosshair(game);

        new BoltEnemy(game, 0, 0, this.player, this.enemyGroup);

        new BattleGamemode(game);

        socket.emit("update-region-faction", this.region);

        //var music = game.add.audio("reclaim", 1, true);
        //music.play();
    },
    update: function () {
        game.physics.arcade.overlap(this.player.weapon.bullets, this.enemyGroup, function(a, b) {
            a.kill();
            b.onHit();
        }, null, this);

        game.physics.arcade.overlap(this.player, this.enemyGroup, function(a, b) {
            a.gameOver();
        }, null, this);
    }
};