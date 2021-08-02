//get attributes from DOM
const grid = document.querySelectorAll(".container div");
const gridArray = Array.from(grid);
const startBtn = document.querySelector(".game-btn");
let gameStatus = document.querySelector(".game-status");
//global flags
let nextPlayer = false;
let GameOver = false;

//winning conditions
const winArr = [
    /012/,
    /345/,
    /678/,
    /0\d*3\d*6/,
    /1\d*4\d*7/,
    /2\d*5\d*8/,
    /0\d*4\d*8/,
    /2\d*4\d*6/
];

// when click
function clickEffect(e) {
    if (GameOver) {
        startBtn.textContent = `RESTART GAME`;
        gameStatus.textContent = `Game over, start over`;
    }
    const cellIndex = gridArray.indexOf(e.target);
    let currentPlayer = nextPlayer ? "playerO" : "playerX";
    gameStatus.textContent = `Current player: ${currentPlayer}.`;
    e.target.classList.add(currentPlayer);
    e.target.setAttribute("data-index", cellIndex);

    let playerCells = Array.from(document.querySelectorAll(`.${currentPlayer}`));

    let playerIndexArr = playerCells.map((ele) => Number(ele.getAttribute("data-index")));

    console.log(playerIndexArr);

    //check win
    if (winArr.some(combo => combo.test(playerIndexArr.join("")))) {
        gameStatus.textContent = `The winer is ${currentPlayer}!`;
        GameOver = true;
        startBtn.textContent = `RESTART GAME`;
        startBtn.classList.add("shown");
        startBtn.classList.remove("game-btn");
    } else if (playerCells.length >= 5) {
        gameStatus.textContent = `It's a draw.`;
        GameOver = true;
        startBtn.textContent = `RESTART GAME`;
        startBtn.classList.add("shown");
        startBtn.classList.remove("game-btn");
    } else {
        nextPlayer = !nextPlayer;;
    }
}

function robotMove(){
    
}

//restart btn->function
function reStartGame() {
    GameOver = false;
    grid.forEach(ele => ele.className = "");
    grid.forEach(ele => ele.setAttribute("data-index", ""));
}

//action play and restart
grid.forEach(cell => cell.addEventListener("click", clickEffect));
startBtn.addEventListener("click", reStartGame);
