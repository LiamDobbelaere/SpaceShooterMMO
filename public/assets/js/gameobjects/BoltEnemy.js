BoltEnemy = function(game, x, y, player, enemyGroup) {
    Phaser.Sprite.call(this, game, x, y, "bolt");

    enemyGroup.add(this);

    //game.physics.arcade.enable(this);

    //game.add.existing(this);

    this.body.collideWorldBounds = true;
    this.body.bounce.set(1.1);

    this.player = player;

    this.bounceSound = game.add.audio("cling", 0.2, false);

    this.anchor = new Phaser.Point(0.5, 0.5);
    this.game = game;
    this.health = 5;
    this.speed = 200;


    game.time.events.repeat(Phaser.Timer.SECOND * 1, 100, function() {
        //for (var i = 0; i < 3; i++) {
        new BoltEnemy(this.x, this.y, this.player, enemyGroup);
        //}
    }, this);

    var signX = Math.random() > 0.5 ? -1 : 1;
    var signY = Math.random() > 0.5 ? -1 : 1;

    console.log(signX);
    console.log(signY);

    var xFactor = Math.random() + 0.5;
    var yFactor = Math.random() + 0.5;

    this.body.velocity.setTo(signX * this.speed * xFactor, signY * this.speed * yFactor);
};

BoltEnemy.prototype = Object.create(Phaser.Sprite.prototype);
BoltEnemy.prototype.constructor = BoltEnemy;
BoltEnemy.prototype.update = function() {
    this.body.rotation += this.body.velocity.getMagnitude() / 100;

    if (this.body.blocked.down || this.body.blocked.up || this.body.blocked.left || this.body.blocked.right) {
        this.bounceSound.play();
        this.player.camShake = this.body.velocity.getMagnitude() / 100;

        if (this.body.velocity.getMagnitude() > 1500) this.body.bounce.set(0.8);
    }
};

BoltEnemy.prototype.onHit = function() {
    //console.log("Hi");
    this.health--;
    if (this.health < 0) this.kill();
};