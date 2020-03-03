///////////////////// CONSTANTS /////////////////////////////////////

const winningConditions = [

];

///////////////////// APP STATE (VARIABLES) /////////////////////////

let columns;
let turn;
let win;
let redWin = 0;
let yellowWin = 0;
let tieCount = 0;

///////////////////// CACHED ELEMENT REFERENCES /////////////////////

const message = document.querySelector("h2");
const board = document.getElementById("connectfour-board")
const messagePartOne = document.getElementById("messagePartOne");
const redButton = document.getElementById("button-red");
const messagePartTwo = document.getElementById("messagePartTwo");
const yellowButton = document.getElementById("button-yellow");
const messagePartThree = document.getElementById("messagePartThree");
const canvas = document.getElementById('connectfour-board');
const ctx = canvas.getContext("2d");
const winCount = document.getElementById("winCount")

///////////////////// EVENT LISTENERS ///////////////////////////////

window.onload = init;
document.getElementById("reset-button").onclick = init;
document.getElementById("button1").onclick = takeTurn;
document.getElementById("button2").onclick = takeTurn;
document.getElementById("button3").onclick = takeTurn;
document.getElementById("button4").onclick = takeTurn;
document.getElementById("button5").onclick = takeTurn;
document.getElementById("button6").onclick = takeTurn;
document.getElementById("button7").onclick = takeTurn;
redButton.onclick = setTurn;
yellowButton.onclick = setTurn;

///////////////////// FUNCTIONS /////////////////////////////////////

function init() {

  turn = null;
  columns = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null]
  ];
  message.innerHTML = ""
  message.appendChild(messagePartOne);
  message.appendChild(redButton);
  message.appendChild(messagePartTwo);
  message.appendChild(yellowButton);
  message.appendChild(messagePartThree); /*this whole setup is so janky but it works*/
  win = null;

  render();

}

function render() {
  if (turn){
    message.textContent =
      win === "T" ? "It's a tie!"
        : win ? `${win} wins!` : `Turn: ${turn}`;
      winCount.textContent = `Red: ${redWin} | Yellow: ${yellowWin} | Tie: ${tieCount}`
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let xCoord = 80;
  let yCoord;

  columns.forEach((column) => { /*x direction*/
    yCoord = 68;
    column.forEach((circle) => { /*y direction*/
      ctx.fillStyle = (!circle) ? "white" : circle;
      ctx.beginPath();
      ctx.arc(xCoord, yCoord, 43, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
      yCoord += 106;
    });
    xCoord += 106;
  });
}

function takeTurn(e) {
  if(turn) {
    if (!win) {
      let targetColumn = columns[Number(e.target.id.charAt(6)) - 1];

      if (targetColumn.includes(null)) {
        targetColumn[targetColumn.lastIndexOf(null)] = turn;
//         let targetCircle = targetColumn.lastIndexOf(null);
//         for (let i = 0; i <= targetCircle; i++) {
//           // if (i > 0) {
//           //   targetColumn[i - 1] = null;
//           // }
// console.log(targetColumn[i]);
//           targetColumn[i] = turn;
//           console.log(targetColumn[i]);
//           console.log(columns);
//           setTimeout(render, 500);
//         }
        turn = turn === "red" ? "yellow" : "red";
        win = getWinner();
        updateWins(win)
        render();
      }
    }
  }
}

function getWinner() {
  let winner = null;

  //this checks for vertical wins
  for (let j = 0; j < 6 && !winner; j++) {
    column = columns[j];
    for (let i = 3; i <= 5 && !winner; i++) {
      winner = (column[i] === "red" && column[i - 1] === "red" && column[i - 2] === "red" && column[i - 3] === "red")
        ? "red"
        : (column[i] === "yellow" && column[i - 1] === "yellow" && column[i - 2] === "yellow" && column[i - 3] === "yellow")
        ? "yellow"
        : null;
    }
  };

  //this one does horizontal ones
  for (let j = 3; j <= 6 && !winner; j++) {
    for (let i = 0; i <= 5 && !winner; i++) {
      winner = (columns[j][i] === "red" && columns[j - 1][i] === "red" && columns[j - 2][i] === "red" && columns[j - 3][i] === "red")
        ? "red"
        : (columns[j][i] === "yellow" && columns[j - 1][i] === "yellow" && columns[j - 2][i] === "yellow" && columns[j - 3][i] === "yellow")
        ? "yellow"
        : null;
    }
  };

  //this one does diagonal ones
  for (let j = 3; j <= 6 && !winner; j++) {
    for (let i = 0; i <= 5 && !winner; i++) {
      winner = (columns[j][i] === "red" && columns[j - 1][i + 1] === "red" && columns[j - 2][i + 2] === "red" && columns[j - 3][i + 3] === "red") || (columns[j][i] === "red" && columns[j - 1][i - 1] === "red" && columns[j - 2][i - 2] === "red" && columns[j - 3][i - 3] === "red")
        ? "red"
        : (columns[j][i] === "yellow" && columns[j - 1][i + 1] === "yellow" && columns[j - 2][i + 2] === "yellow" && columns[j - 3][i + 3] === "yellow") || (columns[j][i] === "yellow" && columns[j - 1][i - 1] === "yellow" && columns[j - 2][i - 2] === "yellow" && columns[j - 3][i - 3] === "yellow")
        ? "yellow"
        : null;
    }
  };

  let isBlankSpaces = false;

  for (let i = 0; i <= 6 && isBlankSpaces === false; i++) {

    isBlankSpaces = columns[i].includes(null);

  };

  return winner ? winner : isBlankSpaces ? null : "T";
}

function updateWins(a) {
  if (a === "red") {
    redWin++
  } else if (a === "yellow") {
    yellowWin++
  } else if (a === "T") {
    tieCount++
  }
}

function setTurn(f) {
  turn = f.target.id.substring(7);
  message.textContent = `Turn: ${turn}`;
}
