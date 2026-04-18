import Player from '../../src/models/Player';
import GameBoard from '../../src/models/GameBoard';

describe('Player Logic', () => {
  test('each player should have their own GameBoard', () => {
    const player1 = new Player('Player 1');
    const player2 = new Player('Computer', true);

    expect(player1.board).toBeInstanceOf(GameBoard);
    expect(player2.board).toBeInstanceOf(GameBoard);
    // Ensure they are not sharing the same board object
    expect(player1.board).not.toBe(player2.board);
  });

  test('player can attack an opponents board', () => {
    const player = new Player('Player 1');
    const opponentBoard = new GameBoard();

    // Expect the attack to go through the player logic
    // and reflect on the opponents board
    player.attack(opponentBoard, 2, 2);
    expect(opponentBoard.getMissedAttacks()).toContainEqual([2, 2]);
  });
});
