var game = new Phaser.Game(800, 600, Phaser.AUTO, "game");
var socket = null;
var currentMusic = null;
var lastPosition = {
    x: 0,
    y: 0
};

if (localStorage.getItem("lastPosition") !== null) {
    lastPosition = JSON.parse(localStorage.getItem("lastPosition"));
}

game.state.add("preboot", prebootState);
game.state.add("boot", bootState);
game.state.add("openworld", openworldState);
game.state.add("battle", battleState);
game.state.start("preboot");

