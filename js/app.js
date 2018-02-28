/**
* @description - Represents a ladybug to avoid.
* @constructor
*/

var Enemy = function() {
    var rowSelect = [101, 303, 505],
    colSelect = [63, 146, 229, 312],
    row = (Math.floor(Math.random()*3)),
    col = (Math.floor(Math.random()*4));

    this.x = rowSelect[row];
    this.y = colSelect[col];
    this.w = 101;
    this.l = 171;
    this.sprite = 'images/enemy-bug.png';
};

//Enemy update controls position and speed.
Enemy.prototype.update = function(dt) {
    this.step = 50;
    this.x += this.step * player.level * dt;
    if (this.x > 505) {
        var colSelect = [63, 146, 229, 312];
        var col = (Math.floor(Math.random()*4));
        this.x = -101;
        this.y = colSelect[col];
    }
    this.checkCollision();
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Enemy prototype will check if it collides with the player.
Enemy.prototype.checkCollision = function(){
    if ((player.x - player.w/2) - this.x < 0 &&
        (this.x - this.w/2) - player.x < 0 &&
        player.y - (this.y + this.w/2) < 0 &&
        (this.y - this.w/2) - player.y < 0) {
            for (var i = 0; i < 3; i++) {
                player.blinkOff();
                player.blinkOn();
            };
            player.count++;
            if (player.count == 3) {
                player.level = 1;
                resetEnemies();
                player.count = 0;
            }
            player.move(202, 395);
    }
};

/**
* @description - Represents the player we will control.
* @constructor
*/

function player() {
    this.w = 101;
    this.l = 171;
    this.x = 202;
    this.y = 395;
    this.sprite = 'images/char-boy.png';
    this.count = 0;
    this.level = 1;
}

player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
};

player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

player.prototype.move = function(x, y) {
    this.x = x;
    this.y = y;
    player.render();
};

player.prototype.blinkOff = function() {
    for (var i = time; i < time + 30; i++) {
        player.sprite = 'images/char-boy2.png';
    };
};

player.prototype.blinkOn = function() {
    for (var i = time; i < time + 30; i++) {
        player.sprite = 'images/char-boy.png';
    };
};

player.prototype.handleInput = function(key){
    // LEFT
    if (key == "left" && this.x > 0) {
        this.move(this.x - 101, this.y);
    // UP
    } else if (key == "up" && this.y > -20) {
        this.move(this.x, this.y - 83);
    // UP: LEVEL COMPLETE
    } else if (key == "up" && this.y == -20) {
        resetEnemies();
        this.move(202, 395);
        this.level++;
        allEnemies.push(new Enemy());
        console.log(time);
    // RIGHT
    } else if (key == "right" && this.x < 404) {
        this.move(this.x + 101, this.y);
    // DOWN
    } else if (key == "down" && this.y != 395) {
        this.move(this.x, this.y + 83);
    }
};

var allEnemies = [];

for (var i = 0; i < 5; i++) {
    allEnemies.push(new Enemy());
}

resetEnemies = function(){
    allEnemies = [];
    for (var i = 0; i < 5; i++) {
        allEnemies.push(new Enemy());
    }
};


var player = new player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});