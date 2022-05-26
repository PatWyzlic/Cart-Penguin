/* 
Penguin in minecart jumping over obstacles in 2d. (Inspired by club penguin cart surfer)

Falling rocks, 
jumping minecart,
tricks for extra points, 
gaps in the tracks,
barriers to jump over,
ghost enemy

Background scrolls right to left, auto generated
tracks at bottom of screen for the minecart

Uses HTML, CSS, and JavaScript/ JS Canvas
*/

let totalGameBoard = document.querySelector("body");
totalGameBoard.innerHTML = 
`<header>
</header>
<div id="container">
<aside id="top-one">
    <h2>Penguin Cart</h2>
</aside>
<aside id="top-two">
    <h2></h2>
</aside>
<aside id="top-three">
    <h2 id="keyboard-movement">Area</h2>
</aside>
<aside id="left-center">
    <h2 id="instructions">Instructions</h2>
</aside>
<main id="game-container">
        <canvas id="game"></canvas>
    <h1></h1>
</main>
<aside id="right-center">
    <h2 id="lose-state"></h2>
</aside>
<aside id="bottom-one">
    <h2 id="score">Score</h2>
</aside>
<aside id="bottom-two">
    <h2></h2>
</aside>
<aside id="bottom-three">
    <h2 id="play">Play</h2>
</aside>
</div>
<footer>
<h4>Inspired by Club Penguins Cart Surfer</h4>
<iframe src="https://archive.org/embed/club-penguin-music" width="90%" height="40px" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen></iframe></footer>
`;


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
let t = 0;
//Instructions page

//10 blocks of 30 on board to get locations
//Load DOM
window.addEventListener("DOMContentLoaded", function (e) {
  (function () {
    let playButtonSelector = document.querySelector("#play");
    playButtonSelector.addEventListener("click", gameStarts);
    //Select the lose area
    const loseStateSelector = document.querySelector("#lose-state");
    loseStateSelector.addEventListener("click", reload);
    function reload(){
        location.reload();
    }
    function gameStarts() {
      playButtonSelector.remove();
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
        loseStateSelector.innerHTML = "TRY AGAIN";
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
          if (gameOver === true) {
            gameLost();
          }
        }, 1000);
      }

      //Class to hold generated boxes
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
      //Loads in all images
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
          console.log(lastToGo);
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
                console.log(penguinX, penguinY);
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
                console.log(penguinX, penguinY);
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
          case "s":
          case "ArrowDown":
            break;
          case "a":
          case "ArrowLeft":
            break;
          case "d":
          case "ArrowRight":
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
