import './styles.css';
import Player from './models/Player';
import domController from './modules/domController';
import dragDropController from './modules/dragDropController';
import AI from './models/AI';

// --- STATE MANAGEMENT ---
let player1 = new Player('Player 1');
let player2 = new Player('Player 2');

let activePlayer = player1;
let opponent = player2;

let isGameOver = false;
let gameStarted = false;
let isTransitioning = false; // Prevents peeking or clicking during transition
let placementTurn = 1; // Track who is currently placing ships

let gameMode = null;

const selectMode = (mode) => {
  gameMode = mode;
  domController.hideScreen('menu-screen');

  if (gameMode === 'ai') {
    // RE ASSIGN player2 to be an instance of the AI class
    player2 = new AI();
    opponent = player2; // Ensure the opponent reference is updated

    // AI places ships immediately
    player2.board.placeShipsRandomly([5, 4, 3, 2]);
  }

  initGame(); // Starts the placement phase for Player 1
};

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

  if (gameMode === 'ai') {
    startGame();
    return; // Exit early so we dont trigger pass device
  }

  // If we are playing PVP
  if (placementTurn === 1) {
    // Player 1 to Player 2 transition
    placementTurn = 2;
    initiatePassDevice('Player 2', true); // true indicates that game is still in setup
  } else {
    // Player 2 to Player 1 transition
    // Set gameStarted to true FIRST so that completePassDevice knows
    // to run the battle logic instead of placement logic
    gameStarted = true;
    initiatePassDevice('Player 1', false);
  }
};

const startGame = () => {
  gameStarted = true;

  // Hide setup UI
  document.getElementById('setup-controls').classList.add('hidden'); // Hide buttons
  document.getElementById('setup-container').classList.add('hidden');

  // Start the battle with P1 as active
  activePlayer = player1;
  opponent = player2;

  domController.updateStatus('Battle Started! Attack the enemy board.');
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

const handleRandomize = () => {
  // Clear the current logical board and ships array
  activePlayer.board.resetBoard();
  activePlayer.board.placeShipsRandomly([5, 4, 3, 2]);

  // Render and update UI
  domController.renderBoard(
    activePlayer.board,
    document.getElementById('player-board')
  );

  // Hide the dock ships
  document
    .querySelectorAll('.draggable-ship')
    .forEach((ship) => ship.classList.add('hidden'));

  // Enable the start button
  document.getElementById('start-button').disabled = false;
};

// --- GAME LOOP LOGIC ---

const handleAttack = (x, y) => {
  if (isGameOver || isTransitioning || !gameStarted) return;

  const result = activePlayer.attack(opponent.board, x, y);
  if (result === undefined) return; // Invalid move

  updateUI();

  if (opponent.board.allShipsSunk()) {
    return endGame(activePlayer.name);
  }

  if (gameMode === 'pvp') {
    isTransitioning = true;
    setTimeout(() => initiatePassDevice(opponent.name, false), 1000);
  } else {
    // VS Computer Mode
    isTransitioning = true; // Disable clicks during AI thinking
    setTimeout(computerTurn, 800);
  }
};

const computerTurn = () => {
  // Use the smartAttack method
  player2.smartAttack(player1.board);
  updateUI();

  if (player1.board.allShipsSunk()) {
    return endGame('Computer');
  }

  isTransitioning = false;
};

const endGame = (winnerName) => {
  isGameOver = true;
  domController.updateStatus(`${winnerName} Wins!`);
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

  // Logic for setup phase
  if (placementTurn === 2 && !gameStarted) {
    [activePlayer, opponent] = [opponent, activePlayer];
    domController.updateStatus(`${activePlayer.name}: Place your fleet`);
    initGameForPlayer2();
    return;
  }

  // Logic for Battle Phase
  if (gameStarted) {
    const statusText = document.getElementById('game-status').textContent;
    if (statusText === 'Arrange your fleet!' || placementTurn === 2) {
      startGame();
      // Reset placementTurn so this block doesnt repeat incorrectly
      placementTurn = 0;
    } else {
      // Standard turn swap during gameplay
      [activePlayer, opponent] = [opponent, activePlayer];
      domController.updateStatus(`${activePlayer.name}'s Turn`);
      updateUI();
    }
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
document
  .getElementById('vs-computer-button')
  .addEventListener('click', () => selectMode('ai'));
document
  .getElementById('vs-player-button')
  .addEventListener('click', () => selectMode('pvp'));
document
  .getElementById('randomize-button')
  .addEventListener('click', handleRandomize);
