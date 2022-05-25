/* 
Penguin in minecart jumping over obstacles in 2d. (Inspired by club penguin cart surfer)

Falling rocks(Ducking), 
jumping minecart,
tricks for extra points, 
gaps in the tracks,
barriers to jump over,
ghost enemy

Background scrolls right to left, auto generated
tracks at bottom of screen for the minecart

Uses HTML, CSS, and JavaScript/ JS Canvas
*/

//Initialize game section in html
let game = document.querySelector('#game');
//Initialize board
let ctx = game.getContext("2d");
ctx.imageSmoothingEnabled = true;
//Initialize penguin
let penguin;
//Initialize ducking penguin
let duckingPenguin;
//Initialize rails
let rails;
//Initialize barriers
let barriers;
//Score Board
let score = document.querySelector('#score');
let scoreNumber = 0;
//Initialize keyboard movement
let keyboardMovement = document.querySelector('keyboard-movement');
//Storage location for penguin image
let penguinObj = new Image();
//Storage location for ducking penguin image
let duckingPenguinObj = new Image();
//Storage location for rail image
let railObj = new Image();
//Storage location for barrier image
let barrierObj = new Image();
//Global initialization of penguin x and y
let penguinX = 29;
let penguinY = 100;
//Holds whether game ended or not
let gameOver = false;
//Win for escaping the mine

//Instructions page

//10 blocks of 30 on board to get locations
//Load DOM
window.addEventListener("DOMContentLoaded", 
function(e){
    (function(){
        score.textContent = `Score: ${scoreNumber}`; 
        penguinObj.src ="/Cart-Penguin/Images/Penguin-in-cart.png"

        penguinObj.onload = function(){
            imageHandler(penguin, penguinObj, penguinX, penguinY, 32, 32);
        }
        duckingPenguinObj.src = "/Cart-Penguin/Images/Ducking-Penguin.png";

        duckingPenguinObj.onload = function(){
            imageHandler(duckingPenguin, duckingPenguinObj, penguinX, penguinY, 32, 32);
        }
        railObj.src = "/Cart-Penguin/Images/rails.png";
        railObj.onload = function(){
            //Makes game start with rails
            imageHandler(rails, railObj, 0, 100, 31, 32);
            imageHandler(rails, railObj, 30, 100, 31, 32);
            imageHandler(rails, railObj, 60, 100, 31, 32);
            imageHandler(rails, railObj, 90, 100, 31, 32);
            imageHandler(rails, railObj, 120, 100, 31, 32);
            imageHandler(rails, railObj, 150, 100, 31, 32);
            imageHandler(rails, railObj, 180, 100, 31, 32);
            imageHandler(rails, railObj, 210, 100, 31, 32);
            imageHandler(rails, railObj, 240, 100, 31, 32);
            imageHandler(rails, railObj, 270, 100, 31, 32);
        }
        barrierObj.src = "/Cart-Penguin/Images/Barrier.png";
        barrierObj.onload = function(){
            imageHandler(barriers, barrierObj, 400, 100, 31, 32);
        }
        requestAnimationFrame(gameLoop);  
    })()
});

//Game loop
let newInterval = setInterval(function(){
    imageHandler(penguin, penguinObj, penguinX, penguinY, 32, 32);
}, 1000);
let alwaysOn = setInterval(function(){
    generator();
}, 1000);

function gameLoop(){
    //SetInterval to run game loop once a second
        if(gameOver === true){
            gameLost();
        }  
}

//Class to hold generated boxes
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
//Loads in all images
function imageHandler(imgVarName, img, x, y, sizeOne, sizeTwo){
    imgVarName = ctx.drawImage(img, x, y, sizeOne, sizeTwo);
    return imgVarName;
}

//Holds different background positions
const scenes = 
    [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 1],
    [1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [1, 1, 1, 2, 1, 1, 1, 1, 1, 1],
    [1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
//Makes sure to not repeat last obstacle
let lastToGo = ['Insert'];
//Waits for last scene to end before sending next object
let nextScene = true;
//If nothing was sent yet it sends out tracks first
let d = 0;
//Holds all obstacles
function generator(){
    /*
        //New number generated for randomizing scene
        let newRandom = Math.floor(Math.random() * 3);
        let randTime = Math.floor(Math.random() * 1000 + 1000);  
        let l = 9;
    //Barrier scene
    if(newRandom === 1 && nextScene === true && lastToGo[0] !== 'Barrier' && d > 4){
        nextScene = false;
        lastToGo.fill('Barrier', 0, 1);
        for(let i = 0; i < 10; i++){  
            imageHandler(rails, railObj, 30, 100, 32, 32);
            hitLost(30*l, 99);
            setTimeout(() => {
                if(scenes[i][l] === 2){
                    let v = (l + 1) * 30;
                        imageHandler(barriers, barrierObj, 30 * l,  100, 32, 32);
                        ctx.clearRect(v , 103, 32, 32);
                        if(l < 9){
                            if(l < 1){  
                                hitLost(30*l, 99);
                                ctx.clearRect(0 , 103, 32, 32);
                                imageHandler(rails, railObj, 30 * l,  100, 32, 32);
                            }
                            imageHandler(rails, railObj, v,  100, 32, 32);
                        }
                        l--;
                }
            }, i * 200);
        }
        setTimeout(() => {
            scoreNumber++;
            score.textContent = `Score: ${scoreNumber}`; 
            nextScene = true;
        }, randTime);
    }
    //Gap in tracks scene
    else if(newRandom === 2 && nextScene === true && lastToGo[0] !== 'Gap' && d > 4){
        lastToGo.fill('Gap', 0, 1 && d > 5);
        for(let i = 0; i < 10; i++){  
            setTimeout(() => {
                if(scenes[i][l] === 2){
                    let v = (l + 1) * 30;
                    let back = new GameObject(30 * l, 120, 'black', 32, 32);
                    back.render();
                    let backTwo = new GameObject(30 * l, 108, 'grey', 32, 20);
                    hitLost(30*l, 99);
                    back.render();
                    backTwo.render();
                        ctx.clearRect(v , 120, 32, 32);
                        if(l < 9){
                            if(l < 1){
                                hitLost(30*l, 99);
                                ctx.clearRect(0 , 120, 32, 32);
                                imageHandler(rails, railObj, 0,  100, 
                                32, 32)
                            }
                            imageHandler(rails, railObj, v,  100, 32, 32);
                        }
                        l--;
                }
            }, i * 200);
        }
        setTimeout(() => {
            scoreNumber++;
            score.textContent = `Score: ${scoreNumber}`; 
            nextScene = true;
        }, randTime);
        
    }
    //Rails On Screen
    else if(nextScene === true && newRandom === 3 && d < 6 || d < 4){
        nextScene = false;
    for(let i = 0; i < 10; i++){  
        lastToGo.fill('Rails', 0, 1);
        d++;
            setTimeout(() => {
                if(scenes[i][l] === 2){
                    let v = (l + 1) * 30;
                        imageHandler(rails, railObj, 30 * l,  100, 32, 32);
                        ctx.clearRect(v , 103, 32, 32);
                        if(l < 9){
                            if(l < 1){
                                ctx.clearRect(0 , 103, 32, 32);
                                imageHandler(rails, railObj, 0 * l,  100, 32, 32);
                            }
                            imageHandler(rails, railObj, v,  100, 32, 32);
                        }
                        l--;
                }
            }, i * 200);
        }
        setTimeout(() => {
            nextScene = true;
        }, randTime);
    }
    //Falling rock function*/
}

let h = 0;
let f = 0;
//Keyboard controls
let penguinUpInterval = setInterval(function(){
}, 1000);
let penguinDownInterval = setInterval(function(){
}, 1000);
let duckInterval = setInterval(function(){
}, 1000);

function keyboardControls(e) {
    switch(e.key){
        //Allows jump, but cannot float character
        case 'w': case 'ArrowUp':
            if(h < 1){
                /*
                let newInterval = setInterval(function(){
                    imageHandler(rails, railObj, 30, 100, 32, 32);
                    penguinY > 0? penguinY += 0 : null;
                }, 100);
            setTimeout(function(){
                clearInterval(newInterval);
                h = 0;
            }, 500);
            */
            clearInterval(newInterval);
            clearInterval(duckInterval);
            penguinUpInterval = setInterval(function(){
                ctx.clearRect(0, 0, game.width, game.height);
                imageHandler(penguin, penguinObj, penguinX, penguinY - 20, 32, 32);
            }, 1000);
            setTimeout(() => {
                clearInterval(penguinUpInterval);
                letPenguinDown = setInterval(() => {
                    ctx.clearRect(0, 0, game.width, game.height);
                    imageHandler(penguin, penguinObj, penguinX, penguinY, 32, 32);
                }, 1000);
                
            }, 1000);
            }
            break;
        case 's': case 'ArrowDown':
            /*if(h < 1){
                h++;
                for(let i = 0; i < 32; i++){
                    ctx.clearRect(30 , 98, 32, 32);
                    imageHandler(duckingPenguin, duckingPenguinObj, 30, 100, 32, 32);
                    //penguinY > 0? penguinY -= 0 : null;
                }
                for(let i = 0; i < 32; i++){
                    setTimeout(function(){
                    ctx.clearRect(30 , 98, 32, 32);
                    imageHandler(duckingPenguin, duckingPenguinObj, 30, 100, 32, 32);
                    penguinY > 0? penguinY += 0 : null;
                    }, 600);
                }
                setTimeout(function(){
                    h = 0;
                }, 700);*/
                clearInterval(newInterval);
                clearInterval(penguinUpInterval);
                duckInterval = setInterval(function(){
                ctx.clearRect(0, 0, game.width, game.height)
                imageHandler(duckingPenguin, duckingPenguinObj, penguinX , penguinY, 32, 32);
                gameLoop();
                }, 1000);
                break;
                //}
    }
}
//See if key is pressed
document.addEventListener('keydown', keyboardControls);

//Play id selector
const playButtonSelector = document.querySelector("#play");
//Adding listener for click
playButtonSelector.addEventListener('click', playButton);

//Select the lose area
const loseStateSelector = document.querySelector("#lose-state");
function playButton(){
    ctx.clearRect(0 , 0, game.width, game.height);
    gameOver = false;
    scoreNumber = 0;
    loseStateSelector.innerHTML = ``
}

//Detect hit 
function hitLost(objectX, objectY){
    if(objectX <= 31 && penguinY >= objectY){
        gameOver = true;
        console.log("lost");
        return gameOver;
    }
}
//Trick function
/*Ghost enemy function:
Either duck, or jump to get past them alive
*/
//Game lost function
function gameLost(){
    let gameIdSelector = document.querySelector('#game');
    gameIdSelector.innerHTML = 'Done';
            loseStateSelector.innerHTML = 'YOU LOST, TRY AGAIN'
            gameOver = true;
            score.innerHTML = `Calculating Score`;
            setTimeout(() => {
                if(scoreNumber > 1){
                    score.innerHTML = `Total Score! ${scoreNumber - 1}`;
                }else if(scoreNumber === 1){
                    score.innerHTML = `Total Score! ${scoreNumber}`;
                }else{
                    score.innerHTML = `Score: Try again`;
                }
            }, 5000);
}

