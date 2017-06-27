
var Engine = (function(global) {
    
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    function main() {
     
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
       
        update(dt);
        render();        
        lastTime = now;

        win.requestAnimationFrame(main);
    }

   
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
    }

    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
           
           if(checkRange(enemy.x,player.x)==true && enemy.y == player.y){
           
             alert("Bad move. You stepped into a bug-zone. YOU LOST");
             reset();           
            }   

         enemy.update(dt);
           });

        player.update();       
    }

    var checkRange = function(enemyX, playerX){
       
       var min= Math.ceil(enemyX)-40;
       var max= Math.ceil(enemyX)+10;

       playerX= Math.abs(playerX)
        
       if(playerX > min && playerX < max) return true;
       
       return false;

    }

    function render() {
             var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

       renderEntities();
    }

    function renderEntities() {

        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }

    function reset() {
             player.x=200;
             player.y=400;
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(init);
    global.ctx = ctx;
})(this);
