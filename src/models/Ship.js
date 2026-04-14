class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  // Increases the number of hits
  hit() {
    this.hits++;
  }

  // Calculates status based on length vs hits
  isSunk() {
    return this.hits >= this.length;
  }
}

module.exports = Ship;
