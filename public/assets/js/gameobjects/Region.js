Region = function(game, region) {
    Phaser.TileSprite.call(this, game, region.x * Region.size, region.y * Region.size, Region.size, Region.size, "region");

    game.physics.arcade.enable(this);
    //this.body.immovable = true;

    this.background = game.add.tileSprite(0, 0, this.width, this.height, "white");
    this.background.alpha = 0.1;

    var tweenA = game.add.tween(this.background).to( { alpha: 0.2 }, 2000, "Linear");

    tweenA.start();
    tweenA.repeat(-1);
    tweenA.yoyo(true);

    this.addChild(this.background);

    this.border = game.add.graphics(0, 0);
    this.addChild(this.border);

    game.add.existing(this);

    this.game = game;
    this.tilePositionPoint = new Phaser.Point(32, 32);
    this.tilePosition = this.tilePositionPoint;
    this.background.tilePosition = this.tilePositionPoint;
    this.timer = 0;
    this.region = region;

    this.refresh();
};

Region.prototype = Object.create(Phaser.TileSprite.prototype);
Region.prototype.constructor = Region;
Region.prototype.update = function() {
    this.tilePositionPoint.x+=0.3;
    this.tilePositionPoint.y+=0.3;

    this.visible = new Phaser.Rectangle(this.game.camera.x, this.game.camera.y, this.game.camera.width, this.game.camera.height).intersects(new Phaser.Rectangle(this.x, this.y, this.width, this.height))
};
Region.prototype.refresh = function() {
    var factionColor = 0x000000;

    if (this.region.faction === "TRRA") factionColor = 0x0033ff;
    else if (this.region.faction === "BOLT") factionColor = 0xff0000;
    else if (this.region.faction === "NEUT") factionColor = 0xffffff;
    this.background.tint = factionColor;
    this.tint = factionColor;

    this.border.clear();
    this.border.lineStyle(2, factionColor, 0.5);
    this.border.drawRect(2, 2, this.width - 2, this.height - 2);
};

Region.size = 256;
