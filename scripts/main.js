require (["pixi",   "keydrown"],
function ( PIXI,     kd) {

var width = 600;
var height = 400;
var xpadding = 20;
var moveDistance = 5;

var ballMoveX = -3;
var ballMoveY = 2;

function stageMap() {
    // create a new instance of a pixi stage
    var stage = new PIXI.Stage(0x66FF99);

    // create a new renderer instance
    var renderer = PIXI.autoDetectRenderer(width, height);

    // add the renderer view element to the DOM
    document.body.appendChild(renderer.view);

    return [stage, renderer];
}

function stageImage(file, x, y) {
    // create a texture from an image path
    var texture = PIXI.Texture.fromImage(file);
    //create a new Sprite using the texture
    var image = new PIXI.Sprite(texture);

    // these are the default values
    image.anchor.x = 0;
    image.anchor.y = 0;

    image.position.x = x;
    image.position.y = y;

    stage.addChild(image);
    return image;
}

function move (what, amount) {
    var y = what.position.y;

    // if position of paddle is at top or bottom
    if ((y <= 0 && amount < 0) || (y + what.height >= height && amount > 0)) {
        amount = 0;
    }

    what.position.y += amount;
}

function moveBall () {
    // x-coord of right side of ball
    var br = ball.position.x + ball.width;

    // if moving the ball more will take it past the right side of the paddle
    if (ball.position.x + ballMoveX <= player.position.x + player.width) {
        // if ball is at or below top edge of paddle
        if (ball.position.y >= player.position.y) {
            // if ball bot edge is at or above bot edge of paddle
            if (ball.position.y + ball.width <= player.position.y + player.height) {
                ball.position.x = player.position.x + player.width;
                ballMoveX = -ballMoveX;
            }
        }
    }
    if (br + ballMoveX >= enemy.position.x) {
        if (ball.position.y >= enemy.position.y) {
            if (ball.position.y + ball.width <= enemy.position.y + enemy.height) {
                ball.position.x = enemy.position.x - ball.width;
                ballMoveX = -ballMoveX;
            }
        }
    }
    // top / bot edge, reverse y direction
    else if (ball.position.y <= 0 || ball.position.y >= height - ball.width) {
        ballMoveY = -ballMoveY;
    }

    ball.position.x += ballMoveX;
    ball.position.y += ballMoveY;
}

function AI() {
    m = enemy.width / 2;

    // move down if ball is above center of paddle
    if (ball.position.y <= enemy.position.y + m) {
        move (enemy, -5)
    }
    // move up if ball is below center of paddle
    else if (ball.position.y >= enemy.position.y + m) {
        move (enemy, 5)
    }
}

function moveUp(e) {
    move(player, - moveDistance);
}

function moveDown(e) {
    move(player, moveDistance);
}

var mapObjs = stageMap();
var stage = mapObjs[0];
var renderer = mapObjs[1];

var player = stageImage("./blackpaddle.png", xpadding, height / 2);
// 20 is the width of this specific paddle img
var enemy = stageImage("./blackpaddle.png", width - xpadding - 20, height / 2);
var ball = stageImage("./ball.png", width / 2, height / 2);

kd.UP.down(moveUp);
kd.DOWN.down(moveDown);

function animate() {

    // keyboard handler
    kd.tick();
    AI();
    moveBall();
    requestAnimFrame( animate );
    renderer.render(stage);
}

requestAnimFrame( animate );
});
