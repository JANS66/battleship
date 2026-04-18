import Player from './Player';

export default class AI extends Player {
  constructor() {
    super('Computer');
    this.lastHit = null;
    this.potentialTargets = [];
  }

  smartAttack(opponentBoard) {
    let x, y;

    // If we have potential targets from a previous hit, use them
    if (this.potentialTargets.length > 0) {
      [x, y] = this.potentialTargets.shift();
    } else {
      // Random guess
      do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      } while (
        opponentBoard.board[x][y] === 'hit' ||
        opponentBoard.board[x][y] === 'miss'
      );
    }

    const result = this.attack(opponentBoard, x, y);

    if (result === true) {
      this.lastHit = { x, y };
      this.generateAdjacentTargets(x, y, opponentBoard);
    }

    return { x, y, result };
  }

  generateAdjacentTargets(x, y, board) {
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    directions.forEach(([dx, dy]) => {
      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10) {
        const status = board.board[nx][ny];
        const isAlreadyInQueue = this.potentialTargets.some(
          ([px, py]) => px === nx && py === ny
        );

        if (status !== 'hit' && status !== 'miss' && !isAlreadyInQueue) {
          this.potentialTargets.push([nx, ny]);
        }
      }
    });
  }
}
