PlayerShip = function(game) {
    Phaser.Sprite.call(this, game, 200, 200, "ship");

    game.camera.follow(this, null, 0.5, 0.5);
    game.physics.arcade.enable(this);
    game.add.existing(this);

    this.anchor = new Phaser.Point(0.5, 0.5);

    this.game = game;
    this.input = {
        upKey: game.input.keyboard.addKey(Phaser.Keyboard.Z),
        downKey: game.input.keyboard.addKey(Phaser.Keyboard.S),
        leftKey: game.input.keyboard.addKey(Phaser.Keyboard.Q),
        rightKey: game.input.keyboard.addKey(Phaser.Keyboard.D)
    };
    this.speed = 10;
    this.turnSpeed = 0.4;
    this.moveDirection = 0;
};

PlayerShip.prototype = Object.create(Phaser.Sprite.prototype);
PlayerShip.prototype.constructor = PlayerShip;
PlayerShip.prototype.update = function() {
    this.updateMovement();
};

PlayerShip.prototype.updateMovement = function() {
    var math = this.game.math;

    var moveUp = this.input.upKey.isDown;
    var moveDown = this.input.downKey.isDown;
    var moveLeft = this.input.leftKey.isDown;
    var moveRight = this.input.rightKey.isDown;

    var moving = moveUp + moveDown + moveLeft + moveRight;

    if (!(moveUp && moveDown) && !(moveLeft && moveRight) && moving > 0) {
        this.moveDirection = ((moveUp * 270.0) + (moveLeft * 180.0) + (moveDown * 90.0)) / moving;
        if (moveUp && moveRight) this.moveDirection = 315.0;
    }

    this.moveDirection = math.wrapAngle(this.moveDirection);

    this.body.rotation = this.game.math.radToDeg(math.rotateToAngle(
        math.degToRad(this.body.rotation), math.degToRad(this.moveDirection), this.turnSpeed));

    if (moving) {
        this.x += Math.cos(math.degToRad(this.body.rotation)) * this.speed;
        this.y += Math.sin(math.degToRad(this.body.rotation)) * this.speed;
    }
};