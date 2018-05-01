require("../types");
const { clamp, pointInRect } = require("./utils");

/**
 * @param {GameState} state The current game state.
 * @param {number} progress Time ellapsed since last render in milliseconds.
 * @param {GameSettings} settings Game Settings
 */

module.exports = (state, progress, settings) => {
  const progressInSeconds = progress / 1000;

  state.players.forEach(player => {
    const { friction, maxSpeed, rotationFriction, maxRotationSpeed } = settings;
    player.x += player.xSpeed * progressInSeconds;
    player.y += player.ySpeed * progressInSeconds;

    const xAcc = Math.cos(player.rotation) * player.acc * progressInSeconds;
    const yAcc = Math.sin(player.rotation) * player.acc * progressInSeconds;
    player.xSpeed = clamp(player.xSpeed + xAcc, -maxSpeed, maxSpeed);
    player.ySpeed = clamp(player.ySpeed + yAcc, -maxSpeed, maxSpeed);

    if (player.xSpeed !== 0)
      player.xSpeed += player.xSpeed > 0 ? -friction : friction;
    if (player.ySpeed !== 0)
      player.ySpeed += player.ySpeed > 0 ? -friction : friction;

    player.rotation += player.rotationSpeed * progressInSeconds;

    if (player.rotationSpeed !== 0)
      player.rotationSpeed +=
        (player.rotationSpeed > 0 ? -rotationFriction : rotationFriction) *
        progressInSeconds;
    player.rotationSpeed = clamp(
      player.rotationSpeed + player.rotationAcc * progressInSeconds,
      -maxRotationSpeed,
      maxRotationSpeed
    );
  });

  state.projectiles.filter(p => !p.dead).forEach(projectile => {
    const { worldWidth, worldHeight } = settings;
    projectile.x += projectile.xSpeed * progressInSeconds;
    projectile.y += projectile.ySpeed * progressInSeconds;
    projectile.dead = !pointInRect(
      { x: projectile.x, y: projectile.y },
      { x: 0, y: 0, width: worldWidth, height: worldHeight }
    );
    state.players.filter(p => !p.dead).forEach(player => {
      const { playerWidth, playerHeight } = settings;
      player.dead =
        pointInRect(
          {
            x: projectile.x,
            y: projectile.y
          },
          {
            x: player.x,
            y: player.y,
            width: playerWidth,
            height: playerHeight
          }
        ) && player.id !== projectile.playerId;
    });
  });
};
