import "../types";
import InputController from "./input-controller";
import Sprite from "./sprite";
import { clamp } from "../shared/utils";
import * as GAME_SETTINGS from "../shared/settings";
import * as KEYCODES from "../shared/keycodes";
import update from "../shared/update";

export default class ClientGame {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {GameState} initialState
   * @param {GameSettings} settings
   */
  constructor(canvas, initialState, settings = GAME_SETTINGS) {
    this.gameState = initialState;
    this.settings = settings;
    this.stopped = false;

    this.input = new InputController();

    this.canvas = canvas;
    this.canvas.width = settings.cameraWidth;
    this.canvas.height = settings.cameraHeight;
    this.ctx = canvas.getContext("2d");

    this.lastRender = 0;
    requestAnimationFrame(this.loop.bind(this));

    this.sprites = {
      ship: new Sprite("/assets/ship.svg")
    };
  }

  /**
   * @param {GameState} state The current game state.
   * @param {number} progress Time ellapsed since last render in milliseconds.
   */
  update(state, progress) {
    const progressInSeconds = progress / 1000;
    const { settings } = this;
    const currentPlayer = state.players.find(
      p => p.id === state.currentPlayerId
    );

    const isPressingUp = this.input.isPressing(KEYCODES.UP);
    const isPressingDown = this.input.isPressing(KEYCODES.DOWN);
    const isPressingRight = this.input.isPressing(KEYCODES.RIGHT);
    const isPressingLeft = this.input.isPressing(KEYCODES.LEFT);
    if (isPressingUp || isPressingDown)
      currentPlayer.acc = isPressingUp ? settings.acc : -settings.acc;
    else currentPlayer.acc = 0;
    if (isPressingRight || isPressingLeft)
      currentPlayer.rotationAcc = isPressingRight
        ? settings.rotationAcc
        : -settings.rotationAcc;
    else currentPlayer.rotationAcc = 0;

    update(state, progress, this.settings);
  }

  /**
   * @param {GameState} state
   */
  draw(state) {
    const { settings } = this;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.sprites.ship.loaded) {
      state.players.forEach(player => {
        const { playerWidth, playerHeight } = settings;
        const playerCenterX = player.x + playerWidth / 2;
        const playerCenterY = player.y + playerHeight / 2;
        this.ctx.translate(playerCenterX, playerCenterY);
        this.ctx.rotate(player.rotation);
        this.ctx.drawImage(
          this.sprites.ship.image,
          -playerWidth / 2,
          -playerHeight / 2,
          playerWidth,
          playerHeight
        );
        this.ctx.rotate(-player.rotation);
        this.ctx.fillStyle = "#fff";
        this.ctx.fillText(String(player.id), 0, -15);
        this.ctx.fillStyle = "#000";
        this.ctx.translate(-playerCenterX, -playerCenterY);
      });
    }
    this.ctx.beginPath();
    state.projectiles.forEach(projectile => {
      const { projectileRadius } = settings;
      this.ctx.fillStyle = "#9c2020";
      this.ctx.moveTo(projectile.x, projectile.y);
      this.ctx.arc(
        projectile.x,
        projectile.y,
        projectileRadius,
        0,
        Math.PI * 2
      );
      this.ctx.fill();
      this.ctx.fillStyle = "#000";
    });
  }

  loop(timestamp) {
    if (!this.stopped) {
      const progress = timestamp - this.lastRender;
      this.update(this.gameState, progress);
      this.draw(this.gameState);
      this.lastRender = timestamp;

      requestAnimationFrame(this.loop.bind(this));
    }
  }

  stop() {
    this.stopped = true;
  }
}
