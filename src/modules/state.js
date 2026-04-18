import AI from '../models/AI';
import Player from '../models/Player';

// Internal State
let player1 = new Player('Player 1');
let player2 = new Player('Player 2');

let activePlayer = player1;
let opponent = player2;

let gameMode = null;
let gameStarted = false;
let isGameOver = false;
let isTransitioning = false;
let placementTurn = 1;

// --- Getters ---
export const getActivePlayer = () => activePlayer;
export const getOpponent = () => opponent;
export const getGameMode = () => gameMode;
export const getPlacementTurn = () => placementTurn;
export const isGameStarted = () => gameStarted;
export const getIsTransitioning = () => isTransitioning;

/**
 * Returns true if the user is prevented from interacting with the board
 */
export const isInteractionBlocked = () =>
  isGameOver || isTransitioning || !gameStarted;

// --- Setters / Actions ---
export const setGameMode = (mode) => {
  gameMode = mode;

  if (gameMode === 'ai') {
    player2 = new AI();
    opponent = activePlayer === player1 ? player2 : player1;

    // Auto-place AI ships
    player2.board.placeShipsRandomly([5, 4, 3, 2]);
  }
};

export const setActivePlayer = (playerKey) => {
  if (playerKey === 'p1') {
    activePlayer = player1;
    opponent = player2;
  } else {
    activePlayer = player2;
    opponent = player1;
  }
};

export const swapPlayers = () => {
  [activePlayer, opponent] = [opponent, activePlayer];
};

export const togglePlacementTurn = () => {
  placementTurn = placementTurn === 1 ? 2 : 1;
};

export const startGame = () => {
  gameStarted = true;
};
export const toggleGameOver = () => {
  isGameOver = !isGameOver;
};
export const setTransitioning = (boolean) => {
  isTransitioning = boolean;
};

// --- Logic Delegates ---
export const attack = (x, y) => activePlayer.attack(opponent.board, x, y);
export const computerAttack = () => player2.smartAttack(player1.board);
export const checkWinner = () => opponent.board.allShipsSunk();
export const resetBoard = () => activePlayer.board.resetBoard();
export const placeShipsRandomly = () =>
  activePlayer.board.placeShipsRandomly([5, 4, 3, 2]);
