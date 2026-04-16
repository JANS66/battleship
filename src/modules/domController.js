const domController = {
  renderBoard: (gameBoard, container, clickHandler, isOpponent = false) => {
    container.innerHTML = ''; // Clear the board

    gameBoard.board.forEach((row, x) => {
      row.forEach((cell, y) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');

        // --- Setting the datasets ---
        cellDiv.dataset.x = x;
        cellDiv.dataset.y = y;

        // 1. Always show hits and misses (Public knowledge)
        if (cell === 'hit') cellDiv.classList.add('hit');
        if (cell === 'miss') cellDiv.classList.add('miss');

        // 2. Logic for showing ships (Private knowledge)
        // Use isOpponent flag instead of container ID.
        // Only add the 'ship' class if there is a ship AND it is not the opponents board.
        const isShip = typeof cell === 'object' && cell !== null;
        if (isShip && !isOpponent) {
          cellDiv.classList.add('ship');
        }

        // 3. Event Listeners
        // Only attach clicks if a handler is provided
        if (clickHandler && cell !== 'hit' && cell !== 'miss') {
          cellDiv.addEventListener('click', () => clickHandler(x, y));
        }

        container.appendChild(cellDiv);
      });
    });
  },

  updateStatus: (message) => {
    document.getElementById('game-status').textContent = message;
  },

  showScreen: (screenId) => {
    document.getElementById(screenId).classList.remove('hidden');
  },

  hideScreen: (screenId) => {
    document.getElementById(screenId).classList.add('hidden');
  },

  updatePassScreen: (nextPlayerName) => {
    document.getElementById('next-player-name').textContent =
      `${nextPlayerName}'s Turn`;
  },
};

export default domController;
