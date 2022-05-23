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

let barriers;
//Score
let score = document.querySelector('#score');
//Initialize keyboard movement
let keyboardMovement = document.querySelector('keyboard-movement');
//Image of character
let imgObj = new Image();
let railObj = new Image();
let barrierObj = new Image();

let penguinX = 29;
let penguinY = 100;

//Win for escaping the mine
//Score Board

//Instructions page

//Canvas function
//10 blocks of 30 on board to get locations

//Load DOM
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
//let theStatus = true;
//let b = 10;
//let h = 0;
let nextScene = true;
function generator(){
        let newRandom = Math.floor(Math.random() * 10);  
        let l = 9;
    if(newRandom < 6 && nextScene === true){
        nextScene = false;
        for(let i = 0; i < 10; i++){  
            setTimeout(() => {
                if(scenes[i][l] === 2){
                    let v = (l + 1) * 30;
                        barrierHandler(barrierObj, 30 * l,  100, 32, 32);
                        ctx.clearRect(v , 103, 32, 32);
                        if(l < 9){
                            if(l < 1){
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
        nextScene = true;
    }
    else if(nextScene === true){
        nextScene = false;
    for(let i = 0; i < 10; i++){  
            setTimeout(() => {
                if(scenes[i][l] === 2){
                    let v = (l + 1) * 30;
                        railHandler(barrierObj, 30 * l,  100, 32, 32);
                        ctx.clearRect(v , 103, 32, 32);
                        if(l < 9){
                            if(l < 1){
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
        nextScene = true;
    }
    
    // const gapOne = new GameObject(30 * (a), 135, 'black', 30, 40);
    //gapOne.render();
    /*if(newRandom === 1){
        }else if(newRandom === 2){
        }else if(gameArray[i] === 3){
            const gapOne = new GameObject(30 * i, 130, 'black', 30, 40);
            gapOne.render();
        }
    }*/
    /*let o = 9;
    function makeRails(){
        for (let i = 1; i <= 10; i++) {
        setTimeout(function timer(){
                railHandler(railObj, 30 * o,  100, 30, 32);
                o--;
            }, i * 200);
        }
        o = 9;
    }
    let z = 9;
    function makeBarriers(){
        for (let i = 1; i <= 10; i++) {
        setTimeout(function timer(){
                barrierHandler(barrierObj, 30 * z,  100, 30, 32);
                z--;
            }, i * 200);
        }
        z = 9;
    }
    function theBackground(){
        let a = 0;
        for(let i = 0; i < 30; i++){        
            let back = new GameObject(a, 0, 'grey', 32, 130);
            let backBottom = new GameObject(a, 125, 'darkgrey', 32, 80);
            back.render();
            backBottom.render();
            a += 30;
        }
    }
    theBackground();
    let newRandom = Math.floor(Math.random() * 10);
    let randTime = Math.floor(Math.random() * 1000) + 2000;
    
    const gapOne = new GameObject(x, 130, 'black', 30, 40);
    const gapTwo = new GameObject(x, 130, 'black', 30, 50);
    if(h < 10){
        makeRails();
        h++;
    }else if(newRandom >= 9 && theStatus === true){
        theStatus = false;
        for (let i = 1; i <= 10; i++) {
            setTimeout(function timer(){
                gapOne.x = 30 * a;
                gapTwo.x = 30 * b;
                gapOne.render();
                gapTwo.render();
            a--;
            b--;
            }, i * 200);
        }
        a = 9;
        b = 10;
        setTimeout(() => {
            theStatus = true;
        }, randTime);
    }else if(newRandom >= 7 && newRandom <= 8 && theStatus === true){
        theStatus = false;
        makeBarriers();
        setTimeout(() => {
            theStatus = true;
        }, randTime);
    }else if(newRandom < 7 && theStatus === true){
        makeRails();
    }else if (a < 9){
        makeRails();
    }*/
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

//Falling rock function

//Trick function

/*Ghost enemy function:
Either duck, or jump to get past them alive
*/

//Detect hit

//Game loop
function gameLoop(){ 
    setInterval(() => {
        generator(); 
    }, 1000); 
}
//Back button