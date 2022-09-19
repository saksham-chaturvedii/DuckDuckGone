let aim = document.querySelector(".aim");
let target = document.querySelector(".target");
let scoreText = document.querySelector(".score");
let timerText = document.querySelector(".timer");
let highscoreText = document.querySelector(".highscore");
let ClickToBegin = document.querySelector(".ClickToBegin");
let landingpage = document.querySelector(".landingpage");
let shootSound = document.querySelector(".shootSound");
let welcomeSound = document.querySelector(".welcomeSound");
let gameoverSound = document.querySelector(".gameoverSound");
let quackSound = document.querySelector(".quackSound");

console.log((aim.style.left = "50%"));

var score = 0;
var timeLeft = 30;
var highscore = 0;

welcomeSound.currentTime = 0;
welcomeSound.play();

let play = () => {
  setInterval(() => {
    timer();
  }, 1000);
};

ClickToBegin.addEventListener("click", () => {
  document.querySelector(".landingpage").style.display = "none";
  if (localStorage.getItem("highscore")) {
    highscore = localStorage.getItem("highscore");
    highscoreText.innerText = `High Score: ${highscore}`;
  } else {
    highscoreText.innerText = `High Score: ${0}`;
  }
  scoreText.innerText = `Score: ${score}`;
  timerText.innerText = `${timeLeft} s Left`;
  spawnTarget();
  play();
});

document.addEventListener("mousemove", (e) => {
  aim.style.left = `${e.clientX}px`;
  aim.style.top = `${e.clientY}px`;
});

let spawnTarget = () => {
  let top = Math.floor(Math.random() * (window.innerHeight - 200));
  let left = Math.floor(Math.random() * (window.innerWidth - 120));
  target.style.top = `${top}px`;
  target.style.left = `${left}px`;
};

let gameOver = () => {
  timeLeft += 2;
  alert(`\nGAME OVER\nSCORE: ${score}\n\nClick on "OK" or Press "ENTER" to play again.`);
  if (score > localStorage.getItem("highscore")) {
    localStorage.setItem("highscore", score);
    highscore = score;
    highscoreText.innerText = `High Score: ${highscore}`;
  }
  window.location.reload();
};

let timer = () => {
  if (timeLeft === 0) {
    gameoverSound.currentTime = 0;
    gameoverSound.play();
    gameOver();
  }
  timeLeft -= 1;
  timerText.innerText = `${timeLeft} s Left`;
};

function getRandomTarget() {
  var randImg = new Array();
  randImg[0] = "images/RedTopLeft.png";
  randImg[1] = "images/RedRight.png";
  randImg[2] = "images/RedLeft.png";
  randImg[3] = "images/DuckTopRight.png";
  randImg[4] = "images/DuckLeft.png";
  var number = Math.floor(Math.random() * randImg.length);
  target.querySelector("img").src = randImg[number];
  quackSound.currentTime = 0;
  quackSound.play();
}

target.addEventListener("click", () => {
  getRandomTarget();
  shootSound.currentTime = 0;
  shootSound.play();
  score += 1;
  scoreText.innerText = `Score: ${score}`;
  spawnTarget();
});
