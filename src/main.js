import './styles.css';
import Player from './models/Player';
import domController from './modules/domController';
import dragDropController from './modules/dragDropController';

// --- STATE MANAGEMENT ---
let player1 = new Player('Player 1');
let player2 = new Player('Player 2');

let activePlayer = player1;
let opponent = player2;

let isGameOver = false;
let gameStarted = false;
let isTransitioning = false; // Prevents peeking or clicking during transition
let placementTurn = 1; // Track who is currently placing ships

const initGame = () => {
  domController.updateStatus(`${activePlayer.name}: Place your fleet`);

  // Reset start button
  const startButton = document.getElementById('start-button');
  startButton.disabled = true;
  startButton.textContent = 'Finish Placement';

  // Render initial empty board for Player 1
  domController.renderBoard(
    activePlayer.board,
    document.getElementById('player-board')
  );

  // Initialize DnD for the first player
  setupPlacementPhase();
};

const setupPlacementPhase = () => {
  // Reset the dock, make sure hidden ships reappear for Player 2
  document
    .querySelectorAll('.draggable-ship')
    .forEach((ship) => ship.classList.remove('hidden'));

  dragDropController(activePlayer, () => {
    domController.renderBoard(
      activePlayer.board,
      document.getElementById('player-board')
    );
  });
};

const handlePlacementFinish = () => {
  // Disable button so P2 cant click 'Start' without placing ships
  document.getElementById('start-button').disabled = true;

  if (placementTurn === 1) {
    // Player 1 finished, move to Player 2
    placementTurn = 2;
    initiatePassDevice('Player 2', true); // true indicates that game is still in setup
  } else {
    // Player 2 finished, start the battle
    startGame();
  }
};

const startGame = () => {
  gameStarted = true;
  document.getElementById('setup-controls').classList.add('hidden'); // Hide buttons
  document.getElementById('setup-container').classList.add('hidden');
  domController.updateStatus('Battle Started! Attack the enemy board.');

  // Start the battle with P1 as active
  activePlayer = player1;
  opponent = player2;
  updateUI();
};

const updateUI = () => {
  const playerBoardContainer = document.getElementById('player-board');
  const opponentBoardContainer = document.getElementById('opponent-board'); // Labelled enemy waters in html

  // Show active players ships
  domController.renderBoard(
    activePlayer.board,
    playerBoardContainer,
    null,
    false
  );

  // Hide opponents ships
  domController.renderBoard(
    opponent.board,
    opponentBoardContainer,
    handleAttack,
    true
  );
};

// --- GAME LOOP LOGIC ---

const handleAttack = (x, y) => {
  // Prevent attacking before game starts
  if (isGameOver || isTransitioning || !gameStarted) return;

  // 1. Player Attacks Opponent
  const attackResult = activePlayer.attack(opponent.board, x, y);

  // If attack was valid
  if (attackResult !== undefined) {
    updateUI();

    if (opponent.board.allShipsSunk()) {
      isGameOver = true;
      domController.updateStatus(`${activePlayer.name} Wins!`);
      return;
    }

    isTransitioning = true;
    setTimeout(() => initiatePassDevice(opponent.name, false), 1000); // 1s to see the hit result
  }
};

const initiatePassDevice = (nextPlayerName, isStillSetup) => {
  // 1. Hide the boards
  document.getElementById('game-container').classList.add('hidden');

  // 2. SHow the pass screen
  domController.updatePassScreen(nextPlayerName);
  domController.showScreen('pass-device-screen');
};

const completePassDevice = () => {
  domController.hideScreen('pass-device-screen');
  document.getElementById('game-container').classList.remove('hidden');

  // SWAP ROLES HERE: The person who just sat down is now the Active Player
  [activePlayer, opponent] = [opponent, activePlayer];

  if (!gameStarted) {
    // Player 2 is now active
    domController.updateStatus(`${activePlayer.name}: Place your fleet`);
    initGameForPlayer2();
  } else {
    domController.updateStatus(`${activePlayer.name} Turn`);
    updateUI();
  }

  isTransitioning = false;
};

const initGameForPlayer2 = () => {
  domController.renderBoard(
    activePlayer.board,
    document.getElementById('player-board')
  );
  const startButton = document.getElementById('start-button');
  startButton.disabled = true;
  startButton.textContent = 'Start Battle';
  setupPlacementPhase();
};

// --- EVENT LISTENERS ---
document
  .getElementById('start-button')
  .addEventListener('click', handlePlacementFinish);
document
  .getElementById('continue-button')
  .addEventListener('click', completePassDevice);

initGame();
