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
var common_1 = require("./common");
var matrix4_1 = require("./matrix4");
var quaternion_1 = require("./quaternion");
var Matrix3 = /** @class */ (function () {
    function Matrix3() {
        this.values = new Float32Array(9);
        if (arguments.length === 1) {
            if (arguments[0]) {
                this.init(arguments[0]);
            }
        }
        else if (arguments.length === 9) {
            this.values[0] = arguments[0];
            this.values[1] = arguments[1];
            this.values[2] = arguments[2];
            this.values[3] = arguments[3];
            this.values[4] = arguments[4];
            this.values[5] = arguments[5];
            this.values[6] = arguments[6];
            this.values[7] = arguments[7];
            this.values[8] = arguments[8];
        }
        else {
            this.values[0] = this.values[1] = this.values[2] = 0;
            this.values[3] = this.values[4] = this.values[5] = 0;
            this.values[6] = this.values[7] = this.values[8] = 0;
        }
    }
    Matrix3.prototype.at = function (index) {
        return this.values[index];
    };
    /**
     * Create a new {@class Matrix3} with the given values
     * @param {number[]} values
     * @returns {Matrix3} A new {@class Matrix3}
     */
    Matrix3.prototype.init = function (values) {
        for (var i = 0; i < 9; i++) {
            this.values[i] = values[i];
        }
        return this;
    };
    /**
     * Reset the {@class Matrix3}
     */
    Matrix3.prototype.reset = function () {
        for (var i = 0; i < 9; i++) {
            this.values[i] = 0;
        }
    };
    Matrix3.prototype.copy = function (dest) {
        if (dest === void 0) { dest = null; }
        if (!dest) {
            return new Matrix3(this.values[0], this.values[1], this.values[2], this.values[3], this.values[4], this.values[5], this.values[6], this.values[7], this.values[8]);
        }
        for (var i = 0; i < 9; i++) {
            dest.values[i] = this.values[i];
        }
        return dest;
    };
    Matrix3.prototype.all = function () {
        var data = [];
        for (var i = 0; i < 9; i++) {
            data[i] = this.values[i];
        }
        return data;
    };
    Matrix3.prototype.row = function (index) {
        return [
            this.values[index * 3],
            this.values[index * 3 + 1],
            this.values[index * 3 + 2],
        ];
    };
    Matrix3.prototype.col = function (index) {
        return [
            this.values[index],
            this.values[index + 3],
            this.values[index + 6],
        ];
    };
    Matrix3.prototype.index = function (row, col) {
        return row * 3 + col;
    };
    Matrix3.prototype.entry = function (row, col) {
        // console.assert((row >= 0) && (row < Matrix3.dimension));
        // console.assert((col >= 0) && (col < Matrix3.dimension));
        return this.values[this.index(row, col)];
    };
    Matrix3.prototype.setEntry = function (row, col, v) {
        this.values[this.index(row, col)] = v;
        return this;
    };
    Matrix3.prototype.setValues = function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
        this.values[0] = arg0;
        this.values[1] = arg1;
        this.values[2] = arg2;
        this.values[3] = arg3;
        this.values[4] = arg4;
        this.values[5] = arg5;
        this.values[6] = arg6;
        this.values[7] = arg7;
        this.values[8] = arg8;
        return this;
    };
    /**
     * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
     *
     * @param {Matrix3} b
     * @returns {boolean}
     */
    Matrix3.prototype.exactEquals = function (b) {
        return (this.values[0] === b.at(0) &&
            this.values[1] === b.at(1) &&
            this.values[2] === b.at(2) &&
            this.values[3] === b.at(3) &&
            this.values[4] === b.at(4) &&
            this.values[5] === b.at(5) &&
            this.values[6] === b.at(6) &&
            this.values[7] === b.at(7) &&
            this.values[8] === b.at(8));
    };
    /**
     *  Returns whether or not the matrices have approximately the same elements in the same position.
     *
     * @param {Matrix3} matrix
     * @param {number} threshold
     * @returns {boolean}
     */
    Matrix3.prototype.equals = function (matrix, threshold) {
        if (threshold === void 0) { threshold = EPSILON; }
        for (var i = 0; i < 9; i++) {
            if (!common_1.equals(this.values[i], matrix.at(i))) {
                return false;
            }
        }
        return true;
    };
    /**
     * Calculates the determinant of {@class Matrix3}
     *
     * @returns {number}
     */
    Matrix3.prototype.determinant = function () {
        var a00 = this.values[0], a01 = this.values[1], a02 = this.values[2];
        var a10 = this.values[3], a11 = this.values[4], a12 = this.values[5];
        var a20 = this.values[6], a21 = this.values[7], a22 = this.values[8];
        return (a00 * (a22 * a11 - a12 * a21) +
            a01 * (-a22 * a10 + a12 * a20) +
            a02 * (a21 * a10 - a11 * a20));
    };
    Matrix3.prototype.setZero = function () {
        this.values[0] = 0;
        this.values[1] = 0;
        this.values[2] = 0;
        this.values[3] = 0;
        this.values[4] = 0;
        this.values[5] = 0;
        this.values[6] = 0;
        this.values[7] = 0;
        this.values[8] = 0;
    };
    /**
     * Set a mat3 to the setIdentity matrix
     *
     * @returns {Matrix3}
     */
    Matrix3.prototype.setIdentity = function () {
        this.values[0] = 1;
        this.values[1] = 0;
        this.values[2] = 0;
        this.values[3] = 0;
        this.values[4] = 1;
        this.values[5] = 0;
        this.values[6] = 0;
        this.values[7] = 0;
        this.values[8] = 1;
        return this;
    };
    /**
     * Transpose the {@class Matrix3}
     *
     * @returns {Matrix3}
     */
    Matrix3.prototype.transpose = function () {
        var temp01 = this.values[1], temp02 = this.values[2], temp12 = this.values[5];
        this.values[1] = this.values[3];
        this.values[2] = this.values[6];
        this.values[3] = temp01;
        this.values[5] = this.values[7];
        this.values[6] = temp02;
        this.values[7] = temp12;
        return this;
    };
    Matrix3.prototype.transposed = function () {
        return this.clone().transpose();
    };
    /**
     * Inverts a {@class Matrix3}
     * @returns {Matrix3}
     */
    Matrix3.prototype.inverse = function () {
        var a00 = this.values[0], a01 = this.values[1], a02 = this.values[2];
        var a10 = this.values[3], a11 = this.values[4], a12 = this.values[5];
        var a20 = this.values[6], a21 = this.values[7], a22 = this.values[8];
        var det01 = a22 * a11 - a12 * a21, det11 = -a22 * a10 + a12 * a20, det21 = a21 * a10 - a11 * a20;
        var det = a00 * det01 + a01 * det11 + a02 * det21;
        if (!det) {
            return null;
        }
        det = 1.0 / det;
        this.values[0] = det01 * det;
        this.values[1] = (-a22 * a01 + a02 * a21) * det;
        this.values[2] = (a12 * a01 - a02 * a11) * det;
        this.values[3] = det11 * det;
        this.values[4] = (a22 * a00 - a02 * a20) * det;
        this.values[5] = (-a12 * a00 + a02 * a10) * det;
        this.values[6] = det21 * det;
        this.values[7] = (-a21 * a00 + a01 * a20) * det;
        this.values[8] = (a11 * a00 - a01 * a10) * det;
        return this;
    };
    Matrix3.prototype.setRotationX = function (radians) {
        var c = Math.cos(radians);
        var s = Math.sin(radians);
        this.values[0] = 1;
        this.values[1] = 0;
        this.values[2] = 0;
        this.values[3] = 0;
        this.values[4] = c;
        this.values[5] = -s;
        this.values[6] = 0;
        this.values[7] = s;
        this.values[8] = c;
    };
    Matrix3.prototype.setRotationY = function (radians) {
        var c = Math.cos(radians);
        var s = Math.sin(radians);
        this.values[0] = c;
        this.values[1] = 0;
        this.values[2] = -s;
        this.values[3] = 0;
        this.values[4] = 1;
        this.values[5] = 0;
        this.values[6] = s;
        this.values[7] = 0;
        this.values[8] = c;
    };
    Matrix3.prototype.setRotationZ = function (radians) {
        var c = Math.cos(radians);
        var s = Math.sin(radians);
        this.values[0] = c;
        this.values[1] = -s;
        this.values[2] = 0;
        this.values[3] = s;
        this.values[4] = c;
        this.values[5] = 0;
        this.values[6] = 0;
        this.values[7] = 0;
        this.values[8] = 1;
    };
    /**
     * Calculates the adjugate of {@class Matrix3}
     *
     * @returns {Matrix3}
     */
    Matrix3.prototype.adjoint = function () {
        var a00 = this.values[0], a01 = this.values[1], a02 = this.values[2];
        var a10 = this.values[3], a11 = this.values[4], a12 = this.values[5];
        var a20 = this.values[6], a21 = this.values[7], a22 = this.values[8];
        this.values[0] = a11 * a22 - a12 * a21;
        this.values[1] = a02 * a21 - a01 * a22;
        this.values[2] = a01 * a12 - a02 * a11;
        this.values[3] = a12 * a20 - a10 * a22;
        this.values[4] = a00 * a22 - a02 * a20;
        this.values[5] = a02 * a10 - a00 * a12;
        this.values[6] = a10 * a21 - a11 * a20;
        this.values[7] = a01 * a20 - a00 * a21;
        this.values[8] = a00 * a11 - a01 * a10;
        return this;
    };
    Matrix3.prototype.rotateVector3 = function (v) {
        v.setValues(v.x * this.values[0] + v.y * this.values[1] + v.z * this.values[2], v.x * this.values[3] + v.y * this.values[4] + v.z * this.values[5], v.x * this.values[6] + v.y * this.values[7] + v.z * this.values[8]);
        return v;
    };
    Matrix3.prototype.rotateVector2 = function (v) {
        v.setValues(v.x * this.values[0] + v.y * this.values[1], v.x * this.values[3] + v.y * this.values[4]);
        return v;
    };
    Matrix3.prototype.absoluteRotate2 = function (v) {
        v.setValues(v.x * Math.abs(this.values[0]) + v.y * Math.abs(this.values[1]), v.x * Math.abs(this.values[3]) + v.y * Math.abs(this.values[4]));
        return v;
    };
    Matrix3.prototype.transformVector2 = function (v) {
        var _x = v.x * this.values[0] + v.y * this.values[1] + this.values[2];
        var _y = v.x * this.values[3] + v.y * this.values[4] + this.values[5];
        v.x = _x;
        v.y = _y;
        return v;
    };
    Matrix3.prototype.transformVector3 = function (v) {
        v.setValues(v.x + this.values[0] + v.y * this.values[1] + this.values[2], v.x + this.values[3] + v.y * this.values[4] + this.values[5], v.x + this.values[6] + v.y * this.values[7] + this.values[8]);
        return v;
    };
    Matrix3.prototype.transformed = function (vector, out) {
        if (!out) {
            out = vector.clone();
        }
        else {
            vector.copy(out);
        }
        return this.transformVector3(out);
    };
    Matrix3.prototype.scale = function (scale) {
        this.values[0] = this.values[0] * scale;
        this.values[1] = this.values[1] * scale;
        this.values[2] = this.values[2] * scale;
        this.values[3] = this.values[3] * scale;
        this.values[4] = this.values[4] * scale;
        this.values[5] = this.values[5] * scale;
        this.values[6] = this.values[6] * scale;
        this.values[7] = this.values[7] * scale;
        this.values[8] = this.values[8] * scale;
        return this;
    };
    Matrix3.prototype.scaled = function (scale) {
        return this.clone().scale(scale);
    };
    Matrix3.prototype.add = function (m) {
        this.values[0] = this.values[0] + m.at(0);
        this.values[1] = this.values[1] + m.at(1);
        this.values[2] = this.values[2] + m.at(2);
        this.values[3] = this.values[3] + m.at(3);
        this.values[4] = this.values[4] + m.at(4);
        this.values[5] = this.values[5] + m.at(5);
        this.values[6] = this.values[6] + m.at(6);
        this.values[7] = this.values[7] + m.at(7);
        this.values[8] = this.values[8] + m.at(8);
        return this;
    };
    Matrix3.prototype.sub = function (m) {
        this.values[0] = this.values[0] - m.at(0);
        this.values[1] = this.values[1] - m.at(1);
        this.values[2] = this.values[2] - m.at(2);
        this.values[3] = this.values[3] - m.at(3);
        this.values[4] = this.values[4] - m.at(4);
        this.values[5] = this.values[5] - m.at(5);
        this.values[6] = this.values[6] - m.at(6);
        this.values[7] = this.values[7] - m.at(7);
        this.values[8] = this.values[8] - m.at(8);
        return this;
    };
    Matrix3.prototype.multiply = function (matrix) {
        var a00 = this.values[0], a01 = this.values[1], a02 = this.values[2];
        var a10 = this.values[3], a11 = this.values[4], a12 = this.values[5];
        var a20 = this.values[6], a21 = this.values[7], a22 = this.values[8];
        var b00 = matrix.at(0), b01 = matrix.at(1), b02 = matrix.at(2);
        var b10 = matrix.at(3), b11 = matrix.at(4), b12 = matrix.at(5);
        var b20 = matrix.at(6), b21 = matrix.at(7), b22 = matrix.at(8);
        this.values[0] = b00 * a00 + b01 * a10 + b02 * a20;
        this.values[1] = b00 * a01 + b01 * a11 + b02 * a21;
        this.values[2] = b00 * a02 + b01 * a12 + b02 * a22;
        this.values[3] = b10 * a00 + b11 * a10 + b12 * a20;
        this.values[4] = b10 * a01 + b11 * a11 + b12 * a21;
        this.values[5] = b10 * a02 + b11 * a12 + b12 * a22;
        this.values[6] = b20 * a00 + b21 * a10 + b22 * a20;
        this.values[7] = b20 * a01 + b21 * a11 + b22 * a21;
        this.values[8] = b20 * a02 + b21 * a12 + b22 * a22;
        return this;
    };
    Matrix3.prototype.multiplied = function (m) {
        return this.clone().multiply(m);
    };
    Matrix3.prototype.toMatrix4 = function (result) {
        if (!result) {
            result = new matrix4_1.Matrix4();
        }
        result.init([
            this.values[0],
            this.values[1],
            this.values[2],
            0,
            this.values[3],
            this.values[4],
            this.values[5],
            0,
            this.values[6],
            this.values[7],
            this.values[8],
            0,
            0,
            0,
            0,
            1,
        ]);
        return result;
    };
    Matrix3.prototype.toQuaternion = function (result) {
        if (!result) {
            result = new quaternion_1.Quaternion();
        }
        var m00 = this.values[0], m01 = this.values[1], m02 = this.values[2];
        var m10 = this.values[3], m11 = this.values[4], m12 = this.values[5];
        var m20 = this.values[6], m21 = this.values[7], m22 = this.values[8];
        var fourXSquaredMinus1 = m00 - m11 - m22;
        var fourYSquaredMinus1 = m11 - m00 - m22;
        var fourZSquaredMinus1 = m22 - m00 - m11;
        var fourWSquaredMinus1 = m00 + m11 + m22;
        var biggestIndex = 0;
        var fourBiggestSquaredMinus1 = fourWSquaredMinus1;
        if (fourXSquaredMinus1 > fourBiggestSquaredMinus1) {
            fourBiggestSquaredMinus1 = fourXSquaredMinus1;
            biggestIndex = 1;
        }
        if (fourYSquaredMinus1 > fourBiggestSquaredMinus1) {
            fourBiggestSquaredMinus1 = fourYSquaredMinus1;
            biggestIndex = 2;
        }
        if (fourZSquaredMinus1 > fourBiggestSquaredMinus1) {
            fourBiggestSquaredMinus1 = fourZSquaredMinus1;
            biggestIndex = 3;
        }
        var biggestVal = Math.sqrt(fourBiggestSquaredMinus1 + 1) * 0.5;
        var mult = 0.25 / biggestVal;
        switch (biggestIndex) {
            case 0:
                result.w = biggestVal;
                result.x = (m12 - m21) * mult;
                result.y = (m20 - m02) * mult;
                result.z = (m01 - m10) * mult;
                break;
            case 1:
                result.w = (m12 - m21) * mult;
                result.x = biggestVal;
                result.y = (m01 + m10) * mult;
                result.z = (m20 + m02) * mult;
                break;
            case 2:
                result.w = (m20 - m02) * mult;
                result.x = (m01 + m10) * mult;
                result.y = biggestVal;
                result.z = (m12 + m21) * mult;
                break;
            case 3:
                result.w = (m01 - m10) * mult;
                result.x = (m20 + m02) * mult;
                result.y = (m12 + m21) * mult;
                result.z = biggestVal;
                break;
        }
        return result;
    };
    /**
     * Translate a {@class Matrix3} by the given vector
     *
     * @param {Vector2} v vector to translate by
     * @returns {this}
     */
    Matrix3.prototype.translate = function (v) {
        var x = v[0];
        var y = v[1];
        var a00 = this.values[0];
        var a01 = this.values[1];
        var a02 = this.values[2];
        var a10 = this.values[3];
        var a11 = this.values[4];
        var a12 = this.values[5];
        var a20 = this.values[6];
        var a21 = this.values[7];
        var a22 = this.values[8];
        this.values[0] = a00;
        this.values[1] = a01;
        this.values[2] = a02;
        this.values[3] = a10;
        this.values[4] = a11;
        this.values[5] = a12;
        this.values[6] = x * a00 + y * a10 + a20;
        this.values[7] = x * a01 + y * a11 + a21;
        this.values[8] = x * a02 + y * a12 + a22;
        return this;
    };
    // /**
    //  * Rotates a {@class Matrix3} by the given angle
    //  *
    //  * @param {number} radians the angle to rotate the matrix by
    //  * @returns {this}
    //  */
    // public rotate(radians: number) {
    //   const a00 = this.values[0];
    //   const a01 = this.values[1];
    //   const a02 = this.values[2];
    //   const a10 = this.values[3];
    //   const a11 = this.values[4];
    //   const a12 = this.values[5];
    //   const a20 = this.values[6];
    //   const a21 = this.values[7];
    //   const a22 = this.values[8];
    //   const s   = Math.sin(radians);
    //   const c   = Math.cos(radians);
    //
    //   this.values[0] = c * a00 + s * a10;
    //   this.values[1] = c * a01 + s * a11;
    //   this.values[2] = c * a02 + s * a12;
    //
    //   this.values[3] = c * a10 - s * a00;
    //   this.values[4] = c * a11 - s * a01;
    //   this.values[5] = c * a12 - s * a02;
    //
    //   this.values[6] = a20;
    //   this.values[7] = a21;
    //   this.values[8] = a22;
    //   return this;
    // }
    /**
     * Clone
     *
     * @returns {Matrix3} A new {@class Matrix3}
     */
    Matrix3.prototype.clone = function () {
        return this.copy();
    };
    Matrix3.zero = function () {
        return new Matrix3(0, 0, 0, 0, 0, 0, 0, 0, 0);
    };
    Matrix3.product = function (m1, m2, result) {
        if (result === void 0) { result = null; }
        if (!result) {
            result = new Matrix3();
        }
        var a00 = m1.at(0), a01 = m1.at(1), a02 = m1.at(2);
        var a10 = m1.at(3), a11 = m1.at(4), a12 = m1.at(5);
        var a20 = m1.at(6), a21 = m1.at(7), a22 = m1.at(8);
        var b00 = m2.at(0), b01 = m2.at(1), b02 = m2.at(2);
        var b10 = m2.at(3), b11 = m2.at(4), b12 = m2.at(5);
        var b20 = m2.at(6), b21 = m2.at(7), b22 = m2.at(8);
        result.init([
            b00 * a00 + b01 * a10 + b02 * a20,
            b00 * a01 + b01 * a11 + b02 * a21,
            b00 * a02 + b01 * a12 + b02 * a22,
            b10 * a00 + b11 * a10 + b12 * a20,
            b10 * a01 + b11 * a11 + b12 * a21,
            b10 * a02 + b11 * a12 + b12 * a22,
            b20 * a00 + b21 * a10 + b22 * a20,
            b20 * a01 + b21 * a11 + b22 * a21,
            b20 * a02 + b21 * a12 + b22 * a22,
        ]);
        return result;
    };
    Matrix3.fromMatrix4 = function (a) {
        var out = new Matrix3();
        out.values[0] = a.at(0);
        out.values[1] = a.at(1);
        out.values[2] = a.at(2);
        out.values[3] = a.at(4);
        out.values[4] = a.at(5);
        out.values[5] = a.at(6);
        out.values[6] = a.at(8);
        out.values[7] = a.at(9);
        out.values[8] = a.at(10);
        return out;
    };
    Matrix3.absolute = function (m, out) {
        if (!out) {
            out = new Matrix3();
        }
        out.values[0] = Math.abs(m.at(0));
        out.values[1] = Math.abs(m.at(1));
        out.values[2] = Math.abs(m.at(2));
        out.values[3] = Math.abs(m.at(3));
        out.values[4] = Math.abs(m.at(4));
        out.values[5] = Math.abs(m.at(5));
        out.values[6] = Math.abs(m.at(6));
        out.values[7] = Math.abs(m.at(7));
        out.values[8] = Math.abs(m.at(8));
        return out;
    };
    Matrix3.dimension = 3;
    return Matrix3;
}());
exports.Matrix3 = Matrix3;
//# sourceMappingURL=matrix3.js.map