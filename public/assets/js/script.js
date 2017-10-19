var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});
var ship;
var cursorKeys;

var speed = 0;

function preload() {
    game.load.image("ship", "assets/media/ship.png");
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);


    ship = game.add.sprite(200, 200, "ship");
    game.physics.arcade.enable(ship);
    ship.anchor.setTo(0.5, 0.5);

    cursorKeys = game.input.keyboard.createCursorKeys();
}

function update() {


    //ship.body.x += Math.sin(ship.body.rotation) * 10;
    //ship.body.y += Math.cos(ship.body.rotation) * 10;
    //ship.body.rotation += 0.1;



    //ship.body.rotation = 5;

    if (cursorKeys.right.isDown) ship.body.angularVelocity +=4;
    if (cursorKeys.left.isDown) ship.body.angularVelocity -=4;
    if (cursorKeys.up.isDown) speed+=10;
    if (cursorKeys.down.isDown) speed-=10;

    ship.body.velocity = game.physics.arcade.velocityFromAngle(ship.body.rotation, speed);

    if (speed > 0) speed--;
    if (speed < 0) speed++;
}