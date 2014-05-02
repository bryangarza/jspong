require (["pixi",   "keydrown"],
function ( PIXI,     kd) {

var width = 600;
var height = 400;
var xpadding = 20;
var moveDistance = 5;

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

    image.anchor.x = 0.5;
    image.anchor.y = 0.5;

    image.position.x = x;
    image.position.y = y;

    stage.addChild(image);
    return image;
}

function move (what, amount) {
    var edgeTop = what.position.y - 50;
    var edgeBot = what.position.y + 50;

    if (edgeTop === 0 && amount > 0) {
        what.position.y += amount;
    }
    else if (edgeBot === height && amount < 0) {
        what.position.y += amount;
    }
    else if (edgeTop > 0 && edgeBot < height) {
        what.position.y += amount;
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
var enemy = stageImage("./blackpaddle.png", width - xpadding, height / 2);
var ball = stageImage("./ball.png", width / 2, height / 2);

kd.UP.down(moveUp);
kd.DOWN.down(moveDown);

function animate() {

    // keyboard handler
    kd.tick();
    requestAnimFrame( animate );
    renderer.render(stage);
}

requestAnimFrame( animate );
});
