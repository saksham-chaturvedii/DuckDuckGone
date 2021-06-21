const aim  = document.querySelector('.aim');
const target  = document.querySelector('.target');
const scoreText = document.querySelector('.score');
const timerText = document.querySelector('.timer');
const gameoverimg = document.querySelector('#gameover');
const highscoreText = document.querySelector('.highscore');
const ClickToBegin = document.querySelector('.ClickToBegin');
const landingpage = document.querySelector('.landingpage');
const shootSound = document.querySelector('.shootSound') ;
const welcomeSound = document.querySelector('.welcomeSound') ;
const gameoverSound = document.querySelector('.gameoverSound');
const quackSound = document.querySelector('.quackSound');

var score = 0;
var timeLeft = 30;
var highscore = 0;

const play = ()=>{
    setInterval(() => {
        timer();
    }, 1000);
}

welcomeSound.currentTime= 0;
welcomeSound.play();

ClickToBegin.addEventListener('click', ()=>{
    document.querySelector('.landingpage').style.display = "none";

    if(localStorage.getItem('highscore'))
    {
        highscore = localStorage.getItem('highscore');
        highscoreText.innerHTML = `High Score: ${highscore}`;
    }
    else{
        highscoreText.innerHTML = `High Score: ${0}`;
    }
    scoreText.innerHTML = `Score: ${score}`
    timerText.innerHTML = `${timeLeft} s Left`
    spawnTarget();
    play();
})

document.addEventListener('mousemove', (e) =>{
    aim.style.left = `${e.clientX}px`
    aim.style.top = `${e.clientY}px`

})

const spawnTarget = ()=>{
    
    quackSound.currentTime=0;
    quackSound.play();
    const top = Math.floor(Math.random() * window.innerHeight)
    const left = Math.floor(Math.random() * window.innerHeight)
    target.style.top = `${top}px`
    target.style.left = `${left}px`
}

const gameOver = () =>{
    alert(`\nGAME OVER\nSCORE: ${score}\n\nClick on "OK" to play again.`)
    if(  score > localStorage.getItem('highscore'))
    {
        localStorage.setItem('highscore', score);
        highscore = score;
        highscoreText.innerHTML = `High Score: ${highscore}`;
    }
    window.location.reload();
    welcomeSound.currentTime=0;
    welcomeSound.play();
}

const timer = () =>{
    
    if(timeLeft === 0)
    {
        gameoverSound.currentTime=0;
        gameoverSound.play();
        gameOver();
    }
    timeLeft -= 1;
    timerText.innerHTML = `${timeLeft} s Left`   
}

target.addEventListener('click', () =>{
    shootSound.currentTime = 0;
    shootSound.play();
    score +=1;
    scoreText.innerHTML = `Score: ${score}`
    spawnTarget();
})


