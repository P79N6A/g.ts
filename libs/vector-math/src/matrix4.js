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
var matrix3_1 = require("./matrix3");
var quaternion_1 = require("./quaternion");
var vector3_1 = require("./vector3");
var Matrix4 = /** @class */ (function () {
    function Matrix4() {
        this.values = new Float32Array(16);
        // tslint:disable-next-line
        this.transform = this.transformVector4;
        // tslint:disable-next-line
        this.transform3 = this.transformVector3;
        // tslint:disable-next-line
        this.rotate3 = this.rotateVector3;
        if (arguments.length === 1) {
            if (arguments[0]) {
                this.init(arguments[0]);
            }
        }
        else if (arguments.length === 16) {
            this.values[0] = arguments[0];
            this.values[1] = arguments[1];
            this.values[2] = arguments[2];
            this.values[3] = arguments[3];
            this.values[4] = arguments[4];
            this.values[5] = arguments[5];
            this.values[6] = arguments[6];
            this.values[7] = arguments[7];
            this.values[8] = arguments[8];
            this.values[9] = arguments[9];
            this.values[10] = arguments[10];
            this.values[11] = arguments[11];
            this.values[12] = arguments[12];
            this.values[13] = arguments[13];
            this.values[14] = arguments[14];
            this.values[15] = arguments[15];
        }
        else {
            this.values[0] = this.values[1] = this.values[2] = this.values[3] = 0;
            this.values[4] = this.values[5] = this.values[6] = this.values[7] = 0;
            this.values[8] = this.values[9] = this.values[10] = this.values[11] = 0;
            this.values[12] = this.values[13] = this.values[14] = this.values[15] = 0;
        }
    }
    Matrix4.prototype.at = function (index) {
        return this.values[index];
    };
    Matrix4.prototype.init = function (values) {
        for (var i = 0; i < 16; i++) {
            this.values[i] = values[i];
        }
        return this;
    };
    Matrix4.prototype.reset = function () {
        for (var i = 0; i < 16; i++) {
            this.values[i] = 0;
        }
    };
    Matrix4.prototype.copy = function (dest) {
        if (dest === void 0) { dest = null; }
        if (!dest) {
            return new Matrix4(this.values[0], this.values[1], this.values[2], this.values[3], this.values[4], this.values[5], this.values[6], this.values[7], this.values[8], this.values[9], this.values[10], this.values[11], this.values[12], this.values[13], this.values[14], this.values[15]);
        }
        for (var i = 0; i < 16; i++) {
            dest.values[i] = this.values[i];
        }
        return dest;
    };
    Matrix4.prototype.all = function () {
        var data = [];
        for (var i = 0; i < 16; i++) {
            data[i] = this.values[i];
        }
        return data;
    };
    Matrix4.prototype.row = function (index) {
        return [
            this.values[index * 4 + 0],
            this.values[index * 4 + 1],
            this.values[index * 4 + 2],
            this.values[index * 4 + 3],
        ];
    };
    Matrix4.prototype.col = function (index) {
        return [
            this.values[index],
            this.values[index + 4],
            this.values[index + 8],
            this.values[index + 12],
        ];
    };
    Matrix4.prototype.index = function (row, col) {
        return (row * 4) + col;
    };
    Matrix4.prototype.entry = function (row, col) {
        // console.assert((row >= 0) && (row < Matrix4.dimension));
        // console.assert((col >= 0) && (col < Matrix4.dimension));
        return this.values[this.index(row, col)];
    };
    Matrix4.prototype.setEntry = function (row, col, v) {
        this.values[this.index(row, col)] = v;
        return this;
    };
    Matrix4.prototype.setValues = function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15) {
        this.values[0] = arg0;
        this.values[1] = arg1;
        this.values[2] = arg2;
        this.values[3] = arg3;
        this.values[4] = arg4;
        this.values[5] = arg5;
        this.values[6] = arg6;
        this.values[7] = arg7;
        this.values[8] = arg8;
        this.values[9] = arg9;
        this.values[10] = arg10;
        this.values[11] = arg11;
        this.values[12] = arg12;
        this.values[13] = arg13;
        this.values[14] = arg14;
        this.values[15] = arg15;
        return this;
    };
    Matrix4.prototype.setFrom = function (arg) {
        this.values[0] = arg.values[0];
        this.values[1] = arg.values[1];
        this.values[2] = arg.values[2];
        this.values[3] = arg.values[3];
        this.values[4] = arg.values[4];
        this.values[5] = arg.values[5];
        this.values[6] = arg.values[6];
        this.values[7] = arg.values[7];
        this.values[8] = arg.values[8];
        this.values[9] = arg.values[9];
        this.values[10] = arg.values[10];
        this.values[11] = arg.values[11];
        this.values[12] = arg.values[12];
        this.values[13] = arg.values[13];
        this.values[14] = arg.values[14];
        this.values[15] = arg.values[15];
        return this;
    };
    Matrix4.prototype.equals = function (matrix, threshold) {
        if (threshold === void 0) { threshold = EPSILON; }
        for (var i = 0; i < 16; i++) {
            if (Math.abs(this.values[i] - matrix.at(i)) > threshold) {
                return false;
            }
        }
        return true;
    };
    Matrix4.prototype.determinant = function () {
        var a00 = this.values[0], a01 = this.values[1], a02 = this.values[2], a03 = this.values[3];
        var a10 = this.values[4], a11 = this.values[5], a12 = this.values[6], a13 = this.values[7];
        var a20 = this.values[8], a21 = this.values[9], a22 = this.values[10], a23 = this.values[11];
        var a30 = this.values[12], a31 = this.values[13], a32 = this.values[14], a33 = this.values[15];
        var det00 = a00 * a11 - a01 * a10, det01 = a00 * a12 - a02 * a10, det02 = a00 * a13 - a03 * a10, det03 = a01 * a12 - a02 * a11, det04 = a01 * a13 - a03 * a11, det05 = a02 * a13 - a03 * a12, det06 = a20 * a31 - a21 * a30, det07 = a20 * a32 - a22 * a30, det08 = a20 * a33 - a23 * a30, det09 = a21 * a32 - a22 * a31, det10 = a21 * a33 - a23 * a31, det11 = a22 * a33 - a23 * a32;
        return (det00 * det11 - det01 * det10 + det02 * det09 + det03 * det08 - det04 * det07 + det05 * det06);
    };
    Matrix4.prototype.setIdentity = function () {
        this.values[0] = 1;
        this.values[1] = 0;
        this.values[2] = 0;
        this.values[3] = 0;
        this.values[4] = 0;
        this.values[5] = 1;
        this.values[6] = 0;
        this.values[7] = 0;
        this.values[8] = 0;
        this.values[9] = 0;
        this.values[10] = 1;
        this.values[11] = 0;
        this.values[12] = 0;
        this.values[13] = 0;
        this.values[14] = 0;
        this.values[15] = 1;
        return this;
    };
    /**
     * 转置矩阵
     * Transpose the values of a {@class Matrix4}
     *
     * @returns {Matrix4}
     */
    Matrix4.prototype.transpose = function () {
        var temp01 = this.values[1];
        var temp02 = this.values[2];
        var temp03 = this.values[3];
        var temp12 = this.values[6];
        var temp13 = this.values[7];
        var temp23 = this.values[11];
        this.values[1] = this.values[4];
        this.values[2] = this.values[8];
        this.values[3] = this.values[12];
        this.values[4] = temp01;
        this.values[6] = this.values[9];
        this.values[7] = this.values[13];
        this.values[8] = temp02;
        this.values[9] = temp12;
        this.values[11] = this.values[14];
        this.values[12] = temp03;
        this.values[13] = temp13;
        this.values[14] = temp23;
        return this;
    };
    Matrix4.prototype.inverse = function () {
        var a00 = this.values[0];
        var a01 = this.values[1];
        var a02 = this.values[2];
        var a03 = this.values[3];
        var a10 = this.values[4];
        var a11 = this.values[5];
        var a12 = this.values[6];
        var a13 = this.values[7];
        var a20 = this.values[8];
        var a21 = this.values[9];
        var a22 = this.values[10];
        var a23 = this.values[11];
        var a30 = this.values[12];
        var a31 = this.values[13];
        var a32 = this.values[14];
        var a33 = this.values[15];
        var det00 = a00 * a11 - a01 * a10;
        var det01 = a00 * a12 - a02 * a10;
        var det02 = a00 * a13 - a03 * a10;
        var det03 = a01 * a12 - a02 * a11;
        var det04 = a01 * a13 - a03 * a11;
        var det05 = a02 * a13 - a03 * a12;
        var det06 = a20 * a31 - a21 * a30;
        var det07 = a20 * a32 - a22 * a30;
        var det08 = a20 * a33 - a23 * a30;
        var det09 = a21 * a32 - a22 * a31;
        var det10 = a21 * a33 - a23 * a31;
        var det11 = a22 * a33 - a23 * a32;
        var det = (det00 * det11 - det01 * det10 + det02 * det09 + det03 * det08 - det04 * det07 + det05 * det06);
        if (!det) {
            return null;
        }
        det = 1.0 / det;
        this.values[0] = (a11 * det11 - a12 * det10 + a13 * det09) * det;
        this.values[1] = (-a01 * det11 + a02 * det10 - a03 * det09) * det;
        this.values[2] = (a31 * det05 - a32 * det04 + a33 * det03) * det;
        this.values[3] = (-a21 * det05 + a22 * det04 - a23 * det03) * det;
        this.values[4] = (-a10 * det11 + a12 * det08 - a13 * det07) * det;
        this.values[5] = (a00 * det11 - a02 * det08 + a03 * det07) * det;
        this.values[6] = (-a30 * det05 + a32 * det02 - a33 * det01) * det;
        this.values[7] = (a20 * det05 - a22 * det02 + a23 * det01) * det;
        this.values[8] = (a10 * det10 - a11 * det08 + a13 * det06) * det;
        this.values[9] = (-a00 * det10 + a01 * det08 - a03 * det06) * det;
        this.values[10] = (a30 * det04 - a31 * det02 + a33 * det00) * det;
        this.values[11] = (-a20 * det04 + a21 * det02 - a23 * det00) * det;
        this.values[12] = (-a10 * det09 + a11 * det07 - a12 * det06) * det;
        this.values[13] = (a00 * det09 - a01 * det07 + a02 * det06) * det;
        this.values[14] = (-a30 * det03 + a31 * det01 - a32 * det00) * det;
        this.values[15] = (a20 * det03 - a21 * det01 + a22 * det00) * det;
        return this;
    };
    /**
     * Calculates the adjugate of a {@class Matrix4}
     */
    Matrix4.prototype.adjoint = function () {
        var a00 = this.values[0];
        var a01 = this.values[1];
        var a02 = this.values[2];
        var a03 = this.values[3];
        var a10 = this.values[4];
        var a11 = this.values[5];
        var a12 = this.values[6];
        var a13 = this.values[7];
        var a20 = this.values[8];
        var a21 = this.values[9];
        var a22 = this.values[10];
        var a23 = this.values[11];
        var a30 = this.values[12];
        var a31 = this.values[13];
        var a32 = this.values[14];
        var a33 = this.values[15];
        this.values[0] =
            a11 * (a22 * a33 - a23 * a32) -
                a21 * (a12 * a33 - a13 * a32) +
                a31 * (a12 * a23 - a13 * a22);
        this.values[1] = -(a01 * (a22 * a33 - a23 * a32) -
            a21 * (a02 * a33 - a03 * a32) +
            a31 * (a02 * a23 - a03 * a22));
        this.values[2] =
            a01 * (a12 * a33 - a13 * a32) -
                a11 * (a02 * a33 - a03 * a32) +
                a31 * (a02 * a13 - a03 * a12);
        this.values[3] = -(a01 * (a12 * a23 - a13 * a22) -
            a11 * (a02 * a23 - a03 * a22) +
            a21 * (a02 * a13 - a03 * a12));
        this.values[4] = -(a10 * (a22 * a33 - a23 * a32) -
            a20 * (a12 * a33 - a13 * a32) +
            a30 * (a12 * a23 - a13 * a22));
        this.values[5] =
            a00 * (a22 * a33 - a23 * a32) -
                a20 * (a02 * a33 - a03 * a32) +
                a30 * (a02 * a23 - a03 * a22);
        this.values[6] = -(a00 * (a12 * a33 - a13 * a32) -
            a10 * (a02 * a33 - a03 * a32) +
            a30 * (a02 * a13 - a03 * a12));
        this.values[7] =
            a00 * (a12 * a23 - a13 * a22) -
                a10 * (a02 * a23 - a03 * a22) +
                a20 * (a02 * a13 - a03 * a12);
        this.values[8] =
            a10 * (a21 * a33 - a23 * a31) -
                a20 * (a11 * a33 - a13 * a31) +
                a30 * (a11 * a23 - a13 * a21);
        this.values[9] = -(a00 * (a21 * a33 - a23 * a31) -
            a20 * (a01 * a33 - a03 * a31) +
            a30 * (a01 * a23 - a03 * a21));
        this.values[10] =
            a00 * (a11 * a33 - a13 * a31) -
                a10 * (a01 * a33 - a03 * a31) +
                a30 * (a01 * a13 - a03 * a11);
        this.values[11] = -(a00 * (a11 * a23 - a13 * a21) -
            a10 * (a01 * a23 - a03 * a21) +
            a20 * (a01 * a13 - a03 * a11));
        this.values[12] = -(a10 * (a21 * a32 - a22 * a31) -
            a20 * (a11 * a32 - a12 * a31) +
            a30 * (a11 * a22 - a12 * a21));
        this.values[13] =
            a00 * (a21 * a32 - a22 * a31) -
                a20 * (a01 * a32 - a02 * a31) +
                a30 * (a01 * a22 - a02 * a21);
        this.values[14] = -(a00 * (a11 * a32 - a12 * a31) -
            a10 * (a01 * a32 - a02 * a31) +
            a30 * (a01 * a12 - a02 * a11));
        this.values[15] =
            a00 * (a11 * a22 - a12 * a21) -
                a10 * (a01 * a22 - a02 * a21) +
                a20 * (a01 * a12 - a02 * a11);
        return this;
    };
    Matrix4.prototype.multiply = function (matrix) {
        var a00 = this.values[0], a01 = this.values[1], a02 = this.values[2], a03 = this.values[3];
        var a10 = this.values[4], a11 = this.values[5], a12 = this.values[6], a13 = this.values[7];
        var a20 = this.values[8], a21 = this.values[9], a22 = this.values[10], a23 = this.values[11];
        var a30 = this.values[12], a31 = this.values[13], a32 = this.values[14], a33 = this.values[15];
        var b0 = matrix.at(0), b1 = matrix.at(1), b2 = matrix.at(2), b3 = matrix.at(3);
        this.values[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this.values[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this.values[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this.values[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = matrix.at(4);
        b1 = matrix.at(5);
        b2 = matrix.at(6);
        b3 = matrix.at(7);
        this.values[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this.values[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this.values[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this.values[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = matrix.at(8);
        b1 = matrix.at(9);
        b2 = matrix.at(10);
        b3 = matrix.at(11);
        this.values[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this.values[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this.values[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this.values[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = matrix.at(12);
        b1 = matrix.at(13);
        b2 = matrix.at(14);
        b3 = matrix.at(15);
        this.values[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this.values[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this.values[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this.values[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        return this;
    };
    Matrix4.prototype.multiplied = function (m) {
        return this.clone().multiply(m);
    };
    Matrix4.prototype.transformVector4 = function (v) {
        var x = v.x, y = v.y, z = v.z, w = v.w;
        var _x = this.values[0] * x + this.values[1] * y + this.values[2] * z + this.values[3] * w;
        var _y = this.values[4] * x + this.values[5] * y + this.values[6] * z + this.values[7] * w;
        var _z = this.values[8] * x + this.values[9] * y + this.values[10] * z + this.values[11] * w;
        var _w = this.values[12] * x + this.values[13] * y + this.values[14] * z + this.values[15] * w;
        v.setValues(_x, _y, _z, _w);
        return v;
    };
    Matrix4.prototype.transformVector3 = function (v) {
        var x = v.x, y = v.y, z = v.z;
        var _x = this.values[0] * x + this.values[1] * y + this.values[2] * z + this.values[3];
        var _y = this.values[4] * x + this.values[5] * y + this.values[6] * z + this.values[7];
        var _z = this.values[8] * x + this.values[9] * y + this.values[10] * z + this.values[11];
        v.setValues(_x, _y, _z);
        return v;
    };
    Matrix4.prototype.toMatrix3 = function () {
        return new matrix3_1.Matrix3([
            this.values[0],
            this.values[1],
            this.values[2],
            this.values[4],
            this.values[5],
            this.values[6],
            this.values[8],
            this.values[9],
            this.values[10],
        ]);
    };
    Matrix4.prototype.toInverseMatrix3 = function () {
        var a00 = this.values[0];
        var a01 = this.values[1];
        var a02 = this.values[2];
        var a10 = this.values[4];
        var a11 = this.values[5];
        var a12 = this.values[6];
        var a20 = this.values[8];
        var a21 = this.values[9];
        var a22 = this.values[10];
        var det01 = a22 * a11 - a12 * a21;
        var det11 = -a22 * a10 + a12 * a20;
        var det21 = a21 * a10 - a11 * a20;
        var det = a00 * det01 + a01 * det11 + a02 * det21;
        if (!det) {
            return null;
        }
        det = 1.0 / det;
        return new matrix3_1.Matrix3([
            det01 * det,
            (-a22 * a01 + a02 * a21) * det,
            (a12 * a01 - a02 * a11) * det,
            det11 * det,
            (a22 * a00 - a02 * a20) * det,
            (-a12 * a00 + a02 * a10) * det,
            det21 * det,
            (-a21 * a00 + a01 * a20) * det,
            (a11 * a00 - a01 * a10) * det,
        ]);
    };
    Matrix4.prototype.translate = function (vector) {
        var x = vector.x;
        var y = vector.y;
        var z = vector.z;
        this.values[12] += this.values[0] * x + this.values[4] * y + this.values[8] * z;
        this.values[13] += this.values[1] * x + this.values[5] * y + this.values[9] * z;
        this.values[14] += this.values[2] * x + this.values[6] * y + this.values[10] * z;
        this.values[15] += this.values[3] * x + this.values[7] * y + this.values[11] * z;
        return this;
    };
    Matrix4.prototype.scale = function (vector) {
        var x = vector.x;
        var y = vector.y;
        var z = vector.z;
        this.values[0] *= x;
        this.values[1] *= x;
        this.values[2] *= x;
        this.values[3] *= x;
        this.values[4] *= y;
        this.values[5] *= y;
        this.values[6] *= y;
        this.values[7] *= y;
        this.values[8] *= z;
        this.values[9] *= z;
        this.values[10] *= z;
        this.values[11] *= z;
        return this;
    };
    Matrix4.prototype.rotate = function (radians, axis) {
        var x = axis.x;
        var y = axis.y;
        var z = axis.z;
        var length = Math.sqrt(x * x + y * y + z * z);
        if (!length) {
            return null;
        }
        if (length !== 1) {
            length = 1 / length;
            x *= length;
            y *= length;
            z *= length;
        }
        var s = Math.sin(radians);
        var c = Math.cos(radians);
        var t = 1.0 - c;
        var a00 = this.values[0];
        var a01 = this.values[1];
        var a02 = this.values[2];
        var a03 = this.values[3];
        var a10 = this.values[4];
        var a11 = this.values[5];
        var a12 = this.values[6];
        var a13 = this.values[7];
        var a20 = this.values[8];
        var a21 = this.values[9];
        var a22 = this.values[10];
        var a23 = this.values[11];
        var b00 = x * x * t + c;
        var b01 = y * x * t + z * s;
        var b02 = z * x * t - y * s;
        var b10 = x * y * t - z * s;
        var b11 = y * y * t + c;
        var b12 = z * y * t + x * s;
        var b20 = x * z * t + y * s;
        var b21 = y * z * t - x * s;
        var b22 = z * z * t + c;
        this.values[0] = a00 * b00 + a10 * b01 + a20 * b02;
        this.values[1] = a01 * b00 + a11 * b01 + a21 * b02;
        this.values[2] = a02 * b00 + a12 * b01 + a22 * b02;
        this.values[3] = a03 * b00 + a13 * b01 + a23 * b02;
        this.values[4] = a00 * b10 + a10 * b11 + a20 * b12;
        this.values[5] = a01 * b10 + a11 * b11 + a21 * b12;
        this.values[6] = a02 * b10 + a12 * b11 + a22 * b12;
        this.values[7] = a03 * b10 + a13 * b11 + a23 * b12;
        this.values[8] = a00 * b20 + a10 * b21 + a20 * b22;
        this.values[9] = a01 * b20 + a11 * b21 + a21 * b22;
        this.values[10] = a02 * b20 + a12 * b21 + a22 * b22;
        this.values[11] = a03 * b20 + a13 * b21 + a23 * b22;
        return this;
    };
    /**
     * Rotates a matrix by the given angle around the X axis
     *
     * @param {number} rad
     * @returns {Matrix4}
     */
    Matrix4.prototype.rotateX = function (rad) {
        var s = Math.sin(rad);
        var c = Math.cos(rad);
        var a10 = this.values[4];
        var a11 = this.values[5];
        var a12 = this.values[6];
        var a13 = this.values[7];
        var a20 = this.values[8];
        var a21 = this.values[9];
        var a22 = this.values[10];
        var a23 = this.values[11];
        // Perform axis-specific matrix multiplication
        this.values[4] = a10 * c + a20 * s;
        this.values[5] = a11 * c + a21 * s;
        this.values[6] = a12 * c + a22 * s;
        this.values[7] = a13 * c + a23 * s;
        this.values[8] = a20 * c - a10 * s;
        this.values[9] = a21 * c - a11 * s;
        this.values[10] = a22 * c - a12 * s;
        this.values[11] = a23 * c - a13 * s;
        return this;
    };
    /**
     * Rotates a matrix by the given angle around the Y axis
     *
     * @param {Number} rad the angle to rotate the matrix by
     * @returns {Matrix4}
     */
    Matrix4.prototype.rotateY = function (rad) {
        var s = Math.sin(rad);
        var c = Math.cos(rad);
        var a00 = this.values[0];
        var a01 = this.values[1];
        var a02 = this.values[2];
        var a03 = this.values[3];
        var a20 = this.values[8];
        var a21 = this.values[9];
        var a22 = this.values[10];
        var a23 = this.values[11];
        // Perform axis-specific matrix multiplication
        this.values[0] = a00 * c - a20 * s;
        this.values[1] = a01 * c - a21 * s;
        this.values[2] = a02 * c - a22 * s;
        this.values[3] = a03 * c - a23 * s;
        this.values[8] = a00 * s + a20 * c;
        this.values[9] = a01 * s + a21 * c;
        this.values[10] = a02 * s + a22 * c;
        this.values[11] = a03 * s + a23 * c;
        return this;
    };
    /**
     * Rotates a matrix by the given angle around the Z axis
     *
     * @param {Number} rad the angle to rotate the matrix by
     * @returns {Matrix4}
     */
    Matrix4.prototype.rotateZ = function (rad) {
        var s = Math.sin(rad);
        var c = Math.cos(rad);
        var a00 = this.values[0];
        var a01 = this.values[1];
        var a02 = this.values[2];
        var a03 = this.values[3];
        var a10 = this.values[4];
        var a11 = this.values[5];
        var a12 = this.values[6];
        var a13 = this.values[7];
        // Perform axis-specific matrix multiplication
        this.values[0] = a00 * c + a10 * s;
        this.values[1] = a01 * c + a11 * s;
        this.values[2] = a02 * c + a12 * s;
        this.values[3] = a03 * c + a13 * s;
        this.values[4] = a10 * c - a00 * s;
        this.values[5] = a11 * c - a01 * s;
        this.values[6] = a12 * c - a02 * s;
        this.values[7] = a13 * c - a03 * s;
        return this;
    };
    /**
     * TODO
     * @param radians
     */
    Matrix4.prototype.setRotationX = function (radians) {
        var c = Math.cos(radians);
        var s = Math.sin(radians);
        this.values[0] = 1;
        this.values[1] = 0;
        this.values[2] = 0;
        this.values[4] = 0;
        this.values[5] = c;
        this.values[6] = -s;
        this.values[8] = 0;
        this.values[9] = s;
        this.values[10] = c;
        this.values[12] = 0;
        this.values[13] = 0;
        this.values[14] = 0;
        return this;
    };
    /**
     * TODO
     * @param radians
     */
    Matrix4.prototype.setRotationY = function (radians) {
        var c = Math.cos(radians);
        var s = Math.sin(radians);
        this.values[0] = c;
        this.values[1] = 0;
        this.values[2] = s;
        this.values[3] = 0;
        this.values[4] = 0;
        this.values[5] = 1;
        this.values[6] = 0;
        this.values[7] = 0;
        this.values[8] = -s;
        this.values[9] = 0;
        this.values[10] = c;
        this.values[11] = 0;
        return this;
    };
    /**
     * TODO
     * @param radians
     */
    Matrix4.prototype.setRotationZ = function (radians) {
        var c = Math.cos(radians);
        var s = Math.sin(radians);
        this.values[0] = c;
        this.values[1] = -s;
        this.values[2] = 0;
        this.values[4] = s;
        this.values[5] = c;
        this.values[6] = 0;
        this.values[8] = 0;
        this.values[9] = 0;
        this.values[10] = 1;
        this.values[12] = 0;
        this.values[13] = 0;
        this.values[14] = 0;
    };
    Matrix4.prototype.rotateVector3 = function (v) {
        v.setValues(this.values[0] * v.x + this.values[1] * v.y + this.values[2] * v.z, this.values[4] * v.x + this.values[5] * v.y + this.values[6] * v.z, this.values[8] * v.x + this.values[9] * v.y + this.values[10] * v.z);
        return v;
    };
    Matrix4.prototype.rotated3 = function (v, out) {
        if (!out) {
            out = v.clone();
        }
        else {
            out.setFrom(v);
        }
        return this.rotateVector3(out);
    };
    /**
     * Returns the translation vector component of a transformation
     *  matrix. If a matrix is built with fromRotationTranslation,
     *  the returned vector will be the same as the translation vector
     *  originally supplied.
     * @return {Vector3}
     */
    Matrix4.prototype.getTranslation = function () {
        var out = new vector3_1.Vector3();
        out[0] = this.values[12];
        out[1] = this.values[13];
        out[2] = this.values[14];
        return out;
    };
    /**
     * Returns the scaling factor component of a transformation
     *  matrix. If a matrix is built with fromRotationTranslationScale
     *  with a normalized Quaternion paramter, the returned vector will be
     *  the same as the scaling vector
     *  originally supplied.
     * @return {Vector3}
     */
    Matrix4.prototype.getScaling = function () {
        var out = new vector3_1.Vector3();
        var m11 = this.values[0];
        var m12 = this.values[1];
        var m13 = this.values[2];
        var m21 = this.values[4];
        var m22 = this.values[5];
        var m23 = this.values[6];
        var m31 = this.values[8];
        var m32 = this.values[9];
        var m33 = this.values[10];
        out[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
        out[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
        out[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);
        return out;
    };
    /**
     * Returns a Quaternion representing the rotational component
     *  of a transformation matrix. If a matrix is built with
     *  fromRotationTranslation, the returned Quaternion will be the
     *  same as the Quaternion originally supplied.
     * @return {Quaternion}
     */
    Matrix4.prototype.getRotation = function () {
        var out = [];
        // Algorithm taken from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
        var trace = this.values[0] + this.values[5] + this.values[10];
        var S = 0;
        if (trace > 0) {
            S = Math.sqrt(trace + 1.0) * 2;
            out[3] = 0.25 * S;
            out[0] = (this.values[6] - this.values[9]) / S;
            out[1] = (this.values[8] - this.values[2]) / S;
            out[2] = (this.values[1] - this.values[4]) / S;
        }
        else if (this.values[0] > this.values[5] && this.values[0] > this.values[10]) {
            S = Math.sqrt(1.0 + this.values[0] - this.values[5] - this.values[10]) * 2;
            out[3] = (this.values[6] - this.values[9]) / S;
            out[0] = 0.25 * S;
            out[1] = (this.values[1] + this.values[4]) / S;
            out[2] = (this.values[8] + this.values[2]) / S;
        }
        else if (this.values[5] > this.values[10]) {
            S = Math.sqrt(1.0 + this.values[5] - this.values[0] - this.values[10]) * 2;
            out[3] = (this.values[8] - this.values[2]) / S;
            out[0] = (this.values[1] + this.values[4]) / S;
            out[1] = 0.25 * S;
            out[2] = (this.values[6] + this.values[9]) / S;
        }
        else {
            S = Math.sqrt(1.0 + this.values[10] - this.values[0] - this.values[5]) * 2;
            out[3] = (this.values[1] - this.values[4]) / S;
            out[0] = (this.values[8] + this.values[2]) / S;
            out[1] = (this.values[6] + this.values[9]) / S;
            out[2] = 0.25 * S;
        }
        return new quaternion_1.Quaternion(out);
    };
    /// Rotates [arg] by the absolute rotation of [this]
    /// Returns [arg].
    /// Primarily used by AABB transformation code.
    Matrix4.prototype.absoluteRotate = function (v) {
        var m00 = Math.abs(this.values[0]);
        var m01 = Math.abs(this.values[1]);
        var m02 = Math.abs(this.values[2]);
        var m10 = Math.abs(this.values[4]);
        var m11 = Math.abs(this.values[5]);
        var m12 = Math.abs(this.values[6]);
        var m20 = Math.abs(this.values[8]);
        var m21 = Math.abs(this.values[9]);
        var m22 = Math.abs(this.values[10]);
        var x = v.x;
        var y = v.y;
        var z = v.z;
        v.setValues(x * m00 + y * m01 + z * m02, x * m10 + y * m11 + z * m12, x * m20 + y * m21 + z * m22);
        return v;
    };
    /**
     * Adds two mat4's
     *
     * @param {Matrix4} matrix the second operand
     * @returns {Matrix4} out
     */
    Matrix4.prototype.add = function (matrix) {
        this.values[0] = this.values[0] + matrix.at(0);
        this.values[1] = this.values[1] + matrix.at(1);
        this.values[2] = this.values[2] + matrix.at(2);
        this.values[3] = this.values[3] + matrix.at(3);
        this.values[4] = this.values[4] + matrix.at(4);
        this.values[5] = this.values[5] + matrix.at(5);
        this.values[6] = this.values[6] + matrix.at(6);
        this.values[7] = this.values[7] + matrix.at(7);
        this.values[8] = this.values[8] + matrix.at(8);
        this.values[9] = this.values[9] + matrix.at(9);
        this.values[10] = this.values[10] + matrix.at(10);
        this.values[11] = this.values[11] + matrix.at(11);
        this.values[12] = this.values[12] + matrix.at(12);
        this.values[13] = this.values[13] + matrix.at(13);
        this.values[14] = this.values[14] + matrix.at(14);
        this.values[15] = this.values[15] + matrix.at(15);
        return this;
    };
    /**
     * Subtracts matrix b from matrix a
     *
     * @param {Matrix4} matrix the second operand
     * @returns {Matrix4}
     */
    Matrix4.prototype.subtract = function (matrix) {
        this.values[0] = this.values[0] - matrix.at(0);
        this.values[1] = this.values[1] - matrix.at(1);
        this.values[2] = this.values[2] - matrix.at(2);
        this.values[3] = this.values[3] - matrix.at(3);
        this.values[4] = this.values[4] - matrix.at(4);
        this.values[5] = this.values[5] - matrix.at(5);
        this.values[6] = this.values[6] - matrix.at(6);
        this.values[7] = this.values[7] - matrix.at(7);
        this.values[8] = this.values[8] - matrix.at(8);
        this.values[9] = this.values[9] - matrix.at(9);
        this.values[10] = this.values[10] - matrix.at(10);
        this.values[11] = this.values[11] - matrix.at(11);
        this.values[12] = this.values[12] - matrix.at(12);
        this.values[13] = this.values[13] - matrix.at(13);
        this.values[14] = this.values[14] - matrix.at(14);
        this.values[15] = this.values[15] - matrix.at(15);
        return this;
    };
    /**
     * Multiply each element of the matrix by a scalar.
     *
     * @param {Number} scalar amount to scale the matrix's elements by
     * @returns {Matrix4} out
     */
    Matrix4.prototype.multiplyScalar = function (scalar) {
        this.values[0] = this.values[0] * scalar;
        this.values[1] = this.values[1] * scalar;
        this.values[2] = this.values[2] * scalar;
        this.values[3] = this.values[3] * scalar;
        this.values[4] = this.values[4] * scalar;
        this.values[5] = this.values[5] * scalar;
        this.values[6] = this.values[6] * scalar;
        this.values[7] = this.values[7] * scalar;
        this.values[8] = this.values[8] * scalar;
        this.values[9] = this.values[9] * scalar;
        this.values[10] = this.values[10] * scalar;
        this.values[11] = this.values[11] * scalar;
        this.values[12] = this.values[12] * scalar;
        this.values[13] = this.values[13] * scalar;
        this.values[14] = this.values[14] * scalar;
        this.values[15] = this.values[15] * scalar;
        return this;
    };
    /**
     * Clone
     *
     * @returns {Matrix3} A new {@class Matrix3}
     */
    Matrix4.prototype.clone = function () {
        return this.copy();
    };
    Matrix4.zero = function () {
        return new Matrix4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    };
    /**
     * Creates a matrix from a vector translation
     * This is equivalent to (but much faster than):
     *
     *     mat4
     *     .setIdentity()
     *     .translate(vec);
     *
     * @param {Vector3} v
     * @returns {Matrix4}
     */
    Matrix4.fromTranslation = function (v) {
        var out = new Matrix4();
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = 1;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = 1;
        out[11] = 0;
        out[12] = v[0];
        out[13] = v[1];
        out[14] = v[2];
        out[15] = 1;
        return out;
    };
    /**
     * Creates a matrix from a vector scaling
     * This is equivalent to (but much faster than):
     *
     *     mat4
     *     .setIdentity()
     *     .scale(vec);
     *
     * @param {Vector3} v
     * @returns {Matrix4}
     */
    Matrix4.fromScaling = function (v) {
        var out = new Matrix4();
        out[0] = v[0];
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = v[1];
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = v[2];
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        return out;
    };
    /**
     * Creates a matrix from a given angle around a given axis
     * This is equivalent to (but much faster than):
     *
     *     mat4
     *     .setIdentity()
     *     .rotate(rad, axis);
     *
     * @param {number} rad
     * @param {Vector3} axis
     * @returns {any}
     */
    Matrix4.fromRotation = function (rad, axis) {
        var out = new Matrix4();
        var x = axis[0];
        var y = axis[1];
        var z = axis[2];
        var len = Math.sqrt(x * x + y * y + z * z);
        var s;
        var c;
        var t;
        if (Math.abs(len) < EPSILON) {
            return null;
        }
        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;
        s = Math.sin(rad);
        c = Math.cos(rad);
        t = 1 - c;
        // Perform rotation-specific matrix multiplication
        out[0] = x * x * t + c;
        out[1] = y * x * t + z * s;
        out[2] = z * x * t - y * s;
        out[3] = 0;
        out[4] = x * y * t - z * s;
        out[5] = y * y * t + c;
        out[6] = z * y * t + x * s;
        out[7] = 0;
        out[8] = x * z * t + y * s;
        out[9] = y * z * t - x * s;
        out[10] = z * z * t + c;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        return out;
    };
    /**
     * Creates a matrix from the given angle around the X axis
     * This is equivalent to (but much faster than):
     *
     *     mat4
     *     .setIdentity()
     *     .rotateX(rad);
     *
     * @param {number} rad
     * @returns {Matrix4}
     */
    Matrix4.fromXRotation = function (rad) {
        var out = new Matrix4();
        var s = Math.sin(rad);
        var c = Math.cos(rad);
        // Perform axis-specific matrix multiplication
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = c;
        out[6] = s;
        out[7] = 0;
        out[8] = 0;
        out[9] = -s;
        out[10] = c;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        return out;
    };
    /**
     * Creates a matrix from the given angle around the Y axis
     * This is equivalent to (but much faster than):
     *
     *     mat4
     *     .setIdentity()
     *     .rotateY(rad);
     *
     * @param {Number} rad the angle to rotate the matrix by
     * @returns {Matrix4} out
     */
    Matrix4.fromYRotation = function (rad) {
        var out = new Matrix4();
        var s = Math.sin(rad);
        var c = Math.cos(rad);
        // Perform axis-specific matrix multiplication
        out[0] = c;
        out[1] = 0;
        out[2] = -s;
        out[3] = 0;
        out[4] = 0;
        out[5] = 1;
        out[6] = 0;
        out[7] = 0;
        out[8] = s;
        out[9] = 0;
        out[10] = c;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        return out;
    };
    /**
     * Creates a matrix from the given angle around the Z axis
     * This is equivalent to (but much faster than):
     *
     *     mat4
     *     .setIdentity()
     *     .rotateZ(rad);
     *
     * @param {Number} rad the angle to rotate the matrix by
     * @returns {mat4} out
     */
    Matrix4.fromZRotation = function (rad) {
        var out = new Matrix4();
        var s = Math.sin(rad);
        var c = Math.cos(rad);
        // Perform axis-specific matrix multiplication
        out[0] = c;
        out[1] = s;
        out[2] = 0;
        out[3] = 0;
        out[4] = -s;
        out[5] = c;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = 1;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        return out;
    };
    /**
     * Creates a matrix from a Quaternion rotation and vector translation
     * This is equivalent to (but much faster than):
     *
     *     mat4
     *     .setIdentity()
     *     .translate(vec);
     *
     *     var quatMat = mat4
     *     .create()
     *     .toMat4(quat, quatMat);
     *
     *     mat4.multiply(dest, quatMat);
     *
     * @param {Quaternion} q Rotation Quaternion
     * @param {Vector3} v Translation vector
     * @returns {Matrix4} out
     */
    Matrix4.fromRotationTranslation = function (q, v) {
        var out = new Matrix4();
        // Quaternion math
        var x = q[0];
        var y = q[1];
        var z = q[2];
        var w = q[3];
        var x2 = x + x;
        var y2 = y + y;
        var z2 = z + z;
        var xx = x * x2;
        var xy = x * y2;
        var xz = x * z2;
        var yy = y * y2;
        var yz = y * z2;
        var zz = z * z2;
        var wx = w * x2;
        var wy = w * y2;
        var wz = w * z2;
        out[0] = 1 - (yy + zz);
        out[1] = xy + wz;
        out[2] = xz - wy;
        out[3] = 0;
        out[4] = xy - wz;
        out[5] = 1 - (xx + zz);
        out[6] = yz + wx;
        out[7] = 0;
        out[8] = xz + wy;
        out[9] = yz - wx;
        out[10] = 1 - (xx + yy);
        out[11] = 0;
        out[12] = v[0];
        out[13] = v[1];
        out[14] = v[2];
        out[15] = 1;
        return out;
    };
    /**
     * Creates a matrix from a Quaternion rotation, vector translation and vector scale
     * This is equivalent to (but much faster than):
     *
     *     mat4.setIdentity(dest);
     *     mat4.translate(dest, vec);
     *     var quatMat = mat4.create();
     *     quat4.toMat4(quat, quatMat);
     *     mat4.multiply(dest, quatMat);
     *     mat4.scale(dest, scale)
     *
     * @param {Quaternion} q Rotation Quaternion
     * @param {Vector3} v Translation vector
     * @param {Vector3} s Scaling vector
     * @returns {mat4} out
     */
    Matrix4.fromRotationTranslationScale = function (q, v, s) {
        var out = new Matrix4();
        // Quaternion math
        var x = q[0];
        var y = q[1];
        var z = q[2];
        var w = q[3];
        var x2 = x + x;
        var y2 = y + y;
        var z2 = z + z;
        var xx = x * x2;
        var xy = x * y2;
        var xz = x * z2;
        var yy = y * y2;
        var yz = y * z2;
        var zz = z * z2;
        var wx = w * x2;
        var wy = w * y2;
        var wz = w * z2;
        var sx = s[0];
        var sy = s[1];
        var sz = s[2];
        out[0] = (1 - (yy + zz)) * sx;
        out[1] = (xy + wz) * sx;
        out[2] = (xz - wy) * sx;
        out[3] = 0;
        out[4] = (xy - wz) * sy;
        out[5] = (1 - (xx + zz)) * sy;
        out[6] = (yz + wx) * sy;
        out[7] = 0;
        out[8] = (xz + wy) * sz;
        out[9] = (yz - wx) * sz;
        out[10] = (1 - (xx + yy)) * sz;
        out[11] = 0;
        out[12] = v[0];
        out[13] = v[1];
        out[14] = v[2];
        out[15] = 1;
        return out;
    };
    /**
     * Creates a matrix from a Quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
     * This is equivalent to (but much faster than):
     *
     *     mat4.setIdentity(dest);
     *     mat4.translate(dest, vec);
     *     mat4.translate(dest, origin);
     *     var quatMat = mat4.create();
     *     quat4.toMat4(quat, quatMat);
     *     mat4.multiply(dest, quatMat);
     *     mat4.scale(dest, scale)
     *     mat4.translate(dest, negativeOrigin);
     *
     * @param {quat4} q Rotation Quaternion
     * @param {Vector3} v Translation vector
     * @param {Vector3} s Scaling vector
     * @param {Vector3} o The origin vector around which to scale and rotate
     * @returns {mat4} out
     */
    Matrix4.fromRotationTranslationScaleOrigin = function (q, v, s, o) {
        var out = new Matrix4();
        // Quaternion math
        var x = q[0];
        var y = q[1];
        var z = q[2];
        var w = q[3];
        var x2 = x + x;
        var y2 = y + y;
        var z2 = z + z;
        var xx = x * x2;
        var xy = x * y2;
        var xz = x * z2;
        var yy = y * y2;
        var yz = y * z2;
        var zz = z * z2;
        var wx = w * x2;
        var wy = w * y2;
        var wz = w * z2;
        var sx = s[0];
        var sy = s[1];
        var sz = s[2];
        var ox = o[0];
        var oy = o[1];
        var oz = o[2];
        out[0] = (1 - (yy + zz)) * sx;
        out[1] = (xy + wz) * sx;
        out[2] = (xz - wy) * sx;
        out[3] = 0;
        out[4] = (xy - wz) * sy;
        out[5] = (1 - (xx + zz)) * sy;
        out[6] = (yz + wx) * sy;
        out[7] = 0;
        out[8] = (xz + wy) * sz;
        out[9] = (yz - wx) * sz;
        out[10] = (1 - (xx + yy)) * sz;
        out[11] = 0;
        out[12] = v[0] + ox - (out[0] * ox + out[4] * oy + out[8] * oz);
        out[13] = v[1] + oy - (out[1] * ox + out[5] * oy + out[9] * oz);
        out[14] = v[2] + oz - (out[2] * ox + out[6] * oy + out[10] * oz);
        out[15] = 1;
        return out;
    };
    /**
     * Calculates a 4x4 matrix from the given Quaternion
     *
     * @param {Quaternion} q Quaternion to create matrix from
     *
     * @returns {mat4} out
     */
    Matrix4.fromQuat = function (q) {
        var out = new Matrix4();
        var x = q[0];
        var y = q[1];
        var z = q[2];
        var w = q[3];
        var x2 = x + x;
        var y2 = y + y;
        var z2 = z + z;
        var xx = x * x2;
        var yx = y * x2;
        var yy = y * y2;
        var zx = z * x2;
        var zy = z * y2;
        var zz = z * z2;
        var wx = w * x2;
        var wy = w * y2;
        var wz = w * z2;
        out[0] = 1 - yy - zz;
        out[1] = yx + wz;
        out[2] = zx - wy;
        out[3] = 0;
        out[4] = yx - wz;
        out[5] = 1 - xx - zz;
        out[6] = zy + wx;
        out[7] = 0;
        out[8] = zx + wy;
        out[9] = zy - wx;
        out[10] = 1 - xx - yy;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        return out;
    };
    Matrix4.frustum = function (left, right, bottom, top, near, far) {
        var rl = (right - left);
        var tb = (top - bottom);
        var fn = (far - near);
        return new Matrix4([
            (near * 2) / rl,
            0,
            0,
            0,
            0,
            (near * 2) / tb,
            0,
            0,
            (right + left) / rl,
            (top + bottom) / tb,
            -(far + near) / fn,
            -1,
            0,
            0,
            -(far * near * 2) / fn,
            0,
        ]);
    };
    Matrix4.perspective = function (fov, aspect, near, far) {
        var top = near * Math.tan(fov * Math.PI / 360.0);
        var right = top * aspect;
        return Matrix4.frustum(-right, right, -top, top, near, far);
    };
    /**
     * Generates a perspective projection matrix with the given field of view.
     * This is primarily useful for generating projection matrices to be used
     * with the still experiemental WebVR API.
     *
     * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
     * @param {number} near Near bound of the frustum
     * @param {number} far Far bound of the frustum
     * @returns {mat4} out
     */
    Matrix4.perspectiveFromFieldOfView = function (fov, near, far) {
        var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0);
        var downTan = Math.tan(fov.downDegrees * Math.PI / 180.0);
        var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0);
        var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0);
        var xScale = 2.0 / (leftTan + rightTan);
        var yScale = 2.0 / (upTan + downTan);
        return new Matrix4([
            xScale,
            0.0,
            0.0,
            0.0,
            0.0,
            yScale,
            0.0,
            0.0,
            -((leftTan - rightTan) * xScale * 0.5),
            (upTan - downTan) * yScale * 0.5,
            far / (near - far),
            -1.0,
            0.0,
            0.0,
            far * near / (near - far),
            0.0,
        ]);
    };
    Matrix4.orthographic = function (left, right, bottom, top, near, far) {
        var rl = (right - left);
        var tb = (top - bottom);
        var fn = (far - near);
        return new Matrix4([
            2 / rl,
            0,
            0,
            0,
            0,
            2 / tb,
            0,
            0,
            0,
            0,
            -2 / fn,
            0,
            -(left + right) / rl,
            -(top + bottom) / tb,
            -(far + near) / fn,
            1,
        ]);
    };
    Matrix4.lookAt = function (position, target, up) {
        if (up === void 0) { up = vector3_1.Vector3.up; }
        if (position.equals(target)) {
            return new Matrix4().setIdentity();
        }
        var z = vector3_1.Vector3.difference(position, target).normalize();
        var x = up.clone().cross(z).normalize();
        var y = z.clone().cross(x).normalize();
        return new Matrix4([
            x.x,
            y.x,
            z.x,
            0,
            x.y,
            y.y,
            z.y,
            0,
            x.z,
            y.z,
            z.z,
            0,
            -vector3_1.Vector3.dot(x, position),
            -vector3_1.Vector3.dot(y, position),
            -vector3_1.Vector3.dot(z, position),
            1,
        ]);
    };
    Matrix4.product = function (m1, m2, result) {
        if (result === void 0) { result = null; }
        var a00 = m1.at(0);
        var a01 = m1.at(1);
        var a02 = m1.at(2);
        var a03 = m1.at(3);
        var a10 = m1.at(4);
        var a11 = m1.at(5);
        var a12 = m1.at(6);
        var a13 = m1.at(7);
        var a20 = m1.at(8);
        var a21 = m1.at(9);
        var a22 = m1.at(10);
        var a23 = m1.at(11);
        var a30 = m1.at(12);
        var a31 = m1.at(13);
        var a32 = m1.at(14);
        var a33 = m1.at(15);
        var b00 = m2.at(0);
        var b01 = m2.at(1);
        var b02 = m2.at(2);
        var b03 = m2.at(3);
        var b10 = m2.at(4);
        var b11 = m2.at(5);
        var b12 = m2.at(6);
        var b13 = m2.at(7);
        var b20 = m2.at(8);
        var b21 = m2.at(9);
        var b22 = m2.at(10);
        var b23 = m2.at(11);
        var b30 = m2.at(12);
        var b31 = m2.at(13);
        var b32 = m2.at(14);
        var b33 = m2.at(15);
        if (result) {
            result.init([
                b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
                b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
                b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
                b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
                b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
                b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
                b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
                b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
                b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
                b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
                b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
                b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
                b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
                b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
                b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
                b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
            ]);
            return result;
        }
        else {
            return new Matrix4([
                b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
                b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
                b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
                b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
                b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
                b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
                b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
                b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
                b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
                b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
                b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
                b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
                b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
                b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
                b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
                b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
            ]);
        }
    };
    Matrix4.dimension = 4;
    return Matrix4;
}());
exports.Matrix4 = Matrix4;
//# sourceMappingURL=matrix4.js.map