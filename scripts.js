// Dependencies from HTML
const startBtn = document.querySelector(".start"),
  resetBtn = document.querySelector(".reset"),
  topLeft = document.querySelector(".top-left"),
  topCenter = document.querySelector(".top-center"),
  topRight = document.querySelector(".top-right"),
  bottomLeft = document.querySelector(".bottom-left"),
  bottomCenter = document.querySelector(".bottom-center"),
  bottomRight = document.querySelector(".bottom-right"),
  allDivs = document.querySelectorAll(".container div"),
  spaces = [topLeft, topCenter, topRight, bottomLeft, bottomCenter, bottomRight];

// Get random number
function randomNum(a) {
  return Math.floor(Math.random() * a) + 1;
}

// Sound effects
let flipSound = new Audio('sounds/flip.wav')
let loseSound = new Audio('sounds/lose.wav')
let winSound = new Audio('sounds/win.wav')

// Default settings
let difficultyLevel = "easy",
  started = !1,
  baseColor = "#cdb1b2",
  randomSpace;

// Pick random number
function pickNumber() {
  randomSpace = spaces[randomNum(6) - 1];
}

// Change a single tile
function singularTile(a) {
  pickNumber(),
    randomSpace.style.backgroundColor = "#69995D"
    flipSound.currentTime = 0.318
    flipSound.play();
    hitList.push(randomSpace)
    setTimeout(() => {
      randomSpace.style.backgroundColor = baseColor;
      flipSound.pause();
      flipSound.currentTime = 0;
    }, a);
}

let hitList = [];
function changeColor(a) {
  document.querySelectorAll(".container div").forEach((b) => {
    b.style.backgroundColor = a;
  });
}

// Start button functionality
startBtn.addEventListener("click", () => {
  if (((started = !0), (hitList = []), (tapList = []), "easy" == difficultyLevel)) singularTile(750);
  else if ("medium" == difficultyLevel) {
    let b = 500;
    singularTile(b),
      setTimeout(() => {
        singularTile(b);
      }, b);
  } else if ("hard" == difficultyLevel) {
    let a = 300;
    singularTile(a),
      setTimeout(() => {
        singularTile(a);
      }, a),
      setTimeout(() => {
        singularTile(a);
      }, 2 * a + 10),
      setTimeout(() => {
        singularTile(a);
      }, 3 * a + 20),
      setTimeout(() => {
        singularTile(a);
      }, 4 * a + 30);
  }
});

// Change settings based on difficulty
let tapList = [];
for (let i = 0; i < spaces.length; i++)
  spaces[i].addEventListener("click", () => {
    if ((tapList.push(spaces[i]), "easy" == difficultyLevel))
      !0 == started && randomSpace.classList.value == spaces[i].classList.value
        ? (changeColor("green"),
          winSound.play(),
          setTimeout(() => {
            changeColor(baseColor);
          }, 1e3),
          (started = !1))
        : !0 == started &&
          randomSpace.classList.value != spaces[i].classList.value &&
          (changeColor("red"),
          loseSound.play(),
          setTimeout(() => {
            changeColor(baseColor);
          }, 1e3),
          (started = !1));
    else if ("medium" == difficultyLevel || "hard" == difficultyLevel) {
      let a = hitList.slice(0, tapList.length);
      !0 == started &&
        a[a.length - 1] != tapList[tapList.length - 1] &&
        (changeColor("red"),
        loseSound.play(),
        setTimeout(() => {
          changeColor(baseColor);
        }, 1e3),
        (started = !1)),
        !0 == started &&
          hitList.length == tapList.length &&
          (changeColor("green"),
          winSound.play(),
          setTimeout(() => {
            changeColor(baseColor);
          }, 1e3),
          (started = !1));
    }
  });

// Change colors based on difficulty
const difficulty = document.getElementById("difficulty"),
  confirm = document.querySelector(".confirm");
confirm.addEventListener("click", () => {
  (hitList = []),
    (tapList = []),
    "easy" == difficulty.value
      ? ((difficultyLevel = "easy"), changeColor((baseColor = "#cdb1b2")))
      : "medium" == difficulty.value
      ? ((difficultyLevel = "medium"), changeColor((baseColor = "#edb6a3")))
      : "hard" == difficulty.value && ((difficultyLevel = "hard"), changeColor((baseColor = "#cbac88")));
});