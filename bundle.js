/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles.css"
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://battleship/./src/styles.css?\n}");

/***/ },

/***/ "./src/main.js"
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n/* harmony import */ var _modules_events_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/events.js */ \"./src/modules/events.js\");\n\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  _modules_events_js__WEBPACK_IMPORTED_MODULE_1__.setupEventListeners();\n});\n\n\n//# sourceURL=webpack://battleship/./src/main.js?\n}");

/***/ },

/***/ "./src/models/AI.js"
/*!**************************!*\
  !*** ./src/models/AI.js ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ AI)\n/* harmony export */ });\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ \"./src/models/Player.js\");\n\n\nclass AI extends _Player__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor() {\n    super('Computer');\n    this.lastHit = null;\n    this.potentialTargets = [];\n  }\n\n  smartAttack(opponentBoard) {\n    let x, y;\n\n    // If we have potential targets from a previous hit, use them\n    if (this.potentialTargets.length > 0) {\n      [x, y] = this.potentialTargets.shift();\n    } else {\n      // Random guess\n      do {\n        x = Math.floor(Math.random() * 10);\n        y = Math.floor(Math.random() * 10);\n      } while (\n        opponentBoard.board[x][y] === 'hit' ||\n        opponentBoard.board[x][y] === 'miss'\n      );\n    }\n\n    const result = this.attack(opponentBoard, x, y);\n\n    if (result === true) {\n      this.lastHit = { x, y };\n      this.generateAdjacentTargets(x, y, opponentBoard);\n    }\n\n    return { x, y, result };\n  }\n\n  generateAdjacentTargets(x, y, board) {\n    const directions = [\n      [1, 0],\n      [-1, 0],\n      [0, 1],\n      [0, -1],\n    ];\n\n    directions.forEach(([dx, dy]) => {\n      const nx = x + dx;\n      const ny = y + dy;\n\n      if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10) {\n        const status = board.board[nx][ny];\n        const isAlreadyInQueue = this.potentialTargets.some(\n          ([px, py]) => px === nx && py === ny\n        );\n\n        if (status !== 'hit' && status !== 'miss' && !isAlreadyInQueue) {\n          this.potentialTargets.push([nx, ny]);\n        }\n      }\n    });\n  }\n}\n\n\n//# sourceURL=webpack://battleship/./src/models/AI.js?\n}");

/***/ },

/***/ "./src/models/GameBoard.js"
/*!*********************************!*\
  !*** ./src/models/GameBoard.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ GameBoard)\n/* harmony export */ });\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/models/Ship.js\");\n\n\nclass GameBoard {\n  constructor() {\n    // A 10x10 board initialized with null\n    this.board = Array(10)\n      .fill(null)\n      .map(() => Array(10).fill(null));\n    this.missedAttacks = [];\n    this.ships = [];\n  }\n\n  placeShip(ship, x, y, isVertical = false) {\n    // 1. BOUNDARY CHECK\n    // If vertical, check rows (x). If horizontal, check columns (y).\n    if (isVertical) {\n      if (x + ship.length > 10) throw new Error('Ship out of bounds');\n    } else {\n      if (y + ship.length > 10) throw new Error('Ship out of bounds');\n    }\n\n    // 2. COLLISION DETECTION\n    for (let i = 0; i < ship.length; i++) {\n      const checkX = isVertical ? x + i : x;\n      const checkY = isVertical ? y : y + i;\n\n      if (this.board[checkX][checkY] !== null) {\n        throw new Error('Ship collision');\n      }\n    }\n\n    // 3. PLACEMENT\n    for (let i = 0; i < ship.length; i++) {\n      const placeX = isVertical ? x + i : x;\n      const placeY = isVertical ? y : y + i;\n\n      this.board[placeX][placeY] = ship;\n    }\n\n    this.ships.push(ship);\n  }\n\n  placeShipsRandomly(lengthsArray) {\n    lengthsArray.forEach((length) => {\n      let placed = false;\n      while (!placed) {\n        const x = Math.floor(Math.random() * 10);\n        const y = Math.floor(Math.random() * 10);\n        const vertical = Math.random() > 0.5;\n\n        try {\n          // Create a bran new Ship instance for every placement\n          this.placeShip(new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](length), x, y, vertical);\n          placed = true;\n        } catch (error) {}\n      }\n    });\n  }\n\n  receiveAttack(x, y) {\n    const target = this.board[x][y];\n\n    // Return null to signify an invalid move (already hit/missed)\n    if (target === 'hit' || target === 'miss') return null;\n\n    if (target && typeof target === 'object') {\n      target.hit();\n      this.board[x][y] = 'hit';\n      return true; // Hit\n    }\n\n    this.board[x][y] = 'miss';\n    this.missedAttacks.push([x, y]);\n    return false; // Miss\n  }\n\n  getMissedAttacks() {\n    return this.missedAttacks;\n  }\n\n  allShipsSunk() {\n    // Check if every ship in ships array is sunk\n    return this.ships.every((ship) => ship.isSunk());\n  }\n\n  resetBoard() {\n    this.board = Array(10)\n      .fill(null)\n      .map(() => Array(10).fill(null));\n    this.ships = [];\n    this.missedAttacks = [];\n  }\n}\n\n\n//# sourceURL=webpack://battleship/./src/models/GameBoard.js?\n}");

/***/ },

/***/ "./src/models/Player.js"
/*!******************************!*\
  !*** ./src/models/Player.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _GameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameBoard */ \"./src/models/GameBoard.js\");\n\n\nclass Player {\n  constructor(name) {\n    this.name = name;\n    this.board = new _GameBoard__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  }\n\n  // Basic attack command.\n  // This simply delegates the logic to the opponents board.\n  attack(opponentBoard, x, y) {\n    return opponentBoard.receiveAttack(x, y);\n  }\n}\n\n\n//# sourceURL=webpack://battleship/./src/models/Player.js?\n}");

/***/ },

/***/ "./src/models/Ship.js"
/*!****************************!*\
  !*** ./src/models/Ship.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\n  constructor(length) {\n    this.length = length;\n    this.hits = 0;\n  }\n\n  hit() {\n    if (this.hits < this.length) this.hits++;\n  }\n\n  isSunk() {\n    return this.hits >= this.length;\n  }\n}\n\n\n//# sourceURL=webpack://battleship/./src/models/Ship.js?\n}");

/***/ },

/***/ "./src/modules/controller.js"
/*!***********************************!*\
  !*** ./src/modules/controller.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   completePassDevice: () => (/* binding */ completePassDevice),\n/* harmony export */   handlePlacementFinish: () => (/* binding */ handlePlacementFinish),\n/* harmony export */   handleRandomize: () => (/* binding */ handleRandomize),\n/* harmony export */   selectMode: () => (/* binding */ selectMode)\n/* harmony export */ });\n/* harmony import */ var _domController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domController */ \"./src/modules/domController.js\");\n/* harmony import */ var _dragDropController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dragDropController */ \"./src/modules/dragDropController.js\");\n/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state */ \"./src/modules/state.js\");\n\n\n\n\nconst selectMode = (mode) => {\n  _state__WEBPACK_IMPORTED_MODULE_2__.setGameMode(mode);\n  _domController__WEBPACK_IMPORTED_MODULE_0__.domController.hideMenu();\n  initGame(); // Starts the placement phase for Player 1\n};\n\nconst initGame = () => {\n  _domController__WEBPACK_IMPORTED_MODULE_0__.domController.updateStatus(\n    `${_state__WEBPACK_IMPORTED_MODULE_2__.getActivePlayer().name}: Place your fleet`\n  );\n  _domController__WEBPACK_IMPORTED_MODULE_0__.domController.disableStartButton('Finish Placement');\n\n  // Render initial empty board for Player 1\n  _domController__WEBPACK_IMPORTED_MODULE_0__.domController.renderBoard(\n    _state__WEBPACK_IMPORTED_MODULE_2__.getActivePlayer().board,\n    document.getElementById('player-board')\n  );\n\n  // Initialize DnD for the first player\n  setupPlacementPhase();\n};\n\nconst setupPlacementPhase = () => {\n  // Reset the dock, make sure hidden ships reappear for Player 2\n  _domController__WEBPACK_IMPORTED_MODULE_0__.domController.resetDock();\n\n  (0,_dragDropController__WEBPACK_IMPORTED_MODULE_1__.dragDropController)(_state__WEBPACK_IMPORTED_MODULE_2__.getActivePlayer(), () => {\n    _domController__WEBPACK_IMPORTED_MODULE_0__.domController.renderBoard(\n      _state__WEBPACK_IMPORTED_MODULE_2__.getActivePlayer().board,\n      document.getElementById('player-board')\n    );\n  });\n};\n\nconst handleRandomize = () => {\n  // Clear the current logical board and ships array\n  _state__WEBPACK_IMPORTED_MODULE_2__.resetBoard();\n  _state__WEBPACK_IMPORTED_MODULE_2__.placeShipsRandomly();\n\n  // Render and update UI\n  _domController__WEBPACK_IMPORTED_MODULE_0__.domController.renderBoard(\n    _state__WEBPACK_IMPORTED_MODULE_2__.getActivePlayer().board,\n    document.getElementById('player-board')\n  );\n\n  // Hide the dock ships\n  _domController__WEBPACK_IMPORTED_MODULE_0__.domController.setDock();\n\n  // Enable the start button\n  _domController__WEBPACK_IMPORTED_MODULE_0__.domController.enableStartButton();\n};\n\nconst handlePlacementFinish = () => {\n  // Disable button so P2 cant click 'Start' without placing ships\n  _domController__WEBPACK_IMPORTED_MODULE_0__.domController.disableStartButton();\n\n  if (_state__WEBPACK_IMPORTED_MODULE_2__.getGameMode() === 'ai') {\n    startGame();\n    return; // Exit early so we dont trigger pass device\n  }\n\n  // If we are playing PVP\n  if (_state__WEBPACK_IMPORTED_MODULE_2__.getPlacementTurn() === 1) {\n    // Player 1 to Player 2 transition\n    _state__WEBPACK_IMPORTED_MODULE_2__.togglePlacementTurn();\n    initiatePassDevice('Player 2');\n  } else {\n    // Player 2 to Player 1 transition\n    // Set gameStarted to true FIRST so that completePassDevice knows\n    // to run the battle logic instead of placement logic\n    _state__WEBPACK_IMPORTED_MODULE_2__.startGame();\n    initiatePassDevice('Player 1');\n  }\n};\n\nconst startGame = () => {\n  _state__WEBPACK_IMPORTED_MODULE_2__.startGame();\n\n  // Hide setup UI\n  _domController__WEBPACK_IMPORTED_MODULE_0__.domController.hideSetup();\n\n  // Start the battle with P1 as active\n  _state__WEBPACK_IMPORTED_MODULE_2__.setActivePlayer('p1');\n\n  _domController__WEBPACK_IMPORTED_MODULE_0__.domController.updateStatus('Battle Started! Attack the enemy board.');\n  updateUI();\n};\n\nconst updateUI = () => {\n  // Show active players ships\n  _domController__WEBPACK_IMPORTED_MODULE_0__.domController.renderBoard(\n    _state__WEBPACK_IMPORTED_MODULE_2__.getActivePlayer().board,\n    document.getElementById('player-board'),\n    null,\n    false\n  );\n\n  // Hide opponents ships\n  _domController__WEBPACK_IMPORTED_MODULE_0__.domController.renderBoard(\n    _state__WEBPACK_IMPORTED_MODULE_2__.getOpponent().board,\n    document.getElementById('opponent-board'),\n    handleAttack,\n    true\n  );\n};\n\nconst handleAttack = (x, y) => {\n  if (_state__WEBPACK_IMPORTED_MODULE_2__.isInteractionBlocked()) return;\n\n  const result = _state__WEBPACK_IMPORTED_MODULE_2__.attack(x, y);\n  if (result === null) return; // Invalid move\n\n  updateUI();\n\n  if (_state__WEBPACK_IMPORTED_MODULE_2__.checkWinner()) {\n    return endGame(_state__WEBPACK_IMPORTED_MODULE_2__.getActivePlayer().name);\n  }\n\n  // Lock interactions immediately\n  _state__WEBPACK_IMPORTED_MODULE_2__.setTransitioning(true);\n\n  if (_state__WEBPACK_IMPORTED_MODULE_2__.getGameMode() === 'pvp') {\n    // Longer delay for PVP so they can see the result of their hit\n    setTimeout(() => initiatePassDevice(_state__WEBPACK_IMPORTED_MODULE_2__.getOpponent().name), 1200);\n  } else {\n    // AI Turn\n    setTimeout(() => {\n      computerTurn();\n      // Only unlock after AI finishes\n      _state__WEBPACK_IMPORTED_MODULE_2__.setTransitioning(false);\n    }, 800);\n  }\n};\n\nconst endGame = (winnerName) => {\n  _state__WEBPACK_IMPORTED_MODULE_2__.toggleGameOver();\n  _domController__WEBPACK_IMPORTED_MODULE_0__.domController.updateStatus(`${winnerName} Wins!`);\n};\n\nconst initiatePassDevice = (nextPlayerName) => {\n  // 1. Hide the boards\n  // 2. SHow the pass screen\n  _domController__WEBPACK_IMPORTED_MODULE_0__.domController.hideBoards();\n  _domController__WEBPACK_IMPORTED_MODULE_0__.domController.updatePassScreen(nextPlayerName);\n  _domController__WEBPACK_IMPORTED_MODULE_0__.domController.showPassScreen();\n};\n\nconst computerTurn = () => {\n  // Use the smartAttack method\n  _state__WEBPACK_IMPORTED_MODULE_2__.computerAttack();\n\n  updateUI();\n\n  if (_state__WEBPACK_IMPORTED_MODULE_2__.checkWinner()) {\n    return endGame('Computer');\n  }\n\n  _state__WEBPACK_IMPORTED_MODULE_2__.setTransitioning(false);\n};\n\nconst completePassDevice = () => {\n  _domController__WEBPACK_IMPORTED_MODULE_0__.domController.hidePassScreen();\n  _domController__WEBPACK_IMPORTED_MODULE_0__.domController.showBoards();\n\n  // If the game hasnt started yet, we are in placement.\n  if (!_state__WEBPACK_IMPORTED_MODULE_2__.isGameStarted()) {\n    if (_state__WEBPACK_IMPORTED_MODULE_2__.getPlacementTurn() === 2) {\n      // Its Player 2 turn to place ships\n      _state__WEBPACK_IMPORTED_MODULE_2__.swapPlayers();\n      _domController__WEBPACK_IMPORTED_MODULE_0__.domController.updateStatus(\n        `${_state__WEBPACK_IMPORTED_MODULE_2__.getActivePlayer().name}: Place your fleet`\n      );\n      initGameForPlayer2();\n    } else {\n      // Player 2 finished, P1 clicked 'Ready' to start the actual battle\n      startGame();\n      // IMPORTANT: Ensure the board is clickable for the first turn\n      _state__WEBPACK_IMPORTED_MODULE_2__.setTransitioning(false);\n    }\n    return; // Exit early dont run battle logic yet.\n  }\n\n  // 2. BATTLE PHASE LOGIC\n  // If we reach here, the game is officially \"on\".\n  _state__WEBPACK_IMPORTED_MODULE_2__.swapPlayers();\n  _domController__WEBPACK_IMPORTED_MODULE_0__.domController.updateStatus(`${_state__WEBPACK_IMPORTED_MODULE_2__.getActivePlayer().name}'s Turn`);\n  updateUI();\n\n  _state__WEBPACK_IMPORTED_MODULE_2__.setTransitioning(false);\n};\n\nconst initGameForPlayer2 = () => {\n  _domController__WEBPACK_IMPORTED_MODULE_0__.domController.renderBoard(\n    _state__WEBPACK_IMPORTED_MODULE_2__.getActivePlayer().board,\n    document.getElementById('player-board')\n  );\n  _domController__WEBPACK_IMPORTED_MODULE_0__.domController.disableStartButton('Start Battle');\n  setupPlacementPhase();\n};\n\n\n//# sourceURL=webpack://battleship/./src/modules/controller.js?\n}");

/***/ },

/***/ "./src/modules/domController.js"
/*!**************************************!*\
  !*** ./src/modules/domController.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   domController: () => (/* binding */ domController)\n/* harmony export */ });\nconst elements = {\n  playerBoard: document.getElementById('player-board'),\n  opponentBoard: document.getElementById('opponent-board'),\n  gameStatus: document.getElementById('game-status'),\n  setupControls: document.getElementById('setup-controls'),\n  setupContainer: document.getElementById('setup-container'),\n  startButton: document.getElementById('start-button'),\n};\n\nconst domController = {\n  renderBoard: (gameBoard, container, clickHandler, isOpponent = false) => {\n    // We create a fragment to minimize \"reflows\" (re-painting the screen)\n    const fragment = document.createDocumentFragment();\n    container.innerHTML = '';\n\n    gameBoard.board.forEach((row, x) => {\n      row.forEach((cell, y) => {\n        const cellDiv = document.createElement('div');\n        cellDiv.className = 'cell';\n        cellDiv.dataset.x = x;\n        cellDiv.dataset.y = y;\n\n        if (cell === 'hit') cellDiv.classList.add('hit');\n        if (cell === 'miss') cellDiv.classList.add('miss');\n\n        const isShip = typeof cell === 'object' && cell !== null;\n        if (isShip && !isOpponent) cellDiv.classList.add('ship');\n\n        fragment.appendChild(cellDiv);\n      });\n    });\n\n    container.appendChild(fragment);\n\n    // Event Delegation: One listener for the whole board\n    if (clickHandler) {\n      // Remove old listener to prevent memory leaks if container is reused\n      container.onclick = (e) => {\n        const cell = e.target.closest('.cell');\n        if (!cell) return;\n        const { x, y } = cell.dataset;\n        clickHandler(Number(x), Number(y));\n      };\n    }\n  },\n\n  updateStatus: (message) => {\n    elements.gameStatus.textContent = message;\n    // Adding a small animation trigger here is a nice UX touch\n    elements.gameStatus.classList.remove('pulse');\n    void elements.gameStatus.offsetWidth; // Trigger reflow\n    elements.gameStatus.classList.add('pulse');\n  },\n\n  resetDock: () => {\n    document\n      .querySelectorAll('.draggable-ship')\n      .forEach((ship) => ship.classList.remove('hidden'));\n  },\n\n  setDock: () => {\n    document\n      .querySelectorAll('.draggable-ship')\n      .forEach((ship) => ship.classList.add('hidden'));\n  },\n\n  enableStartButton: () => {\n    elements.startButton.disabled = false;\n  },\n\n  disableStartButton: (message = null) => {\n    if (message) elements.startButton.textContent = message;\n    elements.startButton.disabled = true;\n  },\n\n  hideSetup: () => {\n    elements.setupControls.classList.add('hidden'); // Hide buttons\n    elements.setupContainer.classList.add('hidden');\n  },\n\n  hideBoards: () => {\n    document.getElementById('game-container').classList.add('hidden');\n  },\n\n  showBoards: () => {\n    document.getElementById('game-container').classList.remove('hidden');\n  },\n\n  updateStatus: (message) => {\n    elements.gameStatus.textContent = message;\n  },\n\n  showPassScreen: () => {\n    document.getElementById('pass-device-screen').classList.remove('hidden');\n  },\n\n  hidePassScreen: () => {\n    document.getElementById('pass-device-screen').classList.add('hidden');\n  },\n\n  hideMenu: () => {\n    document.getElementById('menu-screen').classList.add('hidden');\n  },\n\n  updatePassScreen: (nextPlayerName) => {\n    document.getElementById('next-player-name').textContent =\n      `${nextPlayerName}'s Turn`;\n  },\n};\n\n\n//# sourceURL=webpack://battleship/./src/modules/domController.js?\n}");

/***/ },

/***/ "./src/modules/dragDropController.js"
/*!*******************************************!*\
  !*** ./src/modules/dragDropController.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   dragDropController: () => (/* binding */ dragDropController)\n/* harmony export */ });\n/* harmony import */ var _models_Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Ship */ \"./src/models/Ship.js\");\n\n\nconst dragDropController = (player, renderCallback) => {\n  let currentAxis = 'horizontal';\n  let draggedShipLength = null;\n  let draggedShipElement = null;\n\n  // Axis Toggle\n  const axisButton = document.getElementById('axis-button');\n  axisButton.addEventListener('click', () => {\n    currentAxis = currentAxis === 'horizontal' ? 'vertical' : 'horizontal';\n    axisButton.textContent = `Axis ${currentAxis.charAt(0).toUpperCase() + currentAxis.slice(1)}`;\n  });\n\n  // Ship Dock listeners\n  const ships = document.querySelectorAll('.draggable-ship');\n  ships.forEach((ship) => {\n    ship.addEventListener('dragstart', (event) => {\n      draggedShipLength = parseInt(event.target.dataset.length);\n      draggedShipElement = event.target;\n    });\n  });\n\n  // --- Event Delegation on the Parent Board ---\n  const oldBoard = document.getElementById('player-board');\n  // CLONE the board to strip all existing drag/drop event listeners\n  const boardContainer = oldBoard.cloneNode(true);\n  oldBoard.parentNode.replaceChild(boardContainer, oldBoard);\n\n  boardContainer.addEventListener('dragover', (event) => {\n    event.preventDefault(); // Required to allow drop\n  });\n\n  boardContainer.addEventListener('drop', (event) => {\n    event.preventDefault();\n\n    // Check if its a cell\n    const cell = event.target.closest('.cell');\n    if (!cell) return;\n\n    const x = parseInt(cell.dataset.x);\n    const y = parseInt(cell.dataset.y);\n    const isVertical = currentAxis === 'vertical';\n\n    try {\n      player.board.placeShip(new _models_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](draggedShipLength), x, y, isVertical);\n\n      // 1. Hide the ship from the dock\n      draggedShipElement.classList.add('hidden');\n\n      // 2. Tell Main.js to redraw the board\n      renderCallback();\n\n      // 3. Check if game can start\n      checkIfAllPlaced();\n    } catch (error) {\n      console.warn('Invalid placement:', error.message);\n    }\n  });\n\n  const checkIfAllPlaced = () => {\n    const remaining = document.querySelectorAll('.draggable-ship:not(.hidden)');\n    if (remaining.length === 0) {\n      document.getElementById('start-button').disabled = false;\n    }\n  };\n};\n\n\n//# sourceURL=webpack://battleship/./src/modules/dragDropController.js?\n}");

/***/ },

/***/ "./src/modules/events.js"
/*!*******************************!*\
  !*** ./src/modules/events.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setupEventListeners: () => (/* binding */ setupEventListeners)\n/* harmony export */ });\n/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller.js */ \"./src/modules/controller.js\");\n\n\n/**\n * Maps element IDs to their respective controller handlers\n */\nconst EVENT_MAP = {\n  'start-button': _controller_js__WEBPACK_IMPORTED_MODULE_0__.handlePlacementFinish,\n  'continue-button': _controller_js__WEBPACK_IMPORTED_MODULE_0__.completePassDevice,\n  'randomize-button': _controller_js__WEBPACK_IMPORTED_MODULE_0__.handleRandomize,\n};\n\nconst setupEventListeners = () => {\n  // Handle simple button clicks via mapping\n  Object.entries(EVENT_MAP).forEach(([id, handler]) => {\n    const element = document.getElementById(id);\n    if (element) element.addEventListener('click', handler);\n  });\n\n  // Handle mode selection separately for arguments\n  const aiButton = document.getElementById('vs-computer-button');\n  const pvpButton = document.getElementById('vs-player-button');\n\n  if (aiButton)\n    aiButton.addEventListener('click', () => _controller_js__WEBPACK_IMPORTED_MODULE_0__.selectMode('ai'));\n  if (pvpButton)\n    pvpButton.addEventListener('click', () => _controller_js__WEBPACK_IMPORTED_MODULE_0__.selectMode('pvp'));\n};\n\n\n//# sourceURL=webpack://battleship/./src/modules/events.js?\n}");

/***/ },

/***/ "./src/modules/state.js"
/*!******************************!*\
  !*** ./src/modules/state.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   attack: () => (/* binding */ attack),\n/* harmony export */   checkWinner: () => (/* binding */ checkWinner),\n/* harmony export */   computerAttack: () => (/* binding */ computerAttack),\n/* harmony export */   getActivePlayer: () => (/* binding */ getActivePlayer),\n/* harmony export */   getGameMode: () => (/* binding */ getGameMode),\n/* harmony export */   getIsTransitioning: () => (/* binding */ getIsTransitioning),\n/* harmony export */   getOpponent: () => (/* binding */ getOpponent),\n/* harmony export */   getPlacementTurn: () => (/* binding */ getPlacementTurn),\n/* harmony export */   isGameStarted: () => (/* binding */ isGameStarted),\n/* harmony export */   isInteractionBlocked: () => (/* binding */ isInteractionBlocked),\n/* harmony export */   placeShipsRandomly: () => (/* binding */ placeShipsRandomly),\n/* harmony export */   resetBoard: () => (/* binding */ resetBoard),\n/* harmony export */   setActivePlayer: () => (/* binding */ setActivePlayer),\n/* harmony export */   setGameMode: () => (/* binding */ setGameMode),\n/* harmony export */   setTransitioning: () => (/* binding */ setTransitioning),\n/* harmony export */   startGame: () => (/* binding */ startGame),\n/* harmony export */   swapPlayers: () => (/* binding */ swapPlayers),\n/* harmony export */   toggleGameOver: () => (/* binding */ toggleGameOver),\n/* harmony export */   togglePlacementTurn: () => (/* binding */ togglePlacementTurn)\n/* harmony export */ });\n/* harmony import */ var _models_AI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/AI */ \"./src/models/AI.js\");\n/* harmony import */ var _models_Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/Player */ \"./src/models/Player.js\");\n\n\n\n// Internal State\nlet player1 = new _models_Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Player 1');\nlet player2 = new _models_Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Player 2');\n\nlet activePlayer = player1;\nlet opponent = player2;\n\nlet gameMode = null;\nlet gameStarted = false;\nlet isGameOver = false;\nlet isTransitioning = false;\nlet placementTurn = 1;\n\n// --- Getters ---\nconst getActivePlayer = () => activePlayer;\nconst getOpponent = () => opponent;\nconst getGameMode = () => gameMode;\nconst getPlacementTurn = () => placementTurn;\nconst isGameStarted = () => gameStarted;\nconst getIsTransitioning = () => isTransitioning;\n\n/**\n * Returns true if the user is prevented from interacting with the board\n */\nconst isInteractionBlocked = () =>\n  isGameOver || isTransitioning || !gameStarted;\n\n// --- Setters / Actions ---\nconst setGameMode = (mode) => {\n  gameMode = mode;\n\n  if (gameMode === 'ai') {\n    player2 = new _models_AI__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    opponent = activePlayer === player1 ? player2 : player1;\n\n    // Auto-place AI ships\n    player2.board.placeShipsRandomly([5, 4, 3, 2]);\n  }\n};\n\nconst setActivePlayer = (playerKey) => {\n  if (playerKey === 'p1') {\n    activePlayer = player1;\n    opponent = player2;\n  } else {\n    activePlayer = player2;\n    opponent = player1;\n  }\n};\n\nconst swapPlayers = () => {\n  [activePlayer, opponent] = [opponent, activePlayer];\n};\n\nconst togglePlacementTurn = () => {\n  placementTurn = placementTurn === 1 ? 2 : 1;\n};\n\nconst startGame = () => {\n  gameStarted = true;\n};\nconst toggleGameOver = () => {\n  isGameOver = !isGameOver;\n};\nconst setTransitioning = (boolean) => {\n  isTransitioning = boolean;\n};\n\n// --- Logic Delegates ---\nconst attack = (x, y) => activePlayer.attack(opponent.board, x, y);\nconst computerAttack = () => player2.smartAttack(player1.board);\nconst checkWinner = () => opponent.board.allShipsSunk();\nconst resetBoard = () => activePlayer.board.resetBoard();\nconst placeShipsRandomly = () =>\n  activePlayer.board.placeShipsRandomly([5, 4, 3, 2]);\n\n\n//# sourceURL=webpack://battleship/./src/modules/state.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;