import './styles.css';
import Player from './models/Player';
import Ship from './models/Ship';
import domController from './modules/domController';

// --- INITIALIZATION ---
const player = new Player('Human');
const computer = new Player('Computer', true);

// Pre populate ships (Separate this logic later)
const setupInitialShips = () => {
  player.board.placeShip(new Ship(3), 0, 0);
  player.board.placeShip(new Ship(2), 5, 5);

  computer.board.placeShip(new Ship(3), 2, 2);
  computer.board.placeShip(new Ship(2), 7, 7);
};

// --- GAME LOOP LOGIC ---
let isGameOver = false;

const handleAttack = (x, y) => {
  if (isGameOver) return;

  // 1. Player Attacks Computer
  const attackResult = player.attack(computer.board, x, y);

  // If attack was valid
  if (attackResult !== undefined) {
    updateGame();

    if (computer.board.allShipsSunk()) {
      endGame('You Win! The enemy fleet is at the bottom of the sea.');
      return;
    }

    // 2. Computer Attacks Player (with a slight delay for realism)
    domController.updateStatus('Computer is calculating...');
    setTimeout(computerTurn, 600);
  }
};

const computerTurn = () => {
  if (isGameOver) return;

  computer.makeRandomMove(player.board);
  updateGame();

  if (player.board.allShipsSunk()) {
    endGame('Game Over! Your fleet has been destroyed.');
  } else {
    domController.updateStatus('Your Turn! Choose a coordinate.');
  }
};

const updateGame = () => {
  const playerBoardContainer = document.getElementById('player-board');
  const computerBoardContainer = document.getElementById('computer-board');

  // Render Player board
  domController.renderBoard(player.board, playerBoardContainer);

  // Render Computer board
  domController.renderBoard(
    computer.board,
    computerBoardContainer,
    handleAttack
  );
};

const endGame = (message) => {
  isGameOver = true;
  domController.updateStatus(message);
};

// Start the app
setupInitialShips();
updateGame();
