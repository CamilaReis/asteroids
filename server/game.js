const update = require("../shared/update");
const raf = require("raf");
const GAME_SETTINGS = require("../shared/settings");

module.exports = class ServerGame {
  /**
   * @param {GameState} gameState
   * @param {GameSettings} settings
   */
  constructor(gameState, settings = GAME_SETTINGS) {
    this.gameState = gameState;
    this.settings = settings;
    this.lastUpdate = 0;
    this.listeners = {};
    raf(this.loop.bind(this));
  }

  loop(timestamp) {
    const progress = timestamp - this.lastUpdate;
    update(this.gameState, progress, this.settings);
    // Clear dead players and projectiles
    const deadPlayers = this.gameState.players.filter(p => p.dead);
    const deadProjectiles = this.gameState.projectiles.filter(p => p.dead);

    deadPlayers
      .map(p => ({ type: "REMOVE_PLAYER", payload: p }))
      .forEach(e => this.dispatchEvent(e.type, e));
    deadProjectiles
      .map(p => ({ type: "REMOVE_PROJECTILE", payload: p }))
      .forEach(e => this.dispatchEvent(e.type, e));
    this.gameState.players = this.gameState.players.filter(p => !p.dead);
    this.gameState.projectiles = this.gameState.projectiles.filter(
      p => !p.dead
    );
    this.lastUpdate = timestamp;
    raf(this.loop.bind(this));
  }

  /**
   * @param {string} type
   * @param {function(GameEvent)} handler
   */
  addEventListener(type, handler) {
    if (!this.listeners[type]) this.listeners[type] = [];
    this.listeners[type].push(handler);
  }

  /**
   * @param {string} type
   * @param {GameEvent} event
   */
  dispatchEvent(type, event) {
    if (this.listeners[type])
      this.listeners[type].forEach(listener => listener(event));
  }
};
