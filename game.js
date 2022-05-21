/* 
Penguin in minecart jumping over obstacles in 2d. (Inspired by club penguin cart surfer)

Falling rocks(Ducking), 
jumping minecart,
tricks for extra points, 
gaps in the tracks,
barriers to jump over,
ghost enemy

Background scrolls right to left
tracks at bottom of screen for the minecart

Uses HTML, CSS, and JavaScript/ JS Canvas
*/

//Initialize game section in html
let game = document.getElementById('#game');
//Initialize board
let ctx = game.getContext('2d');
//Initialize penguin
let penguin;
//Score
let score = document.querySelector('#score');
//Initialize keyboard movement
let keyboardMovement = document.querySelector('keyboard-movement');

//Win for escaping the mine
//Score Board

//Instructions page

//Canvas function
function makeCanvas(){
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);
}

//Load DOM
window.addEventListener("DOMContentLoaded", 
function(e){
    (function(){
        //makeCanvas();
        penguinCharacter();
        gameLoop();
    })()
});

//Character class
class GameObject {
    constructor(x, y, color, width, height){
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
        this.alive = true;
    }
    //Render function
    render(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

//Character Function
function penguinCharacter(){
    penguin = new GameObject(10, 10, 'blue', 32, 32);
}

//Background function

//Background generator

//Keyboard controls
function keyboardControls(e) {
    switch(e.key){
        case 'w':
        case 'ArrowUp':
            break;
        case 's':
        case 'ArrowDown':
            break;
        case 'a':
        case 'ArrowLeft':
            break;
        case 'd':
        case 'ArrowRight':
            break;
    }
}

//Character lose function 

//Falling rock function

//Trick function

/*Ghost enemy function:
Either duck, or jump to get past them alive
*/

//Detect hit

//Game loop
function gameLoop(){
    setTimeout(function(){
        penguin.render();
    }, 100);
}

//Back button