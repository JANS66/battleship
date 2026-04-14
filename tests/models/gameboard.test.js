const GameBoard = require('../../src/models/GameBoard');
const Ship = require('../../src/models/Ship');

test('Gameboard can place a ship at specific coordinates', () => {
  const board = new GameBoard();
  const ship = new Ship(3);
  board.placeShip(ship, 0, 0);

  // Check if receiving an attack at that spot registers as a hit
  expect(board.receiveAttack(0, 0)).toBe(true);
});

test('receiveAttack should record a miss if no ship is present', () => {
  const board = new GameBoard();
  board.receiveAttack(5, 5);
  expect(board.getMissedAttacks()).toContainEqual([5, 5]);
});

test('receiveAttack should call hit() on the ship if hit', () => {
  const board = new GameBoard();
  const ship = new Ship(3);
  board.placeShip(ship, 1, 1);
  board.receiveAttack(1, 1);
  expect(ship.hits).toBe(1);
});

test('should report true when all ships are sunk', () => {
  const board = new GameBoard();
  const ship1 = new Ship(1);
  const ship2 = new Ship(1);

  board.placeShip(ship1, 0, 0);
  board.placeShip(ship2, 5, 5);

  board.receiveAttack(0, 0);
  board.receiveAttack(5, 5);

  expect(board.allShipsSunk()).toBe(true);
});

test('receiveAttack should not record duplicate misses', () => {
  const board = new GameBoard();
  board.receiveAttack(5, 5);
  board.receiveAttack(5, 5);
  expect(board.getMissedAttacks().length).toBe(1);
});

test('placeShip should throw error if ship is placed out of bounds', () => {
  const board = new GameBoard();
  const ship = new Ship(4);
  // Trying to place a length 4 ship at index 7 (reaches index 11)
  expect(() => board.placeShip(ship, 0, 7)).toThrow('Ship out of bounds');
});

test('placeShip should throw error if ships overlap', () => {
  const board = new GameBoard();
  const ship1 = new Ship(3);
  const ship2 = new Ship(3);

  board.placeShip(ship1, 0, 0);
  // This overlaps with ship1 at (0, 1) and (0, 2)
  expect(() => board.placeShip(ship2, 0, 1)).toThrow('Ship collision');
});

test('receiveAttack should not hit the same ship coordinate twice', () => {
  const board = new GameBoard();
  const ship = new Ship(3);
  board.placeShip(ship, 0, 0);

  board.receiveAttack(0, 0); // First hit
  board.receiveAttack(0, 0); // Second hit on same sport

  expect(ship.hits).toBe(1); // Should still only be 1
});
