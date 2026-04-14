const Ship = require('../../src/models/Ship');

test('ship should not be sunk initially', () => {
  const ship = new Ship(3);
  expect(ship.isSunk()).toBe(false);
});

test('ship should be sunk when hits equal length', () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
