"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2018 Google Inc. (https://github.com/google/vector_math.dart)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EPSILON = 0.000001;
var degree = Math.PI / 180;
/**
 * 获取弧度对应的角度
 * @param {Number} radian 弧度
 * @return {Number} 角度
 */
function toDegree(radian) {
    return radian / degree;
}
exports.toDegree = toDegree;
/**
 * 广义取模运算
 * @param {Number} n 被取模的值
 * @param {Number} m 模
 * @return {Number} 返回n 被 m 取模的结果
 */
function mod(n, m) {
    return ((n % m) + m) % m;
}
exports.mod = mod;
/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */
function toRadian(a) {
    return a * degree;
}
exports.toRadian = toRadian;
/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */
function equals(a, b) {
    return Math.abs(a - b) <= exports.EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}
exports.equals = equals;
/**
 * @private
 */
function clamp(value, min, max) {
    return min < max
        ? (value < min ? min : value > max ? max : value)
        : (value < max ? max : value > min ? min : value);
}
exports.clamp = clamp;
//# sourceMappingURL=common.js.map