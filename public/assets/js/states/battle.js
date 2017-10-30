var battleState = {
    region: null,
    enemyGroup: null,
    user: null,
    background: null,
    //deleteme: null,
    init: function(data) {
        this.region = data.region;
        this.user = data.user;
    },
    preload: function () {

    },
    create: function () {
        currentMusic = game.add.audio("level_" + this.region.faction.toLowerCase(), 1);
        currentMusic.fadeIn(1000, true);

        var bloomFilter = new Phaser.Filter(game, {
            intensity: {
                type: "1f",
                value: 0.01
            }
        }, bloomSrc);
        game.world.filters = [bloomFilter];

        game.world.setBounds(0, 0, 800, 600);
        this.background = game.add.tileSprite(0, 0, 800, 600, "space_" + this.region.faction.toLowerCase());


        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.camera.flash(0xffffff, 250, true, 1);


        this.enemyGroup = game.add.group();
        this.enemyGroup.enableBody = true;
        this.enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.player = new PlayerShip(game, game.world.centerX, game.world.height, true, this.user);

        new Crosshair(game);
        new BattleGamemode(game, this.region, this.player, this.enemyGroup);

        socket.emit("update-region-faction", this.region);

        //this.deleteme = new BoltEnemy(game, 0, 0, this.player, this.enemyGroup);

        //var music = game.add.audio("reclaim", 1, true);
        //music.play();
    },
    update: function () {
        this.background.tilePosition.y++;

        game.physics.arcade.overlap(this.player.weapon.bullets, this.enemyGroup, function(a, b) {
            a.kill();
            b.onHit();
        }, null, this);

        game.physics.arcade.overlap(this.player, this.enemyGroup, function(a, b) {
            a.gameOver();
        }, null, this);
    },
    render: function() {
        //game.debug.body(this.player);
        //game.debug.body(this.deleteme);
    },
    shutdown: function() {
        currentMusic.stop();
    }
};