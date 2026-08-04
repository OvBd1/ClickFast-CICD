const DEFAULT_DURATION = 5;

const clickButton = document.getElementById("button-clicker");
const resetButton = document.getElementById("button-reset");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const durationButtons = document.querySelectorAll(".duration-button");

let gameDuration = DEFAULT_DURATION;
let count = 0;
let timeLeft = gameDuration;
let intervalId = null;

function handleClick() {
  if (timeLeft <= 0) {
    return;
  }

  if (intervalId === null) {
    startTimer();
  }

  count++;
  scoreElement.textContent = count;
}

function startTimer() {
  intervalId = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      stopGame();
    }
  }, 1000);
}

function stopGame() {
  clearInterval(intervalId);
  intervalId = null;
  clickButton.disabled = true;
}

function resetGame() {
  clearInterval(intervalId);
  intervalId = null;

  count = 0;
  timeLeft = gameDuration;

  scoreElement.textContent = count;
  timerElement.textContent = timeLeft;
  clickButton.disabled = false;
}

function setDuration(newDuration) {
  gameDuration = newDuration;

  durationButtons.forEach((button) => {
    const isSelected = Number(button.dataset.duration) === gameDuration;
    button.classList.toggle("selected", isSelected);
  });

  resetGame();
}

clickButton.addEventListener("click", handleClick);
resetButton.addEventListener("click", resetGame);

durationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setDuration(Number(button.dataset.duration));
  });
});

setDuration(DEFAULT_DURATION);
