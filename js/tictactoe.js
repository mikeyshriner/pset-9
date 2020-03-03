///////////////////// CONSTANTS /////////////////////////////////////

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

///////////////////// APP STATE (VARIABLES) /////////////////////////

let board;
let turn;
let win;
let xWin = 0;
let oWin = 0;
let tieCount = 0;

///////////////////// CACHED ELEMENT REFERENCES /////////////////////

const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");
const winCount = document.getElementById("winCount");
const messagePartOne = document.getElementById("messagePartOne");
const xButton = document.getElementById("x-button");
const messagePartTwo = document.getElementById("messagePartTwo");
const oButton = document.getElementById("o-button");
const messagePartThree = document.getElementById("messagePartThree");

///////////////////// EVENT LISTENERS ///////////////////////////////

window.onload = init;

document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
xButton.onclick = setTurn;
oButton.onclick = setTurn;

///////////////////// FUNCTIONS /////////////////////////////////////
 
//this runs first
function init() {
  for (let b of squares) {
    b.textContent = null;
  }
  turn = null;
  board = ["", "", "", "", "", "", "", "", ""]; /*this one is the actual board*/
  message.textContent = null;
  message.appendChild(messagePartOne);
  message.appendChild(xButton);
  message.appendChild(messagePartTwo);
  message.appendChild(oButton);
  message.appendChild(messagePartThree); /*this whole setup is so janky but it works*/
  win = null;

  if (turn) {
    render();
  }
}

function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  });

  messagePartOne.remove();
  xButton.remove();
  messagePartTwo.remove();
  oButton.remove();
  messagePartThree.remove();

  message.textContent =
    win === "T" ? "It's a tie!"
      : win ? `${win} wins!` : `Turn: ${turn}`;
  winCount.textContent = `X: ${xWin} | O: ${oWin} | Tie: ${tieCount}`
}

//this is the one that runs when the user clicks a square
function takeTurn(e) {
  if(turn) {
    if (!win) {
      let index = squares.findIndex(function(square) {
        return square === e.target;
      });

      if (board[index] === "") {
        board[index] = turn;
        turn = turn === "X" ? "O" : "X";
        win = getWinner();

        updateWins(win)
        render();
      }
    }
  }
}

function getWinner() {
  let winner = null;

  winningConditions.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {
      winner = board[condition[0]];
    }
  });

  return winner ? winner : board.includes("") ? null : "T";
}

function updateWins(a) {
  if (a === "X") {
    xWin++
  } else if (a === "O") {
    oWin++
  } else if (a === "T") {
    tieCount++
  }
}

function reset() {
  xWin = 0;
  oWin = 0;
  tieCount = 0;
  winCount.textContent = "X: 0 | O: 0 | Tie: 0";
}

function setTurn(f) {
  turn = f.target.id.charAt(0).toUpperCase();
  message.textContent = `Turn: ${turn}`;
}
