import { domController as DomController } from './domController';
import { dragDropController as DragDropController } from './dragDropController';
import * as State from './state';

export const selectMode = (mode) => {
  State.setGameMode(mode);
  DomController.hideMenu();
  initGame(); // Starts the placement phase for Player 1
};

const initGame = () => {
  DomController.updateStatus(
    `${State.getActivePlayer().name}: Place your fleet`
  );
  DomController.disableStartButton('Finish Placement');

  // Render initial empty board for Player 1
  DomController.renderBoard(
    State.getActivePlayer().board,
    document.getElementById('player-board')
  );

  // Initialize DnD for the first player
  setupPlacementPhase();
};

const setupPlacementPhase = () => {
  // Reset the dock, make sure hidden ships reappear for Player 2
  DomController.resetDock();

  DragDropController(State.getActivePlayer(), () => {
    DomController.renderBoard(
      State.getActivePlayer().board,
      document.getElementById('player-board')
    );
  });
};

export const handleRandomize = () => {
  // Clear the current logical board and ships array
  State.resetBoard();
  State.placeShipsRandomly();

  // Render and update UI
  DomController.renderBoard(
    State.getActivePlayer().board,
    document.getElementById('player-board')
  );

  // Hide the dock ships
  DomController.setDock();

  // Enable the start button
  DomController.enableStartButton();
};

export const handlePlacementFinish = () => {
  // Disable button so P2 cant click 'Start' without placing ships
  DomController.disableStartButton();

  if (State.getGameMode() === 'ai') {
    startGame();
    return; // Exit early so we dont trigger pass device
  }

  // If we are playing PVP
  if (State.getPlacementTurn() === 1) {
    // Player 1 to Player 2 transition
    State.togglePlacementTurn();
    initiatePassDevice('Player 2');
  } else {
    // Player 2 to Player 1 transition
    // Set gameStarted to true FIRST so that completePassDevice knows
    // to run the battle logic instead of placement logic
    State.startGame();
    initiatePassDevice('Player 1');
  }
};

const startGame = () => {
  State.startGame();

  // Hide setup UI
  DomController.hideSetup();

  // Start the battle with P1 as active
  State.setActivePlayer('p1');

  DomController.updateStatus('Battle Started! Attack the enemy board.');
  updateUI();
};

const updateUI = () => {
  // Show active players ships
  DomController.renderBoard(
    State.getActivePlayer().board,
    document.getElementById('player-board'),
    null,
    false
  );

  // Hide opponents ships
  DomController.renderBoard(
    State.getOpponent().board,
    document.getElementById('opponent-board'),
    handleAttack,
    true
  );
};

const handleAttack = (x, y) => {
  if (State.isInteractionBlocked()) return;

  const result = State.attack(x, y);
  if (result === null) return; // Invalid move

  updateUI();

  if (State.checkWinner()) {
    return endGame(State.getActivePlayer().name);
  }

  // Lock interactions immediately
  State.setTransitioning(true);

  if (State.getGameMode() === 'pvp') {
    // Longer delay for PVP so they can see the result of their hit
    setTimeout(() => initiatePassDevice(State.getOpponent().name), 1200);
  } else {
    // AI Turn
    setTimeout(() => {
      computerTurn();
      // Only unlock after AI finishes
      State.setTransitioning(false);
    }, 800);
  }
};

const endGame = (winnerName) => {
  State.toggleGameOver();
  DomController.updateStatus(`${winnerName} Wins!`);
};

const initiatePassDevice = (nextPlayerName) => {
  // 1. Hide the boards
  // 2. SHow the pass screen
  DomController.hideBoards();
  DomController.updatePassScreen(nextPlayerName);
  DomController.showPassScreen();
};

const computerTurn = () => {
  // Use the smartAttack method
  State.computerAttack();

  updateUI();

  if (State.checkWinner()) {
    return endGame('Computer');
  }

  State.setTransitioning(false);
};

export const completePassDevice = () => {
  DomController.hidePassScreen();
  DomController.showBoards();

  // If the game hasnt started yet, we are in placement.
  if (!State.isGameStarted()) {
    if (State.getPlacementTurn() === 2) {
      // Its Player 2 turn to place ships
      State.swapPlayers();
      DomController.updateStatus(
        `${State.getActivePlayer().name}: Place your fleet`
      );
      initGameForPlayer2();
    } else {
      // Player 2 finished, P1 clicked 'Ready' to start the actual battle
      startGame();
      // IMPORTANT: Ensure the board is clickable for the first turn
      State.setTransitioning(false);
    }
    return; // Exit early dont run battle logic yet.
  }

  // 2. BATTLE PHASE LOGIC
  // If we reach here, the game is officially "on".
  State.swapPlayers();
  DomController.updateStatus(`${State.getActivePlayer().name}'s Turn`);
  updateUI();

  State.setTransitioning(false);
};

const initGameForPlayer2 = () => {
  DomController.renderBoard(
    State.getActivePlayer().board,
    document.getElementById('player-board')
  );
  DomController.disableStartButton('Start Battle');
  setupPlacementPhase();
};
