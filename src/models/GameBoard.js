class GameBoard {
  constructor() {
    // A 10x10 board initialized with null
    this.board = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
    this.missedAttacks = [];
    this.ships = [];
  }

  placeShip(ship, x, y) {
    if (y + ship.length > 10) throw new Error('Ship out of bounds');

    // --- COLLISION DETECTION ---
    for (let i = 0; i < ship.length; i++) {
      if (this.board[x][y + i] !== null) {
        throw new Error('Ship collision');
      }
    }

    // For now, place it horizontally.
    // Store a reference to the ship in each board cell it occupies.
    for (let i = 0; i < ship.length; i++) {
      this.board[x][y + i] = ship;
    }
    this.ships.push(ship);
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
