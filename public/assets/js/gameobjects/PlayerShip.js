PlayerShip = function(game, x, y, isInRegion, user) {
    Phaser.Sprite.call(this, game, x, y, "ship");

    console.log(user);

    //game.camera.follow(this, null, 0.5, 0.5);
    game.physics.arcade.enable(this);

    this.anchor = new Phaser.Point(0.5, 0.5);

    this.isInRegion = isInRegion;

    this.shootSound = game.add.audio("blaster", 0.2, false);

    this.camShake = 0;
    this.regionOverlapping = null;
    this.regionOverlapReset = 0;

    if (this.isInRegion) this.body.collideWorldBounds = true;

    this.weapon = game.add.weapon(30, "bullet");
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapon.bulletSpeed = 2000;
    this.weapon.fireRate = 125;
    this.weapon.bulletAngleVariance = 8;
    this.weapon.fireRateVariance = 100;
    this.weapon.onFire.add(this.onBulletFired, this);
    this.weapon.trackSprite(this, 0, 0, false);

    game.add.existing(this);

    var style = { font: "24px Arial", fill: "#ffffff", align: "center" };
    var text = game.add.text(this.width / 2, this.height / 2, "u gay", style);
    text.anchor.set(0.5);
    //text.setShadow(5, 5, 'rgba(0,0,0,0.7)', 5);
    text.stroke = '#000000';
    text.strokeThickness = 4;
    text.alpha = 1;

    this.hintText = text;

    game.add.existing(this.hintText);

    this.game = game;
    this.inputKeys = {
        upKey: game.input.keyboard.addKey(Phaser.Keyboard.Z),
        downKey: game.input.keyboard.addKey(Phaser.Keyboard.S),
        leftKey: game.input.keyboard.addKey(Phaser.Keyboard.Q),
        rightKey: game.input.keyboard.addKey(Phaser.Keyboard.D),
        useKey: game.input.keyboard.addKey(Phaser.Keyboard.E)
    };
    this.speed = 500;
    this.turnSpeed = 0.4;
    this.moveDirection = 0;
};

PlayerShip.prototype = Object.create(Phaser.Sprite.prototype);
PlayerShip.prototype.constructor = PlayerShip;
PlayerShip.prototype.update = function() {
    this.updateMovement();
    this.updateCamera();
    this.updateWeapon();

    if (!this.isInRegion) game.world.wrap(this, 0, true);

    if (this.regionOverlapReset > 0) this.regionOverlapReset--;
    else this.regionOverlapping = null;

    this.hintText.alpha = 0;

    if (this.regionOverlapping !== null) {
        this.hintText.x = this.x;
        this.hintText.y = this.y - 64;
        this.hintText.alpha = 1;
        this.hintText.text = "[E] Enter " + this.regionOverlapping.faction + " region";
        if (this.inputKeys.useKey.isDown) {
            this.game.state.start("battle", true, false, this.regionOverlapping);
        }
    }
};

PlayerShip.prototype.updateMovement = function() {
    var math = this.game.math;

    var moveUp = this.inputKeys.upKey.isDown;
    var moveDown = this.inputKeys.downKey.isDown;
    var moveLeft = this.inputKeys.leftKey.isDown;
    var moveRight = this.inputKeys.rightKey.isDown;

    var moving = moveUp + moveDown + moveLeft + moveRight;

    if (!(moveUp && moveDown) && !(moveLeft && moveRight) && moving > 0) {
        this.moveDirection = ((moveUp * 270.0) + (moveLeft * 180.0) + (moveDown * 90.0)) / moving;
        if (moveUp && moveRight) this.moveDirection = 315.0;
    }

    this.moveDirection = math.wrapAngle(this.moveDirection);

    this.body.rotation = this.game.math.radToDeg(math.rotateToAngle(
        math.degToRad(this.body.rotation), math.degToRad(this.moveDirection), this.turnSpeed));

    if (moving) {
        this.body.velocity.x = Math.cos(math.degToRad(this.body.rotation)) * this.speed;
        this.body.velocity.y = Math.sin(math.degToRad(this.body.rotation)) * this.speed;
    } else {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;

    }

};

PlayerShip.prototype.updateCamera = function() {
    var camTargetX = (this.x - (this.game.width / 2 - this.game.input.activePointer.x) / 2);
    var camTargetY = (this.y - (this.game.height / 2 - this.game.input.activePointer.y) / 2);

    //if (this.camShakeX > 0) this.camShakeX--; else this.camShakeX = 0;
    //if (this.camShakeY > 0) this.camShakeY--; else this.camShakeY = 0;

    this.game.camera.focusOnXY(camTargetX + this.game.math.random(-this.camShake, this.camShake), camTargetY + this.game.math.random(-this.camShake, this.camShake));

    if (this.camShake > 0) this.camShake--;
};

PlayerShip.prototype.updateWeapon = function() {
    if (this.game.input.activePointer.leftButton.isDown) {
        this.weapon.fire(this,
            this.game.input.activePointer.x + this.game.camera.x,
            this.game.input.activePointer.y + this.game.camera.y, 0, 0);
    }
};

PlayerShip.prototype.onBulletFired = function() {
    this.camShake = 4;
    this.shootSound.play();
};

PlayerShip.prototype.onOverlapRegion = function(region) {
    this.regionOverlapReset = 5;
    if (this.regionOverlapping !== region) {
        this.regionOverlapping = region;
    }
};

PlayerShip.prototype.gameOver = function() {
    game.state.start("boot");
};