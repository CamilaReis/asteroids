require("../types");

/** Math */
/**
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
module.exports.clamp = (value, min, max) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

/**
 * Check if the point is inside the rectangle.
 * @param {Point} point
 * @param {Rectangle} rect
 * @returns {boolean}
 */
module.exports.pointInRect = (point, rect) => {
  const { x, y } = point;
  const topLeft = { x: rect.x, y: rect.y };
  const bottomRight = { x: rect.x + rect.width, y: rect.y + rect.width };
  return (
    point.x > topLeft.x &&
    point.y > topLeft.y &&
    point.x < bottomRight.x &&
    point.y < bottomRight.y
  );
};

/** Fetch */
module.exports.checkStatus = async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    //@ts-ignore
    error.response = await response.json();
    throw error;
  }
};

module.exports.parseJSON = function parseJSON(response) {
  return response.json();
};
