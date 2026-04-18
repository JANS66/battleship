import * as Controller from './controller.js';

/**
 * Maps element IDs to their respective controller handlers
 */
const EVENT_MAP = {
  'start-button': Controller.handlePlacementFinish,
  'continue-button': Controller.completePassDevice,
  'randomize-button': Controller.handleRandomize,
};

export const setupEventListeners = () => {
  // Handle simple button clicks via mapping
  Object.entries(EVENT_MAP).forEach(([id, handler]) => {
    const element = document.getElementById(id);
    if (element) element.addEventListener('click', handler);
  });

  // Handle mode selection separately for arguments
  const aiButton = document.getElementById('vs-computer-button');
  const pvpButton = document.getElementById('vs-player-button');

  if (aiButton)
    aiButton.addEventListener('click', () => Controller.selectMode('ai'));
  if (pvpButton)
    pvpButton.addEventListener('click', () => Controller.selectMode('pvp'));
};
