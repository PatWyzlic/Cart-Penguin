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

//Load DOM
//Initialize game section in html
let game = document.querySelector('#game');
//Initialize board
let ctx = game.getContext("2d");
//Initialize penguin
let penguin;
//Initialize rails
let rails;

let barriers;
//Score
let score = document.querySelector('#score');
let scoreNumber = 0;
score.textContent = `Score: ${scoreNumber}`; 
//Initialize keyboard movement
let keyboardMovement = document.querySelector('keyboard-movement');
//Image of character
let imgObj = new Image();
let railObj = new Image();
let barrierObj = new Image();

let penguinX = 29;
let penguinY = 100;

let gameOver = false;
//Win for escaping the mine
//Score Board

//Instructions page

//Canvas function
//10 blocks of 30 on board to get locations
if(gameOver === false){
window.addEventListener("DOMContentLoaded", 
function(e){
    (function(){
        generator();
        game.imageSmoothingEnabled = true;
        imgObj.src ="/Cart-Penguin/Images/Penguin-in-cart.png"

        imgObj.onload = function(){
            penguinCharacter(imgObj, penguinX, penguinY, 32, 32);
        }
        railObj.src = "/Cart-Penguin/Images/rails.png";
        railObj.onload = function(){
            railObj.imageSmoothingEnabled = true;
            railHandler(railObj, 400, 100, 31, 32);
        }
        barrierObj.src = "/Cart-Penguin/Images/Barrier.png";
        barrierObj.onload = function(){
            barrierHandler(barrierObj, 400, 100, 31, 32);
        }
        requestAnimationFrame(gameLoop);  
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

//Rail Images
function railHandler(img, x, y, sizeOne, sizeTwo){
    rails = ctx.drawImage(img, x, y, sizeOne, sizeTwo);
    return rails;
}
/*
class NewImage {
    constructor(img, name, objName, x, y, sizeOne, sizeTwo){
        this.img = img;
        this.name = name;
        this.objName = new Image();
        this.x = x;
        this.y = y;
        this.sizeOne = sizeOne;
        this.sizeTwo = sizeTwo;
    }
}
let test = new NewImage()
*/
//Barrier Images
function barrierHandler(img, x, y, sizeOne, sizeTwo){
    barriers = ctx.drawImage(img, x, y, sizeOne, sizeTwo);
    return barriers;
}

//Background generator
let gameArray = [1, 1, 1, 1, 1, 1, 1, 1, 1];
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
let lastToGo = ['Hi'];
let nextScene = true;
let d = 0;
function generator(){
        let newRandom = Math.floor(Math.random() * 10);
        let randTime = Math.floor(Math.random() * 1000 + 1000);  
        let l = 9;
    //Barrier scene
    if(newRandom < 4 && nextScene === true && lastToGo[0] !== 'Barrier'){
        nextScene = false;
        lastToGo.fill('Barrier', 0, 1);
        console.log(lastToGo);
        for(let i = 0; i < 10; i++){  
            railHandler(railObj, 30,  100, 32, 32);
            hitLost(30*l, 99);
            setTimeout(() => {
                if(scenes[i][l] === 2){
                    let v = (l + 1) * 30;
                        barrierHandler(barrierObj, 30 * l,  100, 32, 32);
                        ctx.clearRect(v , 103, 32, 32);
                        if(l < 9){
                            if(l < 1){  
                                hitLost(30*l, 99);
                                ctx.clearRect(0 , 103, 32, 32);
                                railHandler(railObj, 0,  100, 
                                32, 32)
                            }
                            railHandler(railObj, v,  100, 32, 32);
                        }
                        l--;
                }
                setInterval(() => {
                    ctx.clearRect(30 , 73, 32, 32);
                    penguinCharacter(imgObj, penguinX, penguinY, 32, 32);
                }, 50);
            }, i * 200);
        }
        setTimeout(() => {
            scoreNumber++;
            score.textContent = `Score: ${scoreNumber}`; 
            nextScene = true;
        }, randTime);
    }
    //Gap in tracks scene
    else if(newRandom < 8 && 
        newRandom > 4 &&nextScene === true && lastToGo[0] !== 'Gap'){
        lastToGo.fill('Gap', 0, 1);
        for(let i = 0; i < 10; i++){  
            setTimeout(() => {
                if(scenes[i][l] === 2){
                    let v = (l + 1) * 30;
                    let back = new GameObject(30 * l, 120, 'black', 32, 32);
                    back.render();
                    let backTwo = new GameObject(30 * l, 110, 'grey', 32, 20);
                    console.log(penguinX, penguinY);
                    hitLost(30*l, 99);
                    back.render();
                    backTwo.render();
                    console.log(30*l, 110);
                        ctx.clearRect(v , 120, 32, 32);
                        if(l < 9){
                            if(l < 1){
                                hitLost(30*l, 99);
                                ctx.clearRect(0 , 120, 32, 32);
                                railHandler(railObj, 0,  100, 
                                32, 32)
                            }
                            railHandler(railObj, v,  100, 32, 32);
                        }
                        l--;
                }
                setInterval(() => {
                    ctx.clearRect(30 , 73, 32, 32);
                    penguinCharacter(imgObj, penguinX, penguinY, 32, 32);
                }, 50);
            }, i * 200);
        }
        setTimeout(() => {
            scoreNumber++;
            score.textContent = `Score: ${scoreNumber}`; 
            nextScene = true;
        }, randTime);
        
    }
    //Rails On Screen
    else if(nextScene === true && newRandom > 8 || d < 1){
        nextScene = false;
    for(let i = 0; i < 10; i++){  
        lastToGo.fill('Rails', 0, 1);
        d++;
            setTimeout(() => {
                if(scenes[i][l] === 2){
                    let v = (l + 1) * 30;
                        railHandler(railObj, 30 * l,  100, 32, 32);
                        ctx.clearRect(v , 103, 32, 32);
                        if(l < 9){
                            if(l < 1){
                                ctx.clearRect(0 , 103, 32, 32);
                                railHandler(railObj, 0,  100, 
                                32, 32);
                            }
                            railHandler(railObj, v,  100, 32, 32);
                        }
                        l--;
                }
                setInterval(() => {
                    ctx.clearRect(30 , 73, 32, 32);
                    penguinCharacter(imgObj, penguinX, penguinY, 32, 32);
                }, 50);
            }, i * 200);
        }
        setTimeout(() => {
            nextScene = true;
        }, randTime);
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
                ctx.clearRect(30 , 98, 32, 32);
                railHandler(railObj, 30, 100, 32, 32);
                penguinY > 0? penguinY -= 1 : null;
                
            }
            for(let i = 0; i < 32; i++){
                setTimeout(function(){
                    penguinY > 0? penguinY += 1 : null;
                }, 600);
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
function hitLost(objectX, objectY){
    if(objectX <= 31 && penguinY >= objectY){
        gameOver = true;
        console.log("lost");
        return gameOver;
    }
}

//Falling rock function

//Trick function

/*Ghost enemy function:
Either duck, or jump to get past them alive
*/

//Detect hit

//Game loop
function gameLoop(){ 
    let theInterval = setInterval(function() {
        generator();
        if(gameOver === true){
            let newLost = document.querySelector('#game');
            newLost.remove();
            let gameContainer = document.querySelector('#game-container');
            gameContainer.innerHTML = `<h1>YOU LOST, TRY AGAIN</h1>`
            gameOver = true;
            clearInterval(theInterval);
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
    }, 1000);   
}
//Back button
}
