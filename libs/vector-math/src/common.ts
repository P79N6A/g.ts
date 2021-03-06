/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2018 Google Inc. (https://github.com/google/vector_math.dart)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

export const EPSILON = 0.000001;

const degree = Math.PI / 180;

/**
 * 获取弧度对应的角度
 * @param {Number} radian 弧度
 * @return {Number} 角度
 */
export function toDegree(radian) {
  return radian / degree;
}

/**
 * 广义取模运算
 * @param {Number} n 被取模的值
 * @param {Number} m 模
 * @return {Number} 返回n 被 m 取模的结果
 */
export function mod(n, m) {
  return ((n % m) + m) % m;
}

/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */
export function toRadian(a: number) {
  return a * degree;
}

/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */
export function equals(a: number, b: number) {
  return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}

/**
 * @private
 */
export function clamp(value, min, max) {
  return min < max
    ? (value < min ? min : value > max ? max : value)
    : (value < max ? max : value > min ? min : value);
}
