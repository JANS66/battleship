class GameBoard {
  constructor() {
    // A 10x10 board initialized with null
    this.board = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
    this.missedAttacks = [];
    this.ships = [];
  }

  placeShip(ship, x, y, isVertical = false) {
    // 1. BOUNDARY CHECK
    // If vertical, check rows (x). If horizontal, check columns (y).
    if (isVertical) {
      if (x + ship.length > 10) throw new Error('Ship out of bounds');
    } else {
      if (y + ship.length > 10) throw new Error('Ship out of bounds');
    }

    // 2. COLLISION DETECTION
    for (let i = 0; i < ship.length; i++) {
      const checkX = isVertical ? x + i : x;
      const checkY = isVertical ? y : y + i;

      if (this.board[checkX][checkY] !== null) {
        throw new Error('Ship collision');
      }
    }

    // 3. PLACEMENT
    for (let i = 0; i < ship.length; i++) {
      const placeX = isVertical ? x + i : x;
      const placeY = isVertical ? y : y + i;

      this.board[placeX][placeY] = ship;
    }

    this.ships.push(ship);
  }

  placeShipsRandomly(shipsArray) {
    shipsArray.forEach((ship) => {
      let placed = false;
      while (!placed) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const vertical = Math.random() > 0.5;

        try {
          this.placeShip(ship, x, y, vertical);
          placed = true;
        } catch (error) {}
      }
    });
  }

  receiveAttack(x, y) {
    const target = this.board[x][y];

    // 1. Guard Clause: If the spot is already "hit" or "miss", stop immediately.
    if (target === 'hit' || target === 'miss') {
      return;
    }

    // 2. Handle a Hit
    if (target !== null && typeof target === 'object') {
      target.hit();
      this.board[x][y] = 'hit'; // Mark the board
      return true;
    }

    // 3. Handle a Miss
    this.board[x][y] = 'miss'; // Mark the board
    this.missedAttacks.push([x, y]); // Kepp this for UI/display logic
    return false;
  }

  getMissedAttacks() {
    return this.missedAttacks;
  }

  allShipsSunk() {
    // Check if every ship in ships array is sunk
    return this.ships.every((ship) => ship.isSunk());
  }
}

module.exports = GameBoard;
