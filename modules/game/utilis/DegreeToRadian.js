const DEG_TO_RAD = Math.PI / 180

/**
 * Convert the given angle from degrees, to the equivalent angle in radians.
 *
 * @function Phaser.Math.DegToRad
 * @since 3.0.0
 *
 * @param {integer} degrees - The angle (in degrees) to convert to radians.
 *
 * @return {number} The given angle converted to radians.
 */
export function DegToRad(degrees) {
  return degrees * DEG_TO_RAD
}

export function RadToDeg(radians) {
  var pi = Math.PI
  return radians * (180 / pi)
}

export const RAD0 = DegToRad(0)
export const RAD90 = DegToRad(90)
export const RAD180 = DegToRad(180)
export const RAD270 = DegToRad(270)

export const RAD45 = DegToRad(45)
export const RAD135 = DegToRad(135)
export const RAD225 = DegToRad(225)
export const RAD315 = DegToRad(315)

/**
 *
 * @param {number} radians
 * @param {number} radius
 * @returns {number}
 */
export function getCircleX(radians, radius) {
  return Math.cos(radians) * radius
}
/**
 *
 * @param {number} radians
 * @param {number} radius
 * @returns {number}
 */
export function getCircleY(radians, radius) {
  return (Math.sin(radians) / 2) * radius
}
/**
 *
 * @param {number} radians
 * @param {number} radius
 */
export function getCircleCoordinator(radians, radius) {
  const x = getCircleX(radians, radius)
  const y = getCircleY(radians, radius)
  return {
    x,
    y,
  }
}
