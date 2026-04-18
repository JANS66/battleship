import Ship from '../models/Ship';

export const dragDropController = (player, renderCallback) => {
  let currentAxis = 'horizontal';
  let draggedShipLength = null;
  let draggedShipElement = null;

  // Axis Toggle
  const axisButton = document.getElementById('axis-button');
  axisButton.addEventListener('click', () => {
    currentAxis = currentAxis === 'horizontal' ? 'vertical' : 'horizontal';
    axisButton.textContent = `Axis ${currentAxis.charAt(0).toUpperCase() + currentAxis.slice(1)}`;
  });

  // Ship Dock listeners
  const ships = document.querySelectorAll('.draggable-ship');
  ships.forEach((ship) => {
    ship.addEventListener('dragstart', (event) => {
      draggedShipLength = parseInt(event.target.dataset.length);
      draggedShipElement = event.target;
    });
  });

  // --- Event Delegation on the Parent Board ---
  const oldBoard = document.getElementById('player-board');
  // CLONE the board to strip all existing drag/drop event listeners
  const boardContainer = oldBoard.cloneNode(true);
  oldBoard.parentNode.replaceChild(boardContainer, oldBoard);

  boardContainer.addEventListener('dragover', (event) => {
    event.preventDefault(); // Required to allow drop
  });

  boardContainer.addEventListener('drop', (event) => {
    event.preventDefault();

    // Check if its a cell
    const cell = event.target.closest('.cell');
    if (!cell) return;

    const x = parseInt(cell.dataset.x);
    const y = parseInt(cell.dataset.y);
    const isVertical = currentAxis === 'vertical';

    try {
      player.board.placeShip(new Ship(draggedShipLength), x, y, isVertical);

      // 1. Hide the ship from the dock
      draggedShipElement.classList.add('hidden');

      // 2. Tell Main.js to redraw the board
      renderCallback();

      // 3. Check if game can start
      checkIfAllPlaced();
    } catch (error) {
      console.warn('Invalid placement:', error.message);
    }
  });

  const checkIfAllPlaced = () => {
    const remaining = document.querySelectorAll('.draggable-ship:not(.hidden)');
    if (remaining.length === 0) {
      document.getElementById('start-button').disabled = false;
    }
  };
};
