const GameBoard = require('./GameBoard');

class Player {
  constructor(name, isComputer = false) {
    this.name = name;
    this.isComputer = isComputer;
    this.board = new GameBoard();
  }

  // Basic attack command.
  // This simply delegates the logic to the opponents board.
  attack(opponentBoard, x, y) {
    return opponentBoard.receiveAttack(x, y);
  }

  // Computer AI logic:
  // Continues to pick random coordinates until receiveAttack
  // returns a valid result (true or false) rather than undefined.
  makeRandomMove(opponentBoard) {
    if (!this.isComputer) return;

    let x, y, result;

    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);

      // Relying on GameBoard to return undefined for duplicate moves
      result = this.attack(opponentBoard, x, y);
    } while (result === undefined);

    return [x, y];
  }
}

module.exports = Player;
