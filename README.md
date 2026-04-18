# Battleship JS

A tactical naval combat game built with Vanilla JavaScript using ES6 Modules and a Test-Driven Development (TDD) approach. This project demonstrates a clean implementation of the Model-View-Controller (MVC) pattern and robust state management.

## Features

- **Game Modes:**
  - **VS Computer:** Face off against a "Hunt-and-Target" AI. The computer searches the grid randomly until it scores a hit, then switches to a targeting queue to systematically attack adjacent cells.
  - **Local 2 Player:** A pass-and-play mode featuring a "Pass Device" privacy screen to ensure fleet configurations remain secret between turns.
- **Fleet Placement:** Intuitive drag-and-drop interface with axis rotation (Horizontal/Vertical) and a smart randomizer for quick setup.
- **Responsive Design:** A modern, cyberpunk-themed UI built with CSS Grid and custom variables.
- **Robust Logic:** Developed using Object-Oriented Programming (OOP) principles, ensuring total decoupling between game mechanics and UI rendering.

## Technical Stack

| Category     | Technology                                           |
| ------------ | ---------------------------------------------------- |
| Language     | JavaScript (ES6+)                                    |
| Build Tool   | Webpack (Production-ready bundling)                  |
| Testing      | Jest (Comprehensive unit testing for game mechanics) |
| Architecture | MVC (Model-View-Controller)                          |
| Styling      | CSS3 (Flexbox, Grid, Custom Variables)               |

## Project Architecture

- **Models:** Pure logic classes (`Ship`, `GameBoard`) that handle the math of hits, misses, and coordinates independently of the browser.
- **State Management:** A centralized `state.js` module acting as the single source of truth for game status, turn-tracking, and player instances.
- **Controllers:** Decoupled modules that manage event listeners and the "glue" logic between the logic models and the DOM.
- **DOM Layer:** A dedicated controller for rendering the grid and updating UI elements, allowing for easy UI pivoting or skinning.

## Setup Instructions

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Start Development Server:**

   ```bash
   npm start
   ```

3. **Run Unit Tests:**

   ```bash
   npm test
   ```

4. **Build for Production:**
   ```bash
   npm run build
   ```
