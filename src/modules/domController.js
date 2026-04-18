const elements = {
  playerBoard: document.getElementById('player-board'),
  opponentBoard: document.getElementById('opponent-board'),
  gameStatus: document.getElementById('game-status'),
  setupControls: document.getElementById('setup-controls'),
  setupContainer: document.getElementById('setup-container'),
  startButton: document.getElementById('start-button'),
};

export const domController = {
  renderBoard: (gameBoard, container, clickHandler, isOpponent = false) => {
    // We create a fragment to minimize "reflows" (re-painting the screen)
    const fragment = document.createDocumentFragment();
    container.innerHTML = '';

    gameBoard.board.forEach((row, x) => {
      row.forEach((cell, y) => {
        const cellDiv = document.createElement('div');
        cellDiv.className = 'cell';
        cellDiv.dataset.x = x;
        cellDiv.dataset.y = y;

        if (cell === 'hit') cellDiv.classList.add('hit');
        if (cell === 'miss') cellDiv.classList.add('miss');

        const isShip = typeof cell === 'object' && cell !== null;
        if (isShip && !isOpponent) cellDiv.classList.add('ship');

        fragment.appendChild(cellDiv);
      });
    });

    container.appendChild(fragment);

    // Event Delegation: One listener for the whole board
    if (clickHandler) {
      // Remove old listener to prevent memory leaks if container is reused
      container.onclick = (e) => {
        const cell = e.target.closest('.cell');
        if (!cell) return;
        const { x, y } = cell.dataset;
        clickHandler(Number(x), Number(y));
      };
    }
  },

  updateStatus: (message) => {
    elements.gameStatus.textContent = message;
    // Adding a small animation trigger here is a nice UX touch
    elements.gameStatus.classList.remove('pulse');
    void elements.gameStatus.offsetWidth; // Trigger reflow
    elements.gameStatus.classList.add('pulse');
  },

  resetDock: () => {
    document
      .querySelectorAll('.draggable-ship')
      .forEach((ship) => ship.classList.remove('hidden'));
  },

  setDock: () => {
    document
      .querySelectorAll('.draggable-ship')
      .forEach((ship) => ship.classList.add('hidden'));
  },

  enableStartButton: () => {
    elements.startButton.disabled = false;
  },

  disableStartButton: (message = null) => {
    if (message) elements.startButton.textContent = message;
    elements.startButton.disabled = true;
  },

  hideSetup: () => {
    elements.setupControls.classList.add('hidden'); // Hide buttons
    elements.setupContainer.classList.add('hidden');
  },

  hideBoards: () => {
    document.getElementById('game-container').classList.add('hidden');
  },

  showBoards: () => {
    document.getElementById('game-container').classList.remove('hidden');
  },

  updateStatus: (message) => {
    elements.gameStatus.textContent = message;
  },

  showPassScreen: () => {
    document.getElementById('pass-device-screen').classList.remove('hidden');
  },

  hidePassScreen: () => {
    document.getElementById('pass-device-screen').classList.add('hidden');
  },

  hideMenu: () => {
    document.getElementById('menu-screen').classList.add('hidden');
  },

  updatePassScreen: (nextPlayerName) => {
    document.getElementById('next-player-name').textContent =
      `${nextPlayerName}'s Turn`;
  },
};
