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

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n/* harmony import */ var _models_Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/Player */ \"./src/models/Player.js\");\n/* harmony import */ var _modules_domController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/domController */ \"./src/modules/domController.js\");\n/* harmony import */ var _modules_dragDropController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/dragDropController */ \"./src/modules/dragDropController.js\");\n/* harmony import */ var _models_AI__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./models/AI */ \"./src/models/AI.js\");\n\n\n\n\n\n\n// --- STATE MANAGEMENT ---\nlet player1 = new _models_Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Player 1');\nlet player2 = new _models_Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Player 2');\n\nlet activePlayer = player1;\nlet opponent = player2;\n\nlet isGameOver = false;\nlet gameStarted = false;\nlet isTransitioning = false; // Prevents peeking or clicking during transition\nlet placementTurn = 1; // Track who is currently placing ships\n\nlet gameMode = null;\n\nconst selectMode = (mode) => {\n  gameMode = mode;\n  _modules_domController__WEBPACK_IMPORTED_MODULE_2__[\"default\"].hideScreen('menu-screen');\n\n  if (gameMode === 'ai') {\n    // RE ASSIGN player2 to be an instance of the AI class\n    player2 = new _models_AI__WEBPACK_IMPORTED_MODULE_4__[\"default\"]();\n    opponent = player2; // Ensure the opponent reference is updated\n\n    // AI places ships immediately\n    player2.board.placeShipsRandomly([5, 4, 3, 2]);\n  }\n\n  initGame(); // Starts the placement phase for Player 1\n};\n\nconst initGame = () => {\n  _modules_domController__WEBPACK_IMPORTED_MODULE_2__[\"default\"].updateStatus(`${activePlayer.name}: Place your fleet`);\n\n  // Reset start button\n  const startButton = document.getElementById('start-button');\n  startButton.disabled = true;\n  startButton.textContent = 'Finish Placement';\n\n  // Render initial empty board for Player 1\n  _modules_domController__WEBPACK_IMPORTED_MODULE_2__[\"default\"].renderBoard(\n    activePlayer.board,\n    document.getElementById('player-board')\n  );\n\n  // Initialize DnD for the first player\n  setupPlacementPhase();\n};\n\nconst setupPlacementPhase = () => {\n  // Reset the dock, make sure hidden ships reappear for Player 2\n  document\n    .querySelectorAll('.draggable-ship')\n    .forEach((ship) => ship.classList.remove('hidden'));\n\n  (0,_modules_dragDropController__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(activePlayer, () => {\n    _modules_domController__WEBPACK_IMPORTED_MODULE_2__[\"default\"].renderBoard(\n      activePlayer.board,\n      document.getElementById('player-board')\n    );\n  });\n};\n\nconst handlePlacementFinish = () => {\n  // Disable button so P2 cant click 'Start' without placing ships\n  document.getElementById('start-button').disabled = true;\n\n  if (gameMode === 'ai') {\n    startGame();\n    return; // Exit early so we dont trigger pass device\n  }\n\n  // If we are playing PVP\n  if (placementTurn === 1) {\n    // Player 1 to Player 2 transition\n    placementTurn = 2;\n    initiatePassDevice('Player 2', true); // true indicates that game is still in setup\n  } else {\n    // Player 2 to Player 1 transition\n    // Set gameStarted to true FIRST so that completePassDevice knows\n    // to run the battle logic instead of placement logic\n    gameStarted = true;\n    initiatePassDevice('Player 1', false);\n  }\n};\n\nconst startGame = () => {\n  gameStarted = true;\n\n  // Hide setup UI\n  document.getElementById('setup-controls').classList.add('hidden'); // Hide buttons\n  document.getElementById('setup-container').classList.add('hidden');\n\n  // Start the battle with P1 as active\n  activePlayer = player1;\n  opponent = player2;\n\n  _modules_domController__WEBPACK_IMPORTED_MODULE_2__[\"default\"].updateStatus('Battle Started! Attack the enemy board.');\n  updateUI();\n};\n\nconst updateUI = () => {\n  const playerBoardContainer = document.getElementById('player-board');\n  const opponentBoardContainer = document.getElementById('opponent-board'); // Labelled enemy waters in html\n\n  // Show active players ships\n  _modules_domController__WEBPACK_IMPORTED_MODULE_2__[\"default\"].renderBoard(\n    activePlayer.board,\n    playerBoardContainer,\n    null,\n    false\n  );\n\n  // Hide opponents ships\n  _modules_domController__WEBPACK_IMPORTED_MODULE_2__[\"default\"].renderBoard(\n    opponent.board,\n    opponentBoardContainer,\n    handleAttack,\n    true\n  );\n};\n\nconst handleRandomize = () => {\n  // Clear the current logical board and ships array\n  activePlayer.board.resetBoard();\n  activePlayer.board.placeShipsRandomly([5, 4, 3, 2]);\n\n  // Render and update UI\n  _modules_domController__WEBPACK_IMPORTED_MODULE_2__[\"default\"].renderBoard(\n    activePlayer.board,\n    document.getElementById('player-board')\n  );\n\n  // Hide the dock ships\n  document\n    .querySelectorAll('.draggable-ship')\n    .forEach((ship) => ship.classList.add('hidden'));\n\n  // Enable the start button\n  document.getElementById('start-button').disabled = false;\n};\n\n// --- GAME LOOP LOGIC ---\n\nconst handleAttack = (x, y) => {\n  if (isGameOver || isTransitioning || !gameStarted) return;\n\n  const result = activePlayer.attack(opponent.board, x, y);\n  if (result === undefined) return; // Invalid move\n\n  updateUI();\n\n  if (opponent.board.allShipsSunk()) {\n    return endGame(activePlayer.name);\n  }\n\n  if (gameMode === 'pvp') {\n    isTransitioning = true;\n    setTimeout(() => initiatePassDevice(opponent.name, false), 1000);\n  } else {\n    // VS Computer Mode\n    isTransitioning = true; // Disable clicks during AI thinking\n    setTimeout(computerTurn, 800);\n  }\n};\n\nconst computerTurn = () => {\n  // Use the smartAttack method\n  player2.smartAttack(player1.board);\n  updateUI();\n\n  if (player1.board.allShipsSunk()) {\n    return endGame('Computer');\n  }\n\n  isTransitioning = false;\n};\n\nconst endGame = (winnerName) => {\n  isGameOver = true;\n  _modules_domController__WEBPACK_IMPORTED_MODULE_2__[\"default\"].updateStatus(`${winnerName} Wins!`);\n};\n\nconst initiatePassDevice = (nextPlayerName, isStillSetup) => {\n  // 1. Hide the boards\n  document.getElementById('game-container').classList.add('hidden');\n\n  // 2. SHow the pass screen\n  _modules_domController__WEBPACK_IMPORTED_MODULE_2__[\"default\"].updatePassScreen(nextPlayerName);\n  _modules_domController__WEBPACK_IMPORTED_MODULE_2__[\"default\"].showScreen('pass-device-screen');\n};\n\nconst completePassDevice = () => {\n  _modules_domController__WEBPACK_IMPORTED_MODULE_2__[\"default\"].hideScreen('pass-device-screen');\n  document.getElementById('game-container').classList.remove('hidden');\n\n  // Logic for setup phase\n  if (placementTurn === 2 && !gameStarted) {\n    [activePlayer, opponent] = [opponent, activePlayer];\n    _modules_domController__WEBPACK_IMPORTED_MODULE_2__[\"default\"].updateStatus(`${activePlayer.name}: Place your fleet`);\n    initGameForPlayer2();\n    return;\n  }\n\n  // Logic for Battle Phase\n  if (gameStarted) {\n    const statusText = document.getElementById('game-status').textContent;\n    if (statusText === 'Arrange your fleet!' || placementTurn === 2) {\n      startGame();\n      // Reset placementTurn so this block doesnt repeat incorrectly\n      placementTurn = 0;\n    } else {\n      // Standard turn swap during gameplay\n      [activePlayer, opponent] = [opponent, activePlayer];\n      _modules_domController__WEBPACK_IMPORTED_MODULE_2__[\"default\"].updateStatus(`${activePlayer.name}'s Turn`);\n      updateUI();\n    }\n  }\n\n  isTransitioning = false;\n};\n\nconst initGameForPlayer2 = () => {\n  _modules_domController__WEBPACK_IMPORTED_MODULE_2__[\"default\"].renderBoard(\n    activePlayer.board,\n    document.getElementById('player-board')\n  );\n  const startButton = document.getElementById('start-button');\n  startButton.disabled = true;\n  startButton.textContent = 'Start Battle';\n  setupPlacementPhase();\n};\n\n// --- EVENT LISTENERS ---\ndocument\n  .getElementById('start-button')\n  .addEventListener('click', handlePlacementFinish);\ndocument\n  .getElementById('continue-button')\n  .addEventListener('click', completePassDevice);\ndocument\n  .getElementById('vs-computer-button')\n  .addEventListener('click', () => selectMode('ai'));\ndocument\n  .getElementById('vs-player-button')\n  .addEventListener('click', () => selectMode('pvp'));\ndocument\n  .getElementById('randomize-button')\n  .addEventListener('click', handleRandomize);\n\n\n//# sourceURL=webpack://battleship/./src/main.js?\n}");

/***/ },

/***/ "./src/models/AI.js"
/*!**************************!*\
  !*** ./src/models/AI.js ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ \"./src/models/Player.js\");\n\n\nclass AI extends _Player__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor() {\n    super('Computer');\n    this.lastHit = null;\n    this.potentialTargets = [];\n  }\n\n  smartAttack(opponentBoard) {\n    let x, y;\n\n    // If we have potential targets from a previous hit, use them\n    if (this.potentialTargets.length > 0) {\n      [x, y] = this.potentialTargets.shift();\n    } else {\n      // Random guess\n      do {\n        x = Math.floor(Math.random() * 10);\n        y = Math.floor(Math.random() * 10);\n      } while (\n        opponentBoard.board[x][y] === 'hit' ||\n        opponentBoard.board[x][y] === 'miss'\n      );\n    }\n\n    const result = this.attack(opponentBoard, x, y);\n\n    if (result === true) {\n      this.lastHit = { x, y };\n      this.generateAdjacentTargets(x, y, opponentBoard);\n    }\n\n    return { x, y, result };\n  }\n\n  generateAdjacentTargets(x, y, board) {\n    const coords = [\n      [x + 1, y],\n      [x - 1, y],\n      [x, y + 1],\n      [x, y - 1],\n    ];\n\n    coords.forEach(([nx, ny]) => {\n      // Validation\n      // Check if withing bounds AND not already attacked\n      if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10) {\n        const status = board.board[nx][ny];\n        if (status !== 'hit' && status !== 'miss') {\n          // Add to the start of the queue to prioritize these\n          this.potentialTargets.push([nx, ny]);\n        }\n      }\n    });\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AI);\n\n\n//# sourceURL=webpack://battleship/./src/models/AI.js?\n}");

/***/ },

/***/ "./src/models/GameBoard.js"
/*!*********************************!*\
  !*** ./src/models/GameBoard.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/models/Ship.js\");\n\n\nclass GameBoard {\n  constructor() {\n    // A 10x10 board initialized with null\n    this.board = Array(10)\n      .fill(null)\n      .map(() => Array(10).fill(null));\n    this.missedAttacks = [];\n    this.ships = [];\n  }\n\n  placeShip(ship, x, y, isVertical = false) {\n    // 1. BOUNDARY CHECK\n    // If vertical, check rows (x). If horizontal, check columns (y).\n    if (isVertical) {\n      if (x + ship.length > 10) throw new Error('Ship out of bounds');\n    } else {\n      if (y + ship.length > 10) throw new Error('Ship out of bounds');\n    }\n\n    // 2. COLLISION DETECTION\n    for (let i = 0; i < ship.length; i++) {\n      const checkX = isVertical ? x + i : x;\n      const checkY = isVertical ? y : y + i;\n\n      if (this.board[checkX][checkY] !== null) {\n        throw new Error('Ship collision');\n      }\n    }\n\n    // 3. PLACEMENT\n    for (let i = 0; i < ship.length; i++) {\n      const placeX = isVertical ? x + i : x;\n      const placeY = isVertical ? y : y + i;\n\n      this.board[placeX][placeY] = ship;\n    }\n\n    this.ships.push(ship);\n  }\n\n  placeShipsRandomly(lengthsArray) {\n    lengthsArray.forEach((length) => {\n      let placed = false;\n      while (!placed) {\n        const x = Math.floor(Math.random() * 10);\n        const y = Math.floor(Math.random() * 10);\n        const vertical = Math.random() > 0.5;\n\n        try {\n          // Create a bran new Ship instance for every placement\n          this.placeShip(new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](length), x, y, vertical);\n          placed = true;\n        } catch (error) {}\n      }\n    });\n  }\n\n  receiveAttack(x, y) {\n    const target = this.board[x][y];\n\n    // 1. Guard Clause: If the spot is already \"hit\" or \"miss\", stop immediately.\n    if (target === 'hit' || target === 'miss') {\n      return;\n    }\n\n    // 2. Handle a Hit\n    if (target !== null && typeof target === 'object') {\n      target.hit();\n      this.board[x][y] = 'hit'; // Mark the board\n      return true;\n    }\n\n    // 3. Handle a Miss\n    this.board[x][y] = 'miss'; // Mark the board\n    this.missedAttacks.push([x, y]); // Kepp this for UI/display logic\n    return false;\n  }\n\n  getMissedAttacks() {\n    return this.missedAttacks;\n  }\n\n  allShipsSunk() {\n    // Check if every ship in ships array is sunk\n    return this.ships.every((ship) => ship.isSunk());\n  }\n\n  resetBoard() {\n    this.board = Array(10)\n      .fill(null)\n      .map(() => Array(10).fill(null));\n    this.ships = [];\n    this.missedAttacks = [];\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameBoard);\n\n\n//# sourceURL=webpack://battleship/./src/models/GameBoard.js?\n}");

/***/ },

/***/ "./src/models/Player.js"
/*!******************************!*\
  !*** ./src/models/Player.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _GameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameBoard */ \"./src/models/GameBoard.js\");\n\n\nclass Player {\n  constructor(name, isComputer = false) {\n    this.name = name;\n    this.isComputer = isComputer;\n    this.board = new _GameBoard__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  }\n\n  // Basic attack command.\n  // This simply delegates the logic to the opponents board.\n  attack(opponentBoard, x, y) {\n    return opponentBoard.receiveAttack(x, y);\n  }\n\n  // Computer AI logic:\n  // Continues to pick random coordinates until receiveAttack\n  // returns a valid result (true or false) rather than undefined.\n  makeRandomMove(opponentBoard) {\n    if (!this.isComputer) return;\n\n    let x, y, result;\n\n    do {\n      x = Math.floor(Math.random() * 10);\n      y = Math.floor(Math.random() * 10);\n\n      // Relying on GameBoard to return undefined for duplicate moves\n      result = this.attack(opponentBoard, x, y);\n    } while (result === undefined);\n\n    return [x, y];\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n\n//# sourceURL=webpack://battleship/./src/models/Player.js?\n}");

/***/ },

/***/ "./src/models/Ship.js"
/*!****************************!*\
  !*** ./src/models/Ship.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Ship {\n  constructor(length) {\n    this.length = length;\n    this.hits = 0;\n  }\n\n  // Increases the number of hits\n  hit() {\n    this.hits++;\n  }\n\n  // Calculates status based on length vs hits\n  isSunk() {\n    return this.hits >= this.length;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n\n//# sourceURL=webpack://battleship/./src/models/Ship.js?\n}");

/***/ },

/***/ "./src/modules/domController.js"
/*!**************************************!*\
  !*** ./src/modules/domController.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst domController = {\n  renderBoard: (gameBoard, container, clickHandler, isOpponent = false) => {\n    container.innerHTML = ''; // Clear the board\n\n    gameBoard.board.forEach((row, x) => {\n      row.forEach((cell, y) => {\n        const cellDiv = document.createElement('div');\n        cellDiv.classList.add('cell');\n\n        // --- Setting the datasets ---\n        cellDiv.dataset.x = x;\n        cellDiv.dataset.y = y;\n\n        // 1. Always show hits and misses (Public knowledge)\n        if (cell === 'hit') cellDiv.classList.add('hit');\n        if (cell === 'miss') cellDiv.classList.add('miss');\n\n        // 2. Logic for showing ships (Private knowledge)\n        // Use isOpponent flag instead of container ID.\n        // Only add the 'ship' class if there is a ship AND it is not the opponents board.\n        const isShip = typeof cell === 'object' && cell !== null;\n        if (isShip && !isOpponent) {\n          cellDiv.classList.add('ship');\n        }\n\n        // 3. Event Listeners\n        // Only attach clicks if a handler is provided\n        if (clickHandler && cell !== 'hit' && cell !== 'miss') {\n          cellDiv.addEventListener('click', () => clickHandler(x, y));\n        }\n\n        container.appendChild(cellDiv);\n      });\n    });\n  },\n\n  updateStatus: (message) => {\n    document.getElementById('game-status').textContent = message;\n  },\n\n  showScreen: (screenId) => {\n    document.getElementById(screenId).classList.remove('hidden');\n  },\n\n  hideScreen: (screenId) => {\n    document.getElementById(screenId).classList.add('hidden');\n  },\n\n  updatePassScreen: (nextPlayerName) => {\n    document.getElementById('next-player-name').textContent =\n      `${nextPlayerName}'s Turn`;\n  },\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (domController);\n\n\n//# sourceURL=webpack://battleship/./src/modules/domController.js?\n}");

/***/ },

/***/ "./src/modules/dragDropController.js"
/*!*******************************************!*\
  !*** ./src/modules/dragDropController.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Ship */ \"./src/models/Ship.js\");\n\n\nconst dragDropController = (player, renderCallback) => {\n  let currentAxis = 'horizontal';\n  let draggedShipLength = null;\n  let draggedShipElement = null;\n\n  // Axis Toggle\n  const axisButton = document.getElementById('axis-button');\n  axisButton.addEventListener('click', () => {\n    currentAxis = currentAxis === 'horizontal' ? 'vertical' : 'horizontal';\n    axisButton.textContent = `Axis ${currentAxis.charAt(0).toUpperCase() + currentAxis.slice(1)}`;\n  });\n\n  // Ship Dock listeners\n  const ships = document.querySelectorAll('.draggable-ship');\n  ships.forEach((ship) => {\n    ship.addEventListener('dragstart', (event) => {\n      draggedShipLength = parseInt(event.target.dataset.length);\n      draggedShipElement = event.target;\n    });\n  });\n\n  // --- Event Delegation on the Parent Board ---\n  const oldBoard = document.getElementById('player-board');\n  // CLONE the board to strip all existing drag/drop event listeners\n  const boardContainer = oldBoard.cloneNode(true);\n  oldBoard.parentNode.replaceChild(boardContainer, oldBoard);\n\n  boardContainer.addEventListener('dragover', (event) => {\n    event.preventDefault(); // Required to allow drop\n  });\n\n  boardContainer.addEventListener('drop', (event) => {\n    event.preventDefault();\n\n    // Check if its a cell\n    const cell = event.target.closest('.cell');\n    if (!cell) return;\n\n    const x = parseInt(cell.dataset.x);\n    const y = parseInt(cell.dataset.y);\n    const isVertical = currentAxis === 'vertical';\n\n    try {\n      player.board.placeShip(new _models_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](draggedShipLength), x, y, isVertical);\n\n      // 1. Hide the ship from the dock\n      draggedShipElement.classList.add('hidden');\n\n      // 2. Tell Main.js to redraw the board\n      renderCallback();\n\n      // 3. Check if game can start\n      checkIfAllPlaced();\n    } catch (error) {\n      console.warn('Invalid placement:', error.message);\n    }\n  });\n\n  const checkIfAllPlaced = () => {\n    const remaining = document.querySelectorAll('.draggable-ship:not(.hidden)');\n    if (remaining.length === 0) {\n      document.getElementById('start-button').disabled = false;\n    }\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dragDropController);\n\n\n//# sourceURL=webpack://battleship/./src/modules/dragDropController.js?\n}");

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