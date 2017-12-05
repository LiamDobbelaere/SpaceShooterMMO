BoltEnemy = function (game, x, y, player, enemyGroup, region) {
    Phaser.Sprite.call(this, game, x, y, "asteroid");

    this.enemyGroup = enemyGroup;
    this.region = region;
    this.player = player;
    this.game = game;

    this.baseHealth = 10;
    this.health = this.baseHealth;
    this.speed = 100;
    this.level = 0;
    this.tint = Phaser.Color.getRandomColor(180, 255, 255);

    this.maxlevels = 4;
    if (this.region.difficulty >= 6) this.maxlevels = 5;

    this.anchor = new Phaser.Point(0.5, 0.5);

    enemyGroup.add(this);

    if (this.region.difficulty > 0) {
        this.body.bounce.set(1 + this.region.difficulty / 100);
    }

    this.body.collideWorldBounds = true;
    this.body.bounce.set(1);
    this.body.setCircle(this.width / 2, this.width * this.anchor.x - this.width / 2, this.height * this.anchor.y - this.width / 2);

    var signX = Math.random() > 0.5 ? -1 : 1;
    var signY = Math.random() > 0.5 ? -1 : 1;

    var xFactor = Math.random() + 0.5;
    var yFactor = Math.random() + 0.5;

    this.body.velocity.setTo(signX * this.speed * xFactor, signY * this.speed * yFactor);
};

BoltEnemy.prototype = Object.create(Phaser.Sprite.prototype);
BoltEnemy.prototype.constructor = BoltEnemy;

BoltEnemy.prototype.onHit = function () {
    this.health--;
    if (this.health < 0) {
        if (this.level <= this.maxlevels) {
            var newEnemy = new BoltEnemy(this.game, this.x, this.y, this.player, this.enemyGroup, this.region);

            var color = Phaser.Color.valueToColor(this.tint);
            var hsv = Phaser.Color.RGBtoHSV(color.r, color.g, color.b);
            hsv.v = hsv.v * 0.9;
            hsv.h = hsv.h * 0.9;
            color = Phaser.Color.HSVtoRGB(hsv.h, hsv.s, hsv.v);
            var finalColor = Phaser.Color.getColor(color.r, color.g, color.b);

            newEnemy.width = this.width * 0.8;
            newEnemy.height = this.height * 0.8;
            newEnemy.baseHealth = this.baseHealth * 0.8;
            newEnemy.health = this.baseHealth;
            newEnemy.level = this.level + 1;
            newEnemy.tint = finalColor;
            newEnemy.body.velocity = new Phaser.Point(this.body.velocity.x, this.body.velocity.y);

            newEnemy.body.velocity.x *= -1;
            newEnemy.body.velocity.y *= -1;

            newEnemy = new BoltEnemy(this.game, this.x, this.y, this.player, this.enemyGroup, this.region);
            newEnemy.width = this.width * 0.8;
            newEnemy.height = this.height * 0.8;
            newEnemy.baseHealth = this.baseHealth * 0.8;
            newEnemy.health = this.baseHealth;
            newEnemy.level = this.level + 1;
            newEnemy.tint = finalColor;
            newEnemy.body.velocity = new Phaser.Point(this.body.velocity.x, this.body.velocity.y);
        }

        this.kill();
    }
};

BoltEnemy.prototype.update = function () {
    this.body.rotation += this.body.velocity.getMagnitude() / 50;

    if (this.body.blocked.down || this.body.blocked.up || this.body.blocked.left || this.body.blocked.right) {
        this.player.camShake = this.body.velocity.getMagnitude() / 100;

        if (this.body.velocity.getMagnitude() > 1500) this.body.bounce.set(0.8);
    }

};