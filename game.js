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
let game = document.querySelector('#game');
//Initialize board
let ctx = game.getContext("2d");
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
    let firstBack = new GameObject(0, 0, 'grey', 32, 600);
    let secondBack = new GameObject(32, 0, 'grey', 32, 600);
    let thirdBack = new GameObject(64, 0, 'grey', 32, 600);
    let fourthBack = new GameObject(96, 0, 'grey', 32, 600);
    let fifthBack = new GameObject(128, 0, 'grey', 32, 600);
    let sixthBack = new GameObject(160, 0, 'grey', 32, 600);
    let seventhBack = new GameObject(192, 0, 'grey', 32, 600);
    let eightBack = new GameObject(224, 0, 'grey', 32, 600);
    let ninthBack = new GameObject(256, 0, 'grey', 32, 600);
    firstBack.render();
    secondBack.render();
    thirdBack.render();
    fourthBack.render();
    fifthBack.render();
    sixthBack.render();
    seventhBack.render();
    eightBack.render();
    ninthBack.render();
    //Use this to make background
}

//Load DOM
window.addEventListener("DOMContentLoaded", 
function(e){
    (function(){
        console.log(makeCanvas);
        console.log(penguinCharacter);
        penguinCharacter();
        console.log(gameLoop);
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
    penguin = new GameObject(32, 100, 'black', 32, 32);
}

//Background generator
function backgroundGenerator(){

}

let x = 0;
//Keyboard controls
function keyboardControls(e) {
    switch(e.key){
        case 'w': case 'ArrowUp':
            if(x < 1){
            x++;
            for(let i = 0; i < 32; i++){
                penguin.y > 0? penguin.y -= 1 : null;
            }
            for(let i = 0; i < 32; i++){
                setTimeout(function(){
                    penguin.y > 0? penguin.y += 1 : null;
                }, 400);
            }
            setTimeout(function(){
                x = 0;
            }, 500);
            }
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
//See if key is pressed
document.addEventListener('keydown', keyboardControls);

//Character lose function 

//Falling rock function

//Trick function

/*Ghost enemy function:
Either duck, or jump to get past them alive
*/

//Detect hit

//Game loop
function gameLoop(){
    setInterval(function(){
        ctx.clearRect(0, 0, game.width, game.height)
        makeCanvas();
        penguin.render();
    }, 100);
}

//Back button