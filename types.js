/** Type definitions
 * @typedef {Object} Player
 * @property {number} id
 * @property {number} x
 * @property {number} y
 * @property {number} xSpeed
 * @property {number} ySpeed
 * @property {number} acc The player acceleration.
 * @property {number} rotation Player rotation in radians.
 * @property {number} rotationSpeed
 * @property {number} rotationAcc
 * @property {boolean} [dead=false] Whether the player can be destroyed.
 *
 * @typedef {Object} Projectile
 * @property {number} id
 * @property {number} x
 * @property {number} y
 * @property {number} xSpeed
 * @property {number} ySpeed
 * @property {number} playerId The id of the player that created the projectile.
 * @property {boolean} [dead=false] Whether the projectile can be destroyed.
 *
 * @typedef {Object} GameState
 * @property {number} currentPlayerId
 * @property {Player[]} players
 * @property {Projectile[]} projectiles
 *
 * @typedef {Object} GameSettings
 * @property {number} cameraWidth
 * @property {number} cameraHeight
 * @property {number} worldWidth
 * @property {number} worldHeight
 * @property {number} playerWidth
 * @property {number} playerHeight
 * @property {number} friction
 * @property {number} maxSpeed
 * @property {number} acc The acceleration the player imparts to the ship by pressing KEYCODES.UP or KEYCODES.DOWN.
 * @property {number} rotationAcc The acceleration the player imparts to the ship's rotation by pressing KEYCODES.RIGHT or KEYCODES.LEFt.
 * @property {number} maxRotationSpeed
 * @property {number} rotationFriction
 * @property {number} projectileSpeed
 * @property {number} projectileRadius
 *
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 *
 * @typedef {Object} Rectangle
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 *
 * @typedef {Object} GameEvent
 * @property {string} type
 * @property {*} payload
 */
