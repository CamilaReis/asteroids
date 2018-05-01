export default class Sprite {
  /** @param {string} path The path of the sprite. */
  constructor(path) {
    this.loaded = false;
    this.image = new Image();
    this.image.src = path;
    this.image.onload = () => (this.loaded = true);
  }
}
