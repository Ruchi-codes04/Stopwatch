let startStopBtn = document.getElementById("startStop");
let resetBtn = document.getElementById("reset");
let lapBtn = document.getElementById("lap");
let display = document.getElementById("display");
let lapList = document.getElementById("laps");

let startTime = 0,
  updatedTime = 0,
  difference = 0;
let isRunning = false,
  lapCounter = 1;
let interval; // store the reference to thr setInterval

function startStop() {
  if (!isRunning) {
    startTime = new Date().getTime() - difference;
    interval = setInterval(updateTime, 10);
    startStopBtn.textContent = "Stop";
    isRunning = true;
  } else {
    clearInterval(interval);
    startStopBtn.textContent = "Start";
    isRunning = false;
  }
}

function reset() {
  clearInterval(interval);
  startTime = 0;
  updatedTime = 0;
  difference = 0;
  isRunning = false;
  lapCounter = 1;
  display.textContent = "00:00:00.000";
  lapList.innerHTML = "";
  startStopBtn.textContent = "Start";
}

function updateTime() {
  updatedTime = new Date().getTime() - startTime;
  let hours = Math.floor(updatedTime / 3600000);
  let minutes = Math.floor((updatedTime % 3600000) / 60000);
  let seconds = Math.floor((updatedTime % 60000) / 1000);
  let milliseconds = updatedTime % 1000;
  display.textContent = `${formatTime(hours)}:${formatTime(
    minutes
  )}:${formatTime(seconds)}.${formatMilliseconds(milliseconds)}`;
}

function formatTime(value) {
  return value < 10 ? "0" + value : value;
}

function formatMilliseconds(value) {
  return value < 10 ? "00" + value : value < 100 ? "0" + value : value;
}

function recordLap() {
  if (isRunning) {
    let li = document.createElement("li");
    li.textContent = `Lap ${lapCounter}: ${display.textContent}`;
    lapList.appendChild(li);
    lapCounter++;
  }
}

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", recordLap);
