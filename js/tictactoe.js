/////////////////// CONSTANTS /////////////////////////////////////
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
let turn = "X";
let win;
let xscore = 0;
let oscore = 0;

///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");
const x = document.getElementById("x-score");
const o = document.getElementById("o-score");

///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
document.getElementById("x-button").onclick = xFirst;
document.getElementById("o-button").onclick = oFirst;

///////////////////// FUNCTIONS /////////////////////////////////////
function init() {
  board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];
  turn = "X";
  win = null;

  render();
  document.getElementById("x-button").style.visibility = "visible";
  document.getElementById("o-button").style.visibility = "visible";
}

function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  });

  message.textContent =
    win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;
}

function takeTurn(e) {
  let index = squares.findIndex(function(square) {
    return square === e.target;
  });
  board[index] = turn;
  turn = turn === "X" ? "O" : "X";

  render();
}

function getWinner() {
  let winner = null;

  winningConditions.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[conition[1]] === board[condition[2]]
    ) {
      winner = board[condition[0]];
    }
  });

  return winner;
}

function takeTurn(e) {
  if (!win) {
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });

    if (board[index] === "") {
      board[index] = turn;
      turn = turn === "X" ? "O" : "X";
      win = getWinner();

      render();
    }
  }
  win = getWinner();
  keepScore(win);
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
  }
);

  return winner ? winner : board.includes("") ? null : "T";
}

function keepScore(win) {
  if (win !== null) {
    if (win === "X") {
      xscore++;
      x.textContent = "X: " + xscore;

    } else if (win === "O") {
        oscore++;
      o.textContent = "O: " + oscore;

    }
  }
}

function xFirst() {
    turn = "X";
    document.getElementById("x-button").style.visibility = "invisible";
    document.getElementById("o-button").style.visibility = "invisible";
    render();
}

function oFirst() {
  turn = "O";
  document.getElementById("x-button").style.visibility = "invisible";
  document.getElementById("o-button").style.visibility = "invisible";
  render();
}
