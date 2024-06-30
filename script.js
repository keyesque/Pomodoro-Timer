const timerCounter = document.getElementById("timer-counter");
const timerButton = document.getElementById("timer-button");
const pomodoroButton = document.getElementById("pomodoro");
const shortBreakButton = document.getElementById("short-break");
const longBreakButton = document.getElementById("long-break");
const cycleText = document.getElementById("cycle-text");

var root = document.querySelector(":root");
var rootStyles = getComputedStyle(root);

//Var
let isRunning = false;
let minutes = 25;
let seconds = 0;
let cycle = 1;
let mode = "pomodoro";
let counter;

function startTimer(min, sec) {
    timerAudio("cycleStart");
    isRunning = true;
    timerButton.innerText = "PAUSE";

    counter = setInterval(() => {
        if (sec === 0 && min === 0) {
            clearInterval(counter);
            if (mode === "pomodoro") {
                cycle++;
                cycleText.innerText = `#${cycle}`;
                timerAudio("cycleEnd");
                shortBreak();
            } else {
                timerAudio("cycleEnd");
                pomodoro();
            }
        } else if (sec === 0) {
            sec = 59;
            min--;
        } else {
            sec--;
        }
        timerCounter.innerText = `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
    }, 1000);
}

function stopTimer() {
    isRunning = false;
    
    clearInterval(counter);
    timerButton.innerText = "START";
}

function pomodoro() {
    if(!isRunning||timerAlert() == true){
    timerStyle(pomodoroButton, shortBreakButton, longBreakButton);
    pomodoroButton.style.backgroundColor = rootStyles.getPropertyValue("--white");
    shortBreakButton.style.backgroundColor = rootStyles.getPropertyValue("--lighter");
    longBreakButton.style.backgroundColor = rootStyles.getPropertyValue("--lighter");
    stopTimer();
    minutes = 25;
    seconds = 0;
    mode = "pomodoro";
    timerCounter.innerText = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}}

function shortBreak() {
    if(!isRunning||timerAlert() == true){
        timerStyle(shortBreakButton, pomodoroButton, longBreakButton);
        pomodoroButton.style.backgroundColor = rootStyles.getPropertyValue("--lighter");
        shortBreakButton.style.backgroundColor = rootStyles.getPropertyValue("--white");
        longBreakButton.style.backgroundColor = rootStyles.getPropertyValue("--lighter");
    stopTimer();
    minutes = 5;
    seconds = 0;
    mode = "shortBreak";
    timerCounter.innerText = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
}

function longBreak() {
    if(!isRunning||timerAlert() == true){
        timerStyle(longBreakButton, pomodoroButton, shortBreakButton);
        pomodoroButton.style.backgroundColor = rootStyles.getPropertyValue("--lighter");
        shortBreakButton.style.backgroundColor = rootStyles.getPropertyValue("--lighter");
        longBreakButton.style.backgroundColor = rootStyles.getPropertyValue("--white");
    stopTimer();
    minutes = 15;
    seconds = 0;
    mode = "longBreak";
    timerCounter.innerText = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}}

pomodoroButton.addEventListener("click", pomodoro);
shortBreakButton.addEventListener("click", shortBreak);
longBreakButton.addEventListener("click", longBreak);

timerButton.addEventListener("click", () => {
    if (isRunning) {
        timerAudio("cyclePause");
        stopTimer();
    } else {
        startTimer(minutes, seconds);
    }
});


function timerAlert(){
    if(isRunning || minutes < 25 || seconds !== 0){
    if (confirm("Are you sure you want to change mode? This will reset the timer.") == true){
    return true;
    }
    else{
    return false;
    }
}
}

function timerAudio(audioName){
    let audio = new Audio("audio/" + audioName + ".wav")
    audio.play();
}

function timerStyle(el1, el2, el3){
    el1.classList.add("selected");
    el2.classList.remove("selected");
    el3.classList.remove("selected");

}