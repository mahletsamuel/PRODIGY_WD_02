let startTime;
let tInterval;
let running = false;
let difference = 0;
let lapCount = 0;

const timeDisplay = document.getElementById("time");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");  
const lapsContainer = document.getElementById("laps");

startButton.addEventListener("click", startFunction);
pauseButton.addEventListener("click", pauseFunction);
lapButton.addEventListener("click", lapFunction);
resetButton.addEventListener("click", resetFunction);

function startFunction() {
    if (!running) {
        running = true;
        startTime = new Date().getTime() - difference;  
        tInterval = setInterval(updateTimeFunction, 10);
    }
}

function pauseFunction() {
    if (running) {
        running = false;
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime; 
    }
    else if (difference != 0){
        startFunction();
    }
}

function resetFunction() {
    running = false;
    clearInterval(tInterval);
    difference = 0;
    lapCount = 0;
    timeDisplay.innerText = "00:00.00";
    lapsContainer.innerHTML = "";  
}

function lapFunction() {
    if (running || difference !== 0) {  
        lapCount++;
        const currentLapTime = timeDisplay.innerText;
        const lapElement = document.createElement("div");
        lapElement.className = 'lap';
        lapElement.innerText = `Lap ${lapCount}: ${currentLapTime}`;
        lapsContainer.appendChild(lapElement);
    }
}

function updateTimeFunction() {
    const currentTime = new Date().getTime();
    difference = currentTime - startTime;

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    timeDisplay.innerText = 
        `${(minutes < 10 ? "0" : "") + minutes}:${(seconds < 10 ? "0" : "") + seconds}.${(milliseconds < 10 ? "0" : "") + milliseconds}`;
}
