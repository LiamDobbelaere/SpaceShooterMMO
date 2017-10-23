var game = new Phaser.Game(800, 600, Phaser.AUTO, "game");
var socket = null;

game.state.add("boot", bootState);
game.state.add("openworld", openworldState);
game.state.add("battle", battleState);
game.state.start("boot");