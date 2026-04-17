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

  test('should distinguish between real and computer players', () => {
    const realPlayer = new Player('User', false);
    const computerPlayer = new Player('CPU', true);

    expect(realPlayer.isComputer).toBe(false);
    expect(computerPlayer.isComputer).toBe(true);
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

describe('Computer Player AI', () => {
  test('computer should make a random legal move', () => {
    const computer = new Player('CPU', true);
    const opponentBoard = new GameBoard();

    // The computer makes a move
    const move = computer.makeRandomMove(opponentBoard);

    // Check that a move was actually recorded on the board
    // We flatten the 2D array and check how many cells are NOT null
    const totalMovesOnBoard = opponentBoard.board
      .flat()
      .filter((cell) => cell === 'hit' || cell === 'miss').length;

    expect(totalMovesOnBoard).toBe(1);

    // Ensure the move coordinates returned are within 0-9 bounds
    expect(move[0]).toBeGreaterThanOrEqual(0);
    expect(move[0]).toBeLessThan(10);
    expect(move[1]).toBeGreaterThanOrEqual(0);
    expect(move[1]).toBeLessThan(10);
  });

  test('computer should not attack the same coordinates twice', () => {
    const computer = new Player('CPU', true);
    const opponentBoard = new GameBoard();

    // Fill the board with 100 random moves
    for (let i = 0; i < 100; i++) {
      computer.makeRandomMove(opponentBoard);
    }

    // Flatten the 10x10 board and count non null cells
    const totalMoves = opponentBoard.board
      .flat()
      .filter((cell) => cell !== null).length;

    expect(totalMoves).toBe(100);
  });
});
