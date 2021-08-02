const grid = document.querySelectorAll(".container div");
const gridArray = Array.from(grid);
const startBtn = document.querySelector(".game-start");
let gameStatus = document.querySelector(".game-status");
let nextPlayer = false;
let GameOver = false;
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

function clickEffect(e) {
    if (GameOver) {
        startBtn.textContent = `RESTART GAME`;
        return gameStatus.textContent = `Game over, start over`;
    }
    const cellIndex = gridArray.indexOf(e.target);
    let currentPlayer = nextPlayer ? "playerO" : "playerX";
    gameStatus.textContent = `Current player: ${currentPlayer}.`
    e.target.classList.add(currentPlayer);
    e.target.setAttribute("data-index", cellIndex);

    let playerCells = Array.from(document.querySelectorAll(`.${currentPlayer}`));

    let playerIndexArr = playerCells.map((ele) => Number(ele.getAttribute("data-index")));

    console.log(playerIndexArr);

    //this has an error when a digit is inbetween the matching string, it does not work. eg "0136"
    if (winArr.some(combo => combo.test(playerIndexArr.join("")))) {
        gameStatus.textContent = `The winer is ${currentPlayer}!`;
        GameOver = true;
        startBtn.textContent = `RESTART GAME`;
    } else if (playerCells.length >= 5) {
        gameStatus.textContent = `It's a draw.`;
        GameOver = true;
        startBtn.textContent = `RESTART GAME`;
    } else {
        nextPlayer = !nextPlayer;
    }
}

function reStartGame() {
    GameOver = false;
    grid.forEach(ele => ele.className = "");
    grid.forEach(ele => ele.setAttribute("data-index", ""));
}

function robotMove(){
    
}


grid.forEach(cell => cell.addEventListener("click", clickEffect));
startBtn.addEventListener("click", reStartGame);
