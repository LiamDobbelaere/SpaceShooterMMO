Crosshair = function(game) {
    Phaser.Sprite.call(this, game, 200, 200, "crosshair");

    game.add.existing(this);

    this.anchor = new Phaser.Point(0.5, 0.5);

    this.game = game;
};

Crosshair.prototype = Object.create(Phaser.Sprite.prototype);
Crosshair.prototype.constructor = Crosshair;
Crosshair.prototype.update = function() {
    this.x = this.game.input.activePointer.x + this.game.camera.x;
    this.y = this.game.input.activePointer.y + this.game.camera.y;
};