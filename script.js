const DEFAULT_DURATION = 5;

let clickButton;
let resetButton;
let scoreElement;
let timerElement;
let durationButtons;

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

// Récupère les éléments et branche les listeners.
// À n'appeler qu'une fois le DOM chargé, sinon les éléments valent null.
function initGame() {
  clickButton = document.getElementById("button-clicker");
  resetButton = document.getElementById("button-reset");
  scoreElement = document.getElementById("score");
  timerElement = document.getElementById("timer");
  durationButtons = document.querySelectorAll(".duration-button");

  clickButton.addEventListener("click", handleClick);
  resetButton.addEventListener("click", resetGame);

  durationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setDuration(Number(button.dataset.duration));
    });
  });

  setDuration(DEFAULT_DURATION);
}

document.addEventListener("DOMContentLoaded", initGame);

// Dans le navigateur `module` n'existe pas : on n'exporte que côté Node (Jest).
if (typeof module !== "undefined") {
  module.exports = { initGame, handleClick, resetGame, setDuration };
}
