// game constants and variables
let inputDir = { x: 0, y: 0 };
const food_sound = new Audio("../others/food.wav");
const gameover_sound = new Audio("../others/gameover.wav");
const moving_sound = new Audio("../others/moving.wav");
const music_sound = new Audio("../others/music.wav");
let speed = 8;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let score = 0;

//Game Functions
function main(c_time) {
  window.requestAnimationFrame(main);
  // console.log(c_time);
  if ((c_time - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = c_time;
  gameEngine();
}
function isCollid(snake) {
  //if you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  //if you bump into the wall
  if (
    snake[0].x >= 18 ||
    (snake[0].x <= 0 && snake[0].y >= 18) ||
    snake[0].y <= 0
  ) {
    return true;
  }
}
function gameEngine() {
  //part 1: Updating The Snake Array And Food
  if (isCollid(snakeArr)) {
    gameover_sound.play();
    music_sound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over! Press Any Key To Continue");
    snakeArr = [{ x: 13, y: 15 }];
    music_sound.play();
    score = 0;
  }
  //if you have eaten the food increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    food_sound.play();
    score += 1;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      HighScoreBox.innerHTML = "HiScore: " + hiscoreval;
    }
    scoreBox.innerHTML = "Score " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }
  //Moving The Snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;
  //part 2:Display The Snake And Food
  // Display The Snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  //Display The Food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}
//main logic starts here
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(localStorage.getItem(hiscore));
  HighScoreBox.innerHTML = "High Score: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 0 }; //start the game
  moving_sound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
});
