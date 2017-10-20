var game = new Phaser.Game(800, 600, Phaser.AUTO, "game");

game.state.add("openworld", openworldState);

game.state.start("openworld");