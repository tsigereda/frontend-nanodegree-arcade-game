// Enemies our player must avoid
var Enemy = function(x,y,z) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = z;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
   
    if(this.x == player.x && this.y==player.y) console.log("overlapp");
    if(this.x < 505){

    this.x +=(this.speed*dt);
    }
    else
    this.x=0;
   
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
     this.sprite = 'images/char-boy.png';
     this.x= 200;
     this.y=400;
};

Player.prototype.update = function(dt) {
    
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function(){
      player.x=200;
      player.y=400;
}

Player.prototype.handleInput = function (key){
    switch (key){
        case ("left"):
            if(this.x-101 >= -101) this.x -= 102 ;
            logging();
            break;

        case ("up"):
            if(this.y - 83 >= 0) {
                this.y -= 83;  
                logging();         
                break; 
            }            
            else {      
                this.y -=83;  
               
                alert("Congrats - This move lets you get to the safe zone!");                 
                restart();      
                break;
             }

        case ("right"):
            if(this.x + 101 <= 404) this.x += 101;
            logging();
            break;

        case ("down"):
            if(this.y + 83 <= 404) this.y += 83;
            logging();
            break;
        
    };
};

var enemy1 = new Enemy(0,68,70), enemy2= new Enemy(0, 151, 100), enemy3 = new Enemy(0, 234, 180);
var allEnemies= [ enemy1, enemy2, enemy3];    

var player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
     player.handleInput(allowedKeys[e.keyCode]);         
            
});

var logging = function(){
    allEnemies.forEach(function(element) {
        console.log( "Enemy on" + element.x + "," + element.y);
         }, this);
         console.log("player is at" + Math.abs(player.x) + "," + player.y);
}

var restart = function(){
   var response = prompt("do you want to play again? Type Y if you want to continue playing or N otherwise");
   if(response === "Y" || response === "y") player.reset();
}