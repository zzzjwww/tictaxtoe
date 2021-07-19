
const squares = document.querySelectorAll(".container div");
const playerDisplay = document.querySelector(".game-status");
let currentPlayer = "PlayerX";
const winArr = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
squares.forEach(squares => {
    squares.addEventListener("click", clickOutcome, { once: true });
})

function clickOutcome(e) {
    const squareArray = Array.from(squares);
    const index = squareArray.indexOf(e.target);
    playerDisplay.textContent = currentPlayer;

    if (currentPlayer == "PlayerX") {
        squares[index].classList.add("playerX");
        currentPlayer = "PlayerO";
    } else {
        squares[index].classList.add("playerO");
        currentPlayer = "PlayerX";
    }

    if (checkWin(currentPlayer)) {
        console.log("win")
    };
}


function checkWin(currentPlayer){
    return winArr.some(combinationArray =>{
        return combinationArray.every(index =>{
            return squares[index].classList.contains(currentPlayer);
        })
    })
}
console.log(checkWin());
















//construct grid
// function MakeGrid(width, height) {
//     let value = "";
//     for (let y = 0; y < height; y++) {
//         yValue = `y:${y}`;
//         for (let x = 0; x < width; x++) {
//             xValue = `x:${x},`;
//             value = xValue + yValue;
//             grid.push(value);
//         }
//     }
// }
// MakeGrid(3,3);


// for (let i=0; i<boxes.length;i++){

//     boxes[i].addEventListener("click",runGame);
// }




// console.log(grid);
// console.log(grid.map(e => e.split(",")));
// let graph = grid.map(e => e.split(","));
// console.log(graph);


// function runGame(e) {
//   if(!gameOver && e.target){
//       console.log(e.target.dataset);


//   }
// }

