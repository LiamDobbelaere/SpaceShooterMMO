BattleGamemode = function(game, region, player, enemyGroup) {
    Phaser.Sprite.call(this, game, 0, 0, null);

    game.add.existing(this);

    this.anchor = new Phaser.Point(0.5, 0.5);

    var style = { font: "32px Arial", fill: "#ffffff", align: "center" };
    var timerText= game.add.text(this.x, this.y, "0:00", style);
    timerText.anchor.set(0.5);
    //text.setShadow(5, 5, 'rgba(0,0,0,0.7)', 5);
    timerText.stroke = "#000000";
    timerText.strokeThickness = 4;
    timerText.alpha = 1;

    this.timer = game.time.create();
    this.timer.loop(1000, this.timerTick, this);
    this.timer.start();

    this.timerText = timerText;
    this.game = game;

    this.region = region;
    this.player = player;
    this.enemyGroup = enemyGroup;

    this.minutes = 1;
    this.seconds = 15;

    this.timerSound = game.add.audio("time", 0.8, false);

    //this.enemyTimer = game.time.create();
    //this.enemyTimer.loop(1000 - ((this.region.difficulty + 1) * 100), this.spawnEnemy, this);
    //this.enemyTimer.start();

    new BoltEnemy(this.game, 0, 0, this.player, this.enemyGroup, this.region);
};

BattleGamemode.prototype = Object.create(Phaser.Sprite.prototype);
BattleGamemode.prototype.constructor = BattleGamemode;
BattleGamemode.prototype.update = function() {
    this.x = this.game.camera.x + this.game.camera.width / 2;
    this.y = this.game.camera.y + 16;

    this.timerText.x = this.x;
    this.timerText.y = this.y + 16;

    this.timerText.text = this.minutes.toString() + ":" + (this.seconds < 10 ? "0" : "") + this.seconds.toString();

};
BattleGamemode.prototype.timerTick = function () {
    if (--this.seconds < 0) {
        this.seconds = 59;
        this.minutes--;
    }

    if (this.seconds <= 10 && this.minutes === 0) {
        this.timerText.style.fill = "#ff0000";
        this.timerSound.play();
    } else {
        this.timerText.style.fill = "#ffffff";
    }

    if (this.seconds <= 0 && this.minutes <= 0) game.state.start("boot");
};
BattleGamemode.prototype.spawnEnemy = function () {
    var nb = new BoltEnemy(this.game, 0, 0, this.player, this.enemyGroup);

};