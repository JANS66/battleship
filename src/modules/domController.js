const domController = {
  renderBoard: (gameBoard, container, clickHandler) => {
    container.innerHTML = ''; // Clear the board

    gameBoard.board.forEach((row, x) => {
      row.forEach((cell, y) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');

        // Styling based on state
        if (cell === 'hit') cellDiv.classList.add('hit');
        if (cell === 'miss') cellDiv.classList.add('miss');

        // Only show ships on the player board
        if (
          container.id === 'player-board' &&
          typeof cell === 'object' &&
          cell !== null
        ) {
          cellDiv.classList.add('ship');
        }

        // Add Listener only if it is the enemy board
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
};

export default domController;
