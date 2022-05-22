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
//Initialize rails
let rails;
//Score
let score = document.querySelector('#score');
//Initialize keyboard movement
let keyboardMovement = document.querySelector('keyboard-movement');
//Image of character
let imgObj = new Image();
let railObj = new Image();

let penguinX = 29;
let penguinY = 100;

//Win for escaping the mine
//Score Board

//Instructions page

//Canvas function
//10 blocks of 30 on board to get locations
function makeCanvas(){
    let a = 0;
    let b = 600;
    for(let i = 0; i < 30; i++){
            
        railHandler(railObj, b, 100, 30, 32);
            let back = new GameObject(a, 0, 'grey', 32, 600);
            back.render();
        a += 30;
        b -= 30;
    }
}

//Load DOM
window.addEventListener("DOMContentLoaded", 
function(e){
    (function(){
        makeCanvas();
        imgObj.src ="/Cart-Penguin/Images/Penguin-in-cart.png"
        imgObj.onload = function(){
            penguinCharacter(imgObj, penguinX, penguinY, 32, 32);
        }
        railObj.src = "/Cart-Penguin/Images/rails.png";
        railObj.onload = function(){
            railHandler(railObj, 30, 100, 31, 32);
        }
        gameLoop();
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                backgroundGenerator();
            }, i * 2000);
        }
    })()
});

//Class to hold generated areas
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
function penguinCharacter(img, x, y, sizeOne, sizeTwo){
    img = imgObj;
    penguin = ctx.drawImage(img, x, y, sizeOne, sizeTwo);
    return penguin;
}

//All other images
function railHandler(img, x, y, sizeOne, sizeTwo){
    rails = ctx.drawImage(img, x, y, sizeOne, sizeTwo);
    return rails;
}

//Background generator
function backgroundGenerator(){
    let a = 9;
    for (let i = 1; i <= 10; i++) {
        setTimeout(function timer(){
            let back = new GameObject(30 * a, 100, 'red', 30, 40);
            back.render();
            a--;
        }, i * 100);
    }
}

let x = 0;
//Keyboard controls
function keyboardControls(e) {
    switch(e.key){
        //Allows jump, but cannot float character
        case 'w': case 'ArrowUp':
            if(x < 1){
            x++;
            for(let i = 0; i < 32; i++){
                penguinY > 0? penguinY -= 1 : null;
            }
            for(let i = 0; i < 32; i++){
                setTimeout(function(){
                    (imgObj, 32, 100, 32, 32);
                    penguinY > 0? penguinY += 1 : null;
                }, 500);
            }
            setTimeout(function(){
                x = 0;
            }, 700);
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
        penguinCharacter(imgObj, penguinX, penguinY, 32, 32);
    }, 100);
}

//Back button