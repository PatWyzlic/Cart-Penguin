/* 
Penguin in minecart jumping over obstacles in 2d. (Inspired by club penguin cart surfer)
-Falling rocks, 
-jumping minecart,
-gaps in the tracks,
-barriers to jump over,
-Background scrolls right to left, auto randomized
-Uses HTML, CSS, and JavaScript/ JS Canvas
-Playlist of music from Club Penguin using Archive.org
*/
let totalGameBoard = document.querySelector("body");
//Initialize game section in html
let game = document.querySelector("#game");
//Initialize board
let ctx = game.getContext("2d");
ctx.imageSmoothingEnabled = true;
//Initialize penguin
let penguin;
//Initialize rails
let rails;
//Initialize barriers
let barriers;
//Score Board
let score = document.querySelector("#score");
let scoreNumber = 0;
//Initialize keyboard movement
let keyboardMovement = document.querySelector("keyboard-movement");
//Storage location for penguin image
let penguinObj = new Image();
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
let winState = false;
let t = 0;
let mainArray = [];
//Instructions page
//Load DOM then execute all code
window.addEventListener("DOMContentLoaded", function (e) {
  (function () {
    //Creates listener for interaction with play button
    let playButtonSelector = document.querySelector("#play");
    playButtonSelector.addEventListener("click", gameStarts);
    //Select the lose area button
    const loseStateSelector = document.querySelector("#lose-state");
    loseStateSelector.addEventListener("click", reload);
    //Hides the game canvas until player selects play
    game.style.visibility = 'hidden';
    //Reloads the game.js section whenever player presses try again
    function reload(){
    location.reload();
    }
    //Function that runs the game, runs on press of play
    function gameStarts() {
      //Shows canvas back on screen
      game.style.visibility = 'visible';
      //Removes play button so player can only press play once
      playButtonSelector.innerHTML = '';
      //
      function playButton() {
        ctx.clearRect(0, 0, game.width, game.height);
        gameOver = false;
        scoreNumber = 0;
        score.innerHTML = `Total Score! ${scoreNumber}`;
        loseStateSelector.innerHTML = ``;
      }
      if (t < 1) {
        playButton();
      }
      t++;
      score.textContent = `Score: ${scoreNumber}`;
      penguinObj.src = "/Cart-Penguin/Images/Penguin-in-cart.png";

      penguinObj.onload = function () {
        imageHandler(penguin, penguinObj, penguinX, penguinY, 32, 32);
      };
      railObj.src = "/Cart-Penguin/Images/rails.png";
      railObj.onload = function () {
        for(let i = 0; i < 10; i++){
          mainArray.push(imageHandler(rails, railObj, 30 * i, 100, 31, 32));
        }
      };
      barrierObj.src = "/Cart-Penguin/Images/Barrier.png";
      barrierObj.onload = function () {
        imageHandler(barriers, barrierObj, 400, 100, 31, 32);
      };
      if(gameOver === false){
        requestAnimationFrame(gameLoop);
      }
      //Game over function
      function gameLost() {
        cancelAnimationFrame(gameLoop);
        clearInterval(gameLoop.mainInterval);
        loseStateSelector.innerHTML = `You Lost, Play Again?`;
        game.style.visibility = 'hidden';
        gameOver = true;
        t = 0;
        score.innerHTML = 'Calculating Score';
        setTimeout(() => {
          if (scoreNumber > 1) {
            score.innerHTML = `Total Score! ${scoreNumber - 1}`;
          } else if (scoreNumber === 1) {
            score.innerHTML = `Total Score! ${scoreNumber}`;
          } else {
            score.innerHTML = `Score: Try again`;
          }
        }, 5000);
      }
      //Game loop
      function gameLoop() {
        //SetInterval to run game loop once a second
        let mainInterval = setInterval(function () {
          generator();
          if (scoreNumber > 21) {
            let gameWin = document.querySelector('#game-win');
            gameWin.innerHTML = 'YOU WON WHOO!!! Play Again?'
            gameWin.addEventListener("click", reload);
          }else if (gameOver === true) {
            gameLost();
          }
        }, 1000);
      }
      //Class to hold generated boxes (Gap and rock)
      class GameObject {
        constructor(x, y, color, width, height) {
          this.x = x;
          this.y = y;
          this.color = color;
          this.width = width;
          this.height = height;
        }
        //Render function
        render() {
          ctx.fillStyle = this.color;
          ctx.fillRect(this.x, this.y, this.width, this.height);
        }
      }
      //Loads in all images (Penguin in cart, barriers, rails)
      function imageHandler(imgVarName, img, x, y, sizeOne, sizeTwo) {
        imgVarName = ctx.drawImage(img, x, y, sizeOne, sizeTwo);
        return imgVarName;
      }

      //Holds different background positions
      const scenes = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
        [1, 1, 1, 1, 1, 1, 2, 1, 1, 1],
        [1, 1, 1, 1, 1, 2, 1, 1, 1, 1],
        [1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
        [1, 1, 1, 2, 1, 1, 1, 1, 1, 1],
        [1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ];
      //Makes sure to not repeat last obstacle
      let lastToGo = ["Insert"];
      //Waits for last scene to end before sending next object
      let nextScene = true;
      //If nothing was sent yet it sends out tracks first
      let d = 0;
      //Holds all obstacles
      function generator() {
        //New number generated for randomizing scene
        if(gameOver === false){
        let newRandom = Math.floor(Math.random() * 5);
        let randTime = Math.floor(Math.random() * 500 + 800);
        let l = 9;
        //Barrier scene
        if (
          newRandom === 1 &&
          nextScene === true &&
          lastToGo[0] !== "Barrier" &&
          d > 4 && gameOver === false
        ) {
          nextScene = false;
          lastToGo.fill("Barrier", 0, 1);
          for (let i = 0; i < 10; i++) {
            imageHandler(rails, railObj, 30, 100, 32, 32);
            hitLost(30 * l, 99);
            setTimeout(() => {
              if (scenes[i][l] === 2) {
                let v = (l + 1) * 30;
                imageHandler(barriers, barrierObj, 30 * l, 100, 32, 32);
                ctx.clearRect(v, 103, 32, 32);
                if (l < 9) {
                  if (l < 1) {
                    hitLost(30 * l, 99);
                    ctx.clearRect(0, 103, 32, 32);
                    imageHandler(rails, railObj, 30 * l, 100, 32, 32);
                  }
                  imageHandler(rails, railObj, v, 100, 32, 32);
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
        else if (
          newRandom === 2 &&
          nextScene === true &&
          lastToGo[0] !== "Gap" &&
          d > 4 && gameOver === false
        ) {
          lastToGo.fill("Gap", 0, 1);
          for (let i = 0; i < 10; i++) {
            setTimeout(() => {
              if (scenes[i][l] === 2) {
                let v = (l + 1) * 30;
                let back = new GameObject(30 * l, 120, "black", 32, 32);
                back.render();
                let backTwo = new GameObject(30 * l, 110, "grey", 32, 20);
                hitLost(30 * l, 99);
                back.render();
                backTwo.render();
                console.log(30 * l, 110);
                ctx.clearRect(v, 120, 32, 32);
                if (l < 9) {
                  if (l < 1) {
                    hitLost(30 * l, 99);
                    ctx.clearRect(0, 120, 32, 32);
                    imageHandler(rails, railObj, 0, 100, 32, 32);
                  }
                  imageHandler(rails, railObj, v, 100, 32, 32);
                }
                l--;
              }
              setInterval(() => {
                ctx.clearRect(30, 73, 32, 32);
                imageHandler(penguin, penguinObj, penguinX, penguinY, 32, 32);
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
        else if ((nextScene === true && newRandom === 3 && d < 6 && gameOver === false) || d < 4) {
          nextScene = false;
          for (let i = 0; i < 10; i++) {
            lastToGo.fill("Rails", 0, 1);
            d++;
            setTimeout(() => {
              if (scenes[i][l] === 2) {
                let v = (l + 1) * 30;
                imageHandler(rails, railObj, 30 * l, 100, 32, 32);
                ctx.clearRect(v, 103, 32, 32);
                if (l < 9) {
                  if (l < 1) {
                    ctx.clearRect(0, 103, 32, 32);
                    imageHandler(rails, railObj, 0 * l, 100, 32, 32);
                  }
                  imageHandler(rails, railObj, v, 100, 32, 32);
                }
                l--;
              }
              setInterval(() => {
                ctx.clearRect(30, 73, 32, 32);
                imageHandler(penguin, penguinObj, penguinX, penguinY, 32, 32);
              }, 50);
            }, i * 200);
          }
          setTimeout(() => {
            score.textContent = `Score: ${scoreNumber}`;
            nextScene = true;
          }, randTime);
        }
        //Falling rock object
        else if (
          newRandom === 4 &&
          nextScene === true &&
          lastToGo[0] !== "rock" &&
          d > 4
        ) {
          lastToGo.fill("rock", 0, 1 && d > 5);
          for (let i = 0; i < 10; i++) {
            setTimeout(() => {
              if (scenes[i][l] === 2) {
                let v = 30 * l;
                let back = new GameObject(
                  30 * l,
                  27 * i * 0.5,
                  "#524545",
                  10,
                  10
                );
                back.render();
                hitLost(30 * l, 99);
                back.render();
                ctx.clearRect(30 * l + 30, 0, game.width, 111);
                if (l < 9) {
                  if (l < 1) {
                    hitLost(30 * l, 99);
                    ctx.clearRect(30, 110, 32, 32);
                    ctx.clearRect(0, 110, 32, 32);
                    setTimeout(() => {
                      imageHandler(rails, railObj, 0, 100, 32, 32);
                      imageHandler(rails, railObj, 30, 100, 32, 32);
                    }, 5);
                  }
                  imageHandler(rails, railObj, v, 100, 32, 32);
                }
                l--;
              }
              setInterval(() => {
                //ctx.clearRect(30 , 60, 32, 32);
                imageHandler(penguin, penguinObj, penguinX, penguinY, 32, 32);
              }, 50);
            }, i * 200);
          }
          setTimeout(() => {
            scoreNumber++;
            score.textContent = `Score: ${scoreNumber}`;
            nextScene = true;
          }, randTime);
        }
      }
      }

      let h = 0;
      //Keyboard controls
      function keyboardControls(e) {
        if(gameOver === false){
        switch (e.key) {
          //Allows jump, but cannot float character
          case "w":
          case "ArrowUp":
            if (h < 1) {
              h++;
              for (let i = 0; i < 32; i++) {
                ctx.clearRect(30, 98, 32, 32);
                imageHandler(rails, railObj, 30, 100, 32, 32);
                penguinY > 0 ? (penguinY -= 1) : null;
              }
              for (let i = 0; i < 32; i++) {
                setTimeout(function () {
                  penguinY > 0 ? (penguinY += 1) : null;
                }, 600);
              }
              setTimeout(function () {
                h = 0;
              }, 700);
            }
            break;
        }
      }
      }
      //See if key is pressed
      document.addEventListener("keydown", keyboardControls);
      
      //Detect hit
      function hitLost(objectX, objectY) {
        if (objectX <= 31 && penguinY >= objectY) {
          gameOver = true;
          console.log("lost");
          return gameOver;
        }
      }

    }
  })();
});