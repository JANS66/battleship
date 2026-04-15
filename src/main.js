import './styles.css';
import Player from './models/Player';
import Ship from './models/Ship';
import domController from './modules/domController';

// --- INITIALIZATION ---
let player = new Player('Human');
let computer = new Player('Computer', true);
let isGameOver = false;
let gameStarted = false;

// Define the fleet
const getFleet = () => [
  new Ship(5),
  new Ship(4),
  new Ship(3),
  new Ship(3),
  new Ship(2),
];

// --- PLACEMENT LOGIC ---
const randomizeBoards = () => {
  if (gameStarted) return;

  // Reset players/boards
  player = new Player('Human');
  computer = new Player('Computer', true);

  // Randomly place ships
  player.board.placeShipsRandomly(getFleet());
  computer.board.placeShipsRandomly(getFleet());

  updateGame();
  domController.updateStatus('Ships randomized. Ready for battle?');
};

const startGame = () => {
  gameStarted = true;
  document.getElementById('setup-controls').classList.add('hidden'); // Hide buttons
  domController.updateStatus('Game Started! Attack the enemy board.');
  updateGame();
};

// --- GAME LOOP LOGIC ---
const handleAttack = (x, y) => {
  // Prevent attacking before game starts
  if (isGameOver || !gameStarted) return;

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

  // Render Computer board and pass handleAttack only if game has started
  domController.renderBoard(
    computer.board,
    computerBoardContainer,
    gameStarted ? handleAttack : null
  );
};

const endGame = (message) => {
  isGameOver = true;
  domController.updateStatus(message);
};

// --- EVENT LISTENERS ---
document
  .getElementById('randomize-button')
  .addEventListener('click', randomizeBoards);
document.getElementById('start-button').addEventListener('click', startGame);

// Initial Setup
randomizeBoards();
