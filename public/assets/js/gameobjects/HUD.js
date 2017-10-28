HUD = function(game, user) {
    Phaser.Sprite.call(this, game, 0, 0, "money");

    game.add.existing(this);

    console.log(user);

    this.anchor = new Phaser.Point(0.5, 0.5);

    var style = { font: "24px Arial", fill: "#ffffff", align: "center" };
    var text = game.add.text(this.x, this.y, user.money.toString(), style);
    text.anchor.set(0);
    //text.setShadow(5, 5, 'rgba(0,0,0,0.7)', 5);
    text.stroke = "#000000";
    text.strokeThickness = 4;
    text.alpha = 1;

    this.user = user;
    this.text = text;
    this.game = game;
};

HUD.prototype = Object.create(Phaser.Sprite.prototype);
HUD.prototype.constructor = HUD;
HUD.prototype.update = function() {
    this.x = this.game.camera.x + this.width;
    this.y = this.game.camera.y + this.height;

    this.text.x = this.x + this.width - 8;
    this.text.y = this.y - 14;

    //this.text.text = this.user.money;
};