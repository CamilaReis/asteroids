export default class InputController {
  constructor() {
    this.pressed = {};
    addEventListener("keydown", evt => (this.pressed[evt.keyCode] = true));
    addEventListener("keyup", evt => (this.pressed[evt.keyCode] = false));
  }

  /** @param {number} keycode */
  isPressing(keycode) {
    return this.pressed[keycode];
  }
}
