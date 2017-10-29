WorldStats = function(game, worldpercent) {
    Phaser.Sprite.call(this, game, 0, 0, null);

    game.add.existing(this);

    this.anchor = new Phaser.Point(0.5, 0.5);

    this.graph = game.add.graphics(0, 0);

    this.addChild(this.graph);

    this.worldpercent = worldpercent;
    this.game = game;
};

WorldStats.prototype = Object.create(Phaser.Sprite.prototype);
WorldStats.prototype.constructor = WorldStats;
WorldStats.prototype.update = function() {
    this.x = this.game.camera.x + this.game.camera.width - 8;
    this.y = this.game.camera.y + this.game.camera.height - 8;

    this.graph.angle = 180;
    this.graph.clear();
    this.graph.lineStyle(1, 0xffffff);
    this.graph.beginFill(0x0000ff);
    this.graph.drawRect(16, 0, 8, this.worldpercent.TRRA);
    this.graph.endFill();
    this.graph.beginFill(0xff0000);
    this.graph.drawRect(8, 0, 8, this.worldpercent.BOLT);
    this.graph.endFill();
    this.graph.beginFill(0xffffff);
    this.graph.drawRect(0, 0, 8, this.worldpercent.FREE);
    this.graph.endFill();
};