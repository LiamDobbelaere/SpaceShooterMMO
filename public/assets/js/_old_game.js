var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});
var ship;
var cursorKeys;

var speed = 0;

function preload() {
    game.load.image("ship", "assets/media/ship.png");
    game.load.image("space", "assets/media/space.png");
}

function create() {
    var fragmentSrc = [
        "precision lowp float;",
        "varying vec2 vTextureCoord;",
        "varying vec4 vColor;",
        'uniform sampler2D uSampler;',

        'void main() {',
        'vec4 sum = vec4(0);',
        'vec2 texcoord = vTextureCoord;',
        'for(int xx = -4; xx <= 4; xx++) {',
        'for(int yy = -3; yy <= 3; yy++) {',
        'float dist = sqrt(float(xx*xx) + float(yy*yy));',
        'float factor = 0.0;',
        'if (dist == 0.0) {',
        'factor = 2.0;',
        '} else {',
        'factor = 2.0/abs(float(dist));',
        '}',
        'sum += texture2D(uSampler, texcoord + vec2(xx, yy) * 0.002) * factor;',
        '}',
        '}',
        'gl_FragColor = sum * 0.015 + texture2D(uSampler, texcoord);',
        '}'
    ];

    this.game.renderer.renderSession.roundPixels = true;

    game.world.setBounds(0, 0, 2000, 2000);

    game.add.tileSprite(0, 0, 2000, 2000, "space");

    var scanlineFilter = new Phaser.Filter(game, {
        intensity: {
            type: "1f",
            value: 1.0
        }
    }, fragmentSrc);
    game.world.filters = [scanlineFilter];

    game.physics.startSystem(Phaser.Physics.ARCADE);


    ship = game.add.sprite(200, 200, "ship");
    game.physics.arcade.enable(ship);
    ship.anchor.setTo(0.5, 0.5);

    cursorKeys = game.input.keyboard.createCursorKeys();
    game.camera.shakeIntensity = 100;

    game.camera.follow(ship, null, 0.3, 0.3);
    //game.camera.shake(0.05, 500, false, Phaser.Camera.SHAKE_BOTH, true)

}

function update() {
    if (cursorKeys.right.isDown) ship.body.rotation = 90;
    if (cursorKeys.left.isDown) ship.body.rotation = -90;
    if (cursorKeys.up.isDown) speed=800;
    if (cursorKeys.up.isUp && cursorKeys.down.isUp) speed=0;
    if (cursorKeys.down.isDown) speed=-800;

    ship.body.velocity = game.physics.arcade.velocityFromAngle(ship.body.rotation, speed);

    if (speed > 0) speed--;
    if (speed < 0) speed++;

}