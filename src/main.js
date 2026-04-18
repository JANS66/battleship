import './styles.css';
import * as Events from './modules/events.js';

document.addEventListener('DOMContentLoaded', () => {
  Events.setupEventListeners();
});
