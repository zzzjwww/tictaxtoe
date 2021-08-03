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
    //check if gameover 
    if (GameOver) {
        gameStatus.textContent = `Game over, start over`;
        return;
    };
    //check if the cell was clicked
    if (e.target.dataset.index){
        console.log(e.target.classList);
        return;
    }
    //get index of cell 
    const cellIndex = gridArray.indexOf(e.target);
    //decide current player and display
    let currentPlayer = nextPlayer ? "playerO" : "playerX";
    gameStatus.textContent = `Current player: ${currentPlayer}.`;
    // add current player mark & index to html
    e.target.classList.add(currentPlayer);
    e.target.setAttribute("data-index", cellIndex);
    // collect and turn into array of currentplayer index
    let playerCells = Array.from(document.querySelectorAll(`.${currentPlayer}`));

    let playerIndexArr = playerCells.map((ele) => Number(ele.getAttribute("data-index")));

    //check if current player wins or draw or go on to the next player
    checkWin(currentPlayer,playerIndexArr);
}



function checkWin (currentPlayer, playerIndexArr){
    if (winArr.some(combo => combo.test(playerIndexArr.join("")))) {
        gameStatus.textContent = `The winer is ${currentPlayer}!`;
        GameOver = true;
        startBtn.textContent = `RESTART GAME`;
        startBtn.classList.add("shown");
        startBtn.classList.remove("game-btn");
    } else if (playerIndexArr.length >= 5) {
        gameStatus.textContent = `It's a draw.`;
        GameOver = true;
        startBtn.textContent = `RESTART GAME`;
        startBtn.classList.add("shown");
        startBtn.classList.remove("game-btn");
    } else {
        nextPlayer = !nextPlayer;
        //add robot function here
    }
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
