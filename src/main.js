import './styles.css';
import Player from './models/Player';
import domController from './modules/domController';
import dragDropController from './modules/dragDropController';

// --- INITIALIZATION ---
let player = new Player('Human');
let computer = new Player('Computer', true);
let isGameOver = false;
let gameStarted = false;

const initGame = () => {
  // 1. Initial Render
  domController.renderBoard(
    player.board,
    document.getElementById('player-board')
  );
  domController.renderBoard(
    computer.board,
    document.getElementById('computer-board')
  );

  // Ensure start button is disabled until all ships are placed
  const startButton = document.getElementById('start-button');
  startButton.disabled = true;

  // 2. Computer always places randomly
  const fleetConfigs = [5, 4, 3, 2]; // Standard lengths
  computer.board.placeShipsRandomly(fleetConfigs);

  // 3. Initialize Drag and Drop for Human
  dragDropController(player, () => {
    // handles rerendering after a drop
    domController.renderBoard(
      player.board,
      document.getElementById('player-board')
    );
  });
};

const startGame = () => {
  gameStarted = true;
  document.getElementById('setup-controls').classList.add('hidden'); // Hide buttons
  domController.updateStatus('Game Started! Attack the enemy board.');
  updateUI();
};

const updateUI = () => {
  domController.renderBoard(
    player.board,
    document.getElementById('player-board')
  );
  domController.renderBoard(
    computer.board,
    document.getElementById('computer-board'),
    gameStarted ? handleAttack : null
  );
};

// --- GAME LOOP LOGIC ---

const endGame = (message) => {
  isGameOver = true;
  domController.updateStatus(message);
};

const handleAttack = (x, y) => {
  // Prevent attacking before game starts
  if (isGameOver || !gameStarted) return;

  // 1. Player Attacks Computer
  const attackResult = player.attack(computer.board, x, y);

  // If attack was valid
  if (attackResult !== undefined) {
    updateUI();

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
  updateUI();

  if (player.board.allShipsSunk()) {
    endGame('Game Over! Your fleet has been destroyed.');
  } else {
    domController.updateStatus('Your Turn! Choose a coordinate.');
  }
};

document.getElementById('start-button').addEventListener('click', startGame);
initGame();
