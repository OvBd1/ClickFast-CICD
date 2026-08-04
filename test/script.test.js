require("../script.js");

describe("ClickFast", () => {
  let clickButton;
  let resetButton;
  let scoreElement;
  let timerElement;

  beforeEach(() => {
    jest.useFakeTimers();

    document.body.innerHTML = `
      <div id="score">0</div>
      <div id="timer">5</div>
      <button id="button-clicker">Click me!</button>
      <button id="button-reset">Reset</button>
    `;

    document.dispatchEvent(new Event("DOMContentLoaded"));

    clickButton = document.getElementById("button-clicker");
    resetButton = document.getElementById("button-reset");
    scoreElement = document.getElementById("score");
    timerElement = document.getElementById("timer");
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("le score et le timer partent des bonnes valeurs", () => {
    expect(scoreElement.textContent).toBe("0");
    expect(timerElement.textContent).toBe("5");
  });

  test("le score s'incrémente à chaque clic", () => {
    clickButton.click();
    expect(scoreElement.textContent).toBe("1");

    clickButton.click();
    clickButton.click();
    expect(scoreElement.textContent).toBe("3");
  });

  test("le timer décompte seconde par seconde une fois la partie lancée", () => {
    clickButton.click();

    jest.advanceTimersByTime(1000);
    expect(timerElement.textContent).toBe("4");

    jest.advanceTimersByTime(3000);
    expect(timerElement.textContent).toBe("1");

    jest.advanceTimersByTime(1000);
    expect(timerElement.textContent).toBe("0");
  });

  test("le timer ne démarre qu'au premier clic", () => {
    jest.advanceTimersByTime(3000);

    expect(timerElement.textContent).toBe("5");
  });

  test("le score ne s'incrémente plus après la fin du timer", () => {
    clickButton.click();
    jest.advanceTimersByTime(5000);

    const scoreAvant = scoreElement.textContent;
    clickButton.click();
    clickButton.click();

    expect(scoreElement.textContent).toBe(scoreAvant);
  });

  test("le bouton est désactivé à la fin de la partie", () => {
    clickButton.click();
    jest.advanceTimersByTime(5000);

    expect(clickButton.disabled).toBe(true);
  });

  test("le bouton de réinitialisation remet le score à zéro", () => {
    clickButton.click();
    clickButton.click();
    expect(Number(scoreElement.textContent)).toBeGreaterThan(0);

    resetButton.click();

    expect(scoreElement.textContent).toBe("0");
    expect(timerElement.textContent).toBe("5");
  });

  test("la réinitialisation relance une partie jouable", () => {
    clickButton.click();
    jest.advanceTimersByTime(5000);

    resetButton.click();

    expect(clickButton.disabled).toBe(false);

    clickButton.click();
    expect(scoreElement.textContent).toBe("1");
  });

  test("la réinitialisation arrête le timer en cours", () => {
    clickButton.click();
    jest.advanceTimersByTime(2000);

    resetButton.click();
    jest.advanceTimersByTime(3000);

    expect(timerElement.textContent).toBe("5");
  });
});
