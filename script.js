// Durée d'une partie, en secondes
const GAME_DURATION = 5;

const clickButton = document.getElementById("button-clicker");
const resetButton = document.getElementById("button-reset");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

// 1. Les variables qui stockent l'état de la partie
let count = 0;
let timeLeft = GAME_DURATION;
let intervalId = null;

// 2. Le clic : il incrémente le compteur, et lance le chrono au premier clic
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

// Le chrono décompte 1 seconde à la fois, jusqu'à la fin de la partie
function startTimer() {
  intervalId = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      stopGame();
    }
  }, 1000);
}

// Fin de la partie : on arrête le chrono et on bloque le bouton
function stopGame() {
  clearInterval(intervalId);
  intervalId = null;
  clickButton.disabled = true;
}

// On remet tout à zéro pour rejouer
function resetGame() {
  clearInterval(intervalId);
  intervalId = null;

  count = 0;
  timeLeft = GAME_DURATION;

  scoreElement.textContent = count;
  timerElement.textContent = timeLeft;
  clickButton.disabled = false;
}

clickButton.addEventListener("click", handleClick);
resetButton.addEventListener("click", resetGame);
