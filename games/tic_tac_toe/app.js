const cellElm = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('gameStatus');
const endGameStatus = document.getElementById('endGameStatus');
const playerOne = 'X'; 
const playerTwo = 'O';
let playerTurn = playerOne;

//on enregistre les combinaisons gagnantes
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cellElm.forEach(cell => {
  cell.addEventListener('click', playGame, { once: true });
});

// méthode pour joueur
function playGame(event) {
  event.target.textContent = playerTurn;

  if (checkWin(playerTurn)) {
    updateGameStatus("wins" + playerTurn);
    return endGame();
  } else if (checkDraw()) {
    updateGameStatus("draw");
    return endGame();
  }

  //on met à jour le status
  updateGameStatus(playerTurn);
  playerTurn == playerOne ? playerTurn = playerTwo : playerTurn = playerOne;
}

// on vérifie les combinaisons 
function checkWin(playerTurn) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cellElm[index].textContent == playerTurn;
    });
  });
}

function checkDraw() {
  return [...cellElm].every(cell => {
    return cell.textContent == playerOne || cell.textContent == playerTwo;
  });
}

function updateGameStatus(status) {
  let statusText;

  switch (status) {
    case 'X':
      statusText = "Au tour du joueur 2 (O)";
      break;
    case 'O':
      statusText = "Au tour du joueur 1 (X)";
      break;
    case 'winsX':
      statusText = "Le joueur 1 (X) a gagné!";
      break;
    case 'winsO':
      statusText = "Le joueur 2 (O) a gagné!";
      break;
    case 'draw':
      statusText = "Egalité! Personne ne gagne!";
      break;
  }

  gameStatus.textContent = statusText;
  endGameStatus.textContent = statusText;
}

function endGame() { 
    document.getElementById('gameEnd').style.display = "block" 
}
function reloadGame() { 
    window.location.reload() 
}