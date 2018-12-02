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
/**
 * use row-major, because such matrix can represent as
 * ```
 *  [[1, 0],
 *   [0, 0]]
 * ```
 */
var Matrix2 = /** @class */ (function () {
    function Matrix2() {
        this.values = new Float32Array(4);
        if (arguments.length === 1) {
            if (arguments[0]) {
                this.init(arguments[0]);
            }
        }
        else if (arguments.length === 4) {
            this.values[0] = arguments[0];
            this.values[1] = arguments[1];
            this.values[2] = arguments[2];
            this.values[3] = arguments[3];
        }
        else {
            this.values[0] = this.values[1] = this.values[2] = this.values[3] = 0;
        }
    }
    Matrix2.prototype.at = function (index) {
        return this.values[index];
    };
    Matrix2.prototype.init = function (values) {
        for (var i = 0; i < 4; i++) {
            this.values[i] = values[i];
        }
        return this;
    };
    Matrix2.prototype.reset = function () {
        for (var i = 0; i < 4; i++) {
            this.values[i] = 0;
        }
    };
    Matrix2.prototype.copy = function (dest) {
        if (!dest) {
            return new Matrix2(this.values[0], this.values[1], this.values[2], this.values[3]);
        }
        for (var i = 0; i < 4; i++) {
            dest.values[i] = this.values[i];
        }
        return dest;
    };
    Matrix2.prototype.all = function () {
        var data = [];
        for (var i = 0; i < 4; i++) {
            data[i] = this.values[i];
        }
        return data;
    };
    Matrix2.prototype.copyInverse = function (arg) {
        var det = arg.determinant();
        if (det == 0) {
            this.setFrom(arg);
            return 0;
        }
        var invDet = 1 / det;
        var m2 = arg.values;
        this.values[0] = m2[3] * invDet;
        this.values[1] = -m2[1] * invDet;
        this.values[2] = -m2[2] * invDet;
        this.values[3] = m2[0] * invDet;
        return det;
    };
    Matrix2.prototype.setFrom = function (arg) {
        this.values[3] = arg.values[3];
        this.values[2] = arg.values[2];
        this.values[1] = arg.values[1];
        this.values[0] = arg.values[0];
    };
    Matrix2.prototype.row = function (index) {
        return [
            this.values[index * 2],
            this.values[index * 2 + 1],
        ];
    };
    Matrix2.prototype.col = function (index) {
        return [
            this.values[index],
            this.values[index + 2],
        ];
    };
    Matrix2.prototype.index = function (row, col) {
        return (row * 2) + col;
    };
    Matrix2.prototype.entry = function (row, col) {
        // console.assert((row >= 0) && (row < Matrix3.dimension));
        // console.assert((col >= 0) && (col < Matrix3.dimension));
        return this.values[this.index(row, col)];
    };
    Matrix2.prototype.setEntry = function (row, col, v) {
        this.values[this.index(row, col)] = v;
        return this;
    };
    Matrix2.prototype.setValues = function (arg0, arg1, arg2, arg3) {
        this.values[0] = arg0;
        this.values[1] = arg1;
        this.values[2] = arg2;
        this.values[3] = arg3;
        return this;
    };
    Matrix2.prototype.equals = function (matrix, threshold) {
        if (threshold === void 0) { threshold = EPSILON; }
        for (var i = 0; i < 4; i++) {
            if (Math.abs(this.values[i] - matrix.at(i)) > threshold) {
                return false;
            }
        }
        return true;
    };
    Matrix2.prototype.determinant = function () {
        return this.values[0] * this.values[3] - this.values[2] * this.values[1];
    };
    Matrix2.prototype.dotRow = function (i, v) {
        return this.values[2 * i] * v.x + this.values[(2 * i) + 1] * v.y;
    };
    Matrix2.prototype.dotColumn = function (i, v) {
        return this.values[i] * v.x + this.values[2 + i] * v.y;
    };
    Matrix2.prototype.setZero = function () {
        this.values[0] = 0;
        this.values[1] = 0;
        this.values[2] = 0;
        this.values[3] = 0;
    };
    /**
     * 单位矩阵
     *
     * @returns {Matrix2}
     */
    Matrix2.prototype.setIdentity = function () {
        this.values[0] = 1;
        this.values[1] = 0;
        this.values[2] = 0;
        this.values[3] = 1;
        return this;
    };
    /**
     * 转置当前矩阵
     *
     * @returns {Matrix2}
     */
    Matrix2.prototype.transpose = function () {
        var temp = this.values[1];
        this.values[1] = this.values[2];
        this.values[2] = temp;
        return this;
    };
    /**
     * 返回一个新的转置矩阵
     *
     * @returns {Matrix2}
     */
    Matrix2.prototype.transposed = function () {
        return this.clone().transpose();
    };
    Matrix2.prototype.infinityNorm = function () {
        var norm = 0;
        {
            var row_norm = 0;
            row_norm += Math.abs(this.values[0]);
            row_norm += Math.abs(this.values[2]);
            norm = row_norm > norm ? row_norm : norm;
        }
        {
            var row_norm = 0;
            row_norm += Math.abs(this.values[1]);
            row_norm += Math.abs(this.values[3]);
            norm = row_norm > norm ? row_norm : norm;
        }
        return norm;
    };
    Matrix2.prototype.relativeError = function (correct) {
        var diff = correct.clone().sub(this);
        var correct_norm = correct.infinityNorm();
        var diff_norm = diff.infinityNorm();
        return diff_norm / correct_norm;
    };
    Matrix2.prototype.absoluteError = function (correct) {
        var this_norm = this.infinityNorm();
        var correct_norm = correct.infinityNorm();
        var diff_norm = Math.abs(this_norm - correct_norm);
        return diff_norm;
    };
    /**
     * 计算矩阵的逆矩阵
     * @returns {Matrix2}
     */
    Matrix2.prototype.inverse = function () {
        var det = this.determinant();
        if (!det) {
            return null;
        }
        det = 1.0 / det;
        this.values[0] = det * (this.values[3]);
        this.values[1] = det * (-this.values[1]);
        this.values[2] = det * (-this.values[2]);
        this.values[3] = det * (this.values[0]);
        return this;
    };
    Matrix2.prototype.setRotation = function (radians) {
        var c = Math.cos(radians);
        var s = Math.sin(radians);
        this.values[0] = c;
        this.values[1] = -s;
        this.values[2] = s;
        this.values[3] = c;
        return this;
    };
    Matrix2.prototype.scaleAdjoint = function (scale) {
        var temp = this.values[0];
        this.values[0] = this.values[3] * scale;
        this.values[1] = -this.values[1] * scale;
        this.values[2] = -this.values[2] * scale;
        this.values[3] = temp * scale;
        return this;
    };
    Matrix2.prototype.rotate = function (radians) {
        var a11 = this.values[0], a12 = this.values[1], a21 = this.values[2], a22 = this.values[3];
        var sin = Math.sin(radians), cos = Math.cos(radians);
        this.values[0] = a11 * cos + a12 * sin;
        this.values[1] = a11 * -sin + a12 * cos;
        this.values[2] = a21 * cos + a22 * sin;
        this.values[3] = a21 * -sin + a22 * cos;
        return this;
    };
    Matrix2.prototype.scale = function (scale) {
        this.values[0] = this.values[0] * scale;
        this.values[1] = this.values[1] * scale;
        this.values[2] = this.values[2] * scale;
        this.values[3] = this.values[3] * scale;
        return this;
    };
    Matrix2.prototype.scaled = function (scale) {
        return this.clone().scale(scale);
    };
    Matrix2.prototype.add = function (m) {
        this.values[0] = this.values[0] + m.at(0);
        this.values[1] = this.values[1] + m.at(1);
        this.values[2] = this.values[2] + m.at(2);
        this.values[3] = this.values[3] + m.at(3);
        return this;
    };
    Matrix2.prototype.sub = function (m) {
        this.values[0] = this.values[0] - m.at(0);
        this.values[1] = this.values[1] - m.at(1);
        this.values[2] = this.values[2] - m.at(2);
        this.values[3] = this.values[3] - m.at(3);
        return this;
    };
    // dot
    Matrix2.prototype.multiply = function (m) {
        var a11 = this.values[0], a12 = this.values[1], a21 = this.values[2], a22 = this.values[3];
        var b11 = m.at(0), b12 = m.at(1), b21 = m.at(2), b22 = m.at(3);
        this.values[0] = a11 * b11 + a12 * b21;
        this.values[1] = a11 * b12 + a12 * b22;
        this.values[2] = a21 * b11 + a22 * b21;
        this.values[3] = a21 * b12 + a22 * b22;
        return this;
    };
    Matrix2.prototype.multiplied = function (m) {
        return this.clone().multiply(m);
    };
    Matrix2.prototype.transform = function (vector) {
        var x = vector.x, y = vector.y;
        vector.setValues(x * this.values[0] + y * this.values[1], x * this.values[2] + y * this.values[3]);
        return vector;
    };
    Matrix2.prototype.transformed = function (vector, out) {
        if (!out) {
            out = vector.clone();
        }
        else {
            vector.copy(out);
        }
        return this.transform(out);
    };
    Matrix2.prototype.clone = function () {
        return this.copy();
    };
    Matrix2.zero = function () {
        return new Matrix2(0, 0, 0, 0);
    };
    Matrix2.rotation = function (radians) {
        return Matrix2.zero().setRotation(radians);
    };
    Matrix2.product = function (m1, m2, out) {
        if (out === void 0) { out = null; }
        var a11 = m1.at(0), a12 = m1.at(1), a21 = m1.at(2), a22 = m1.at(3);
        if (!out) {
            out = new Matrix2();
        }
        out.init([
            a11 * m2.at(0) + a12 * m2.at(2),
            a11 * m2.at(1) + a12 * m2.at(3),
            a21 * m2.at(0) + a22 * m2.at(2),
            a21 * m2.at(1) + a22 * m2.at(3),
        ]);
        return out;
    };
    Matrix2.absolute = function (m, out) {
        if (!out) {
            out = new Matrix2();
        }
        out.values[0] = Math.abs(m.at(0));
        out.values[1] = Math.abs(m.at(1));
        out.values[2] = Math.abs(m.at(2));
        out.values[3] = Math.abs(m.at(3));
        return out;
    };
    Matrix2.dimension = 2;
    return Matrix2;
}());
exports.Matrix2 = Matrix2;
//# sourceMappingURL=matrix2.js.map