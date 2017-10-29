Region = function(game, region, regionObjects) {
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
    this.regionObjects = regionObjects;
    this.region.difficulty = 0;

    this.refresh();
};

Region.prototype = Object.create(Phaser.TileSprite.prototype);
Region.prototype.constructor = Region;
Region.prototype.update = function() {
    this.tilePositionPoint.x+=0.3;
    this.tilePositionPoint.y+=0.3;

    this.visible = new Phaser.Rectangle(this.game.camera.x, this.game.camera.y, this.game.camera.width, this.game.camera.height).intersects(new Phaser.Rectangle(this.x, this.y, this.width, this.height))

    if (this.visible) {
        var nw, n, ne, e, se, s, sw, w;


        var xIsGreaterThanZero = this.region.x > 0;
        var xIsLessThanMax = this.region.x < 19;
        var yIsGreaterThanZero = this.region.y > 0;
        var yIsLessThanMax = this.region.y < 19;

        w = (xIsGreaterThanZero) ? this.regionObjects[this.region.y][this.region.x - 1].region.faction === this.region.faction : 0;
        nw = (xIsGreaterThanZero && yIsGreaterThanZero) ? this.regionObjects[this.region.y - 1][this.region.x - 1].region.faction === this.region.faction : 0;
        n = (yIsGreaterThanZero) ? this.regionObjects[this.region.y - 1][this.region.x].region.faction === this.region.faction : 0;
        ne = (xIsLessThanMax && yIsGreaterThanZero) ? this.regionObjects[this.region.y - 1][this.region.x + 1].region.faction === this.region.faction : 0;
        e = (xIsLessThanMax) ? this.regionObjects[this.region.y][this.region.x + 1].region.faction === this.region.faction : 0;
        se = (xIsLessThanMax && yIsLessThanMax) ? this.regionObjects[this.region.y + 1][this.region.x + 1].region.faction === this.region.faction : 0;
        s = (yIsLessThanMax) ? this.regionObjects[this.region.y + 1][this.region.x].region.faction === this.region.faction : 0;
        sw = (xIsGreaterThanZero && yIsLessThanMax) ? this.regionObjects[this.region.y + 1][this.region.x - 1].region.faction === this.region.faction : 0;

        this.region.difficulty = [nw, n, ne, e, se, s, sw, w].reduce(function (a, b) {
            return a + b;
        }, 0);
    }
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
