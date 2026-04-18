import GameBoard from './GameBoard';

export default class Player {
  constructor(name) {
    this.name = name;
    this.board = new GameBoard();
  }

  // Basic attack command.
  // This simply delegates the logic to the opponents board.
  attack(opponentBoard, x, y) {
    return opponentBoard.receiveAttack(x, y);
  }
}
