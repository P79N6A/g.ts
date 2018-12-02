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
var vector3_1 = require("./vector3");
var vector4_1 = require("./vector4");
var Vector2 = /** @class */ (function () {
    function Vector2() {
        this.values = new Float32Array(2);
        // tslint:disable-next-line
        this.sub = this.subtract.bind(this);
        // tslint:disable-next-line
        this.mul = this.multiply.bind(this);
        // tslint:disable-next-line
        this.div = this.divide.bind(this);
        if (arguments.length === 1) {
            if (arguments[0]) {
                this.xy = arguments[0];
            }
        }
        else if (arguments.length === 2) {
            this.values[0] = arguments[0];
            this.values[1] = arguments[1];
        }
        else {
            this.values[0] = 0;
            this.values[1] = 0;
        }
    }
    Object.defineProperty(Vector2.prototype, "r", {
        get: function () { return this.x; },
        // region getter setter
        set: function (arg) { this.values[0] = arg; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "g", {
        get: function () { return this.y; },
        set: function (arg) { this.values[1] = arg; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "s", {
        get: function () { return this.x; },
        set: function (arg) { this.values[0] = arg; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "t", {
        get: function () { return this.y; },
        set: function (arg) { this.values[1] = arg; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "x", {
        get: function () { return this.values[0]; },
        set: function (arg) { this.values[0] = arg; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "y", {
        get: function () { return this.values[1]; },
        set: function (arg) { this.values[1] = arg; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "rg", {
        get: function () { return this.xy; },
        set: function (arg) { this.xy = arg; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "gr", {
        get: function () { return this.yx; },
        set: function (arg) { this.yx = arg; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "st", {
        get: function () { return this.xy; },
        set: function (arg) { this.xy = arg; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "ts", {
        get: function () { return this.yx; },
        set: function (arg) { this.yx = arg; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "xy", {
        get: function () { return new Vector2(this.values[0], this.values[1]); },
        set: function (v) {
            this.values[0] = v.x;
            this.values[1] = v.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "yx", {
        get: function () { return new Vector2(this.values[1], this.values[0]); },
        set: function (v) {
            this.values[1] = v.x;
            this.values[0] = v.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "xx", {
        get: function () { return new Vector2(this.values[0], this.values[0]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "yy", {
        get: function () { return new Vector2(this.values[1], this.values[1]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "xxx", {
        get: function () { return new vector3_1.Vector3(this.values[0], this.values[0], this.values[0]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "xxy", {
        get: function () { return new vector3_1.Vector3(this.values[0], this.values[0], this.values[1]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "xyx", {
        get: function () { return new vector3_1.Vector3(this.values[0], this.values[1], this.values[0]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "xyy", {
        get: function () { return new vector3_1.Vector3(this.values[0], this.values[1], this.values[1]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "yxx", {
        get: function () { return new vector3_1.Vector3(this.values[1], this.values[0], this.values[0]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "yxy", {
        get: function () { return new vector3_1.Vector3(this.values[1], this.values[0], this.values[1]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "yyx", {
        get: function () { return new vector3_1.Vector3(this.values[1], this.values[1], this.values[0]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "yyy", {
        get: function () { return new vector3_1.Vector3(this.values[1], this.values[1], this.values[1]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "xxxx", {
        get: function () { return new vector4_1.Vector4(this.values[0], this.values[0], this.values[0], this.values[0]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "xxxy", {
        get: function () { return new vector4_1.Vector4(this.values[0], this.values[0], this.values[0], this.values[1]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "xxyx", {
        get: function () { return new vector4_1.Vector4(this.values[0], this.values[0], this.values[1], this.values[0]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "xxyy", {
        get: function () { return new vector4_1.Vector4(this.values[0], this.values[0], this.values[1], this.values[1]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "xyxx", {
        get: function () { return new vector4_1.Vector4(this.values[0], this.values[1], this.values[0], this.values[0]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "xyxy", {
        get: function () { return new vector4_1.Vector4(this.values[0], this.values[1], this.values[0], this.values[1]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "xyyx", {
        get: function () { return new vector4_1.Vector4(this.values[0], this.values[1], this.values[1], this.values[0]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "xyyy", {
        get: function () { return new vector4_1.Vector4(this.values[0], this.values[1], this.values[1], this.values[1]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "yxxx", {
        get: function () { return new vector4_1.Vector4(this.values[1], this.values[0], this.values[0], this.values[0]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "yxxy", {
        get: function () { return new vector4_1.Vector4(this.values[1], this.values[0], this.values[0], this.values[1]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "yxyx", {
        get: function () { return new vector4_1.Vector4(this.values[1], this.values[0], this.values[1], this.values[0]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "yxyy", {
        get: function () { return new vector4_1.Vector4(this.values[1], this.values[0], this.values[1], this.values[1]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "yyxx", {
        get: function () { return new vector4_1.Vector4(this.values[1], this.values[1], this.values[0], this.values[0]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "yyxy", {
        get: function () { return new vector4_1.Vector4(this.values[1], this.values[1], this.values[0], this.values[1]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "yyyx", {
        get: function () { return new vector4_1.Vector4(this.values[1], this.values[1], this.values[1], this.values[0]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "yyyy", {
        get: function () { return new vector4_1.Vector4(this.values[1], this.values[1], this.values[1], this.values[1]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "rr", {
        get: function () { return this.xx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "gg", {
        get: function () { return this.yy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "rrr", {
        get: function () { return this.xxx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "rrg", {
        get: function () { return this.xxy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "rgr", {
        get: function () { return this.xyx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "rgg", {
        get: function () { return this.xyy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "grr", {
        get: function () { return this.yxx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "grg", {
        get: function () { return this.yxy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "ggr", {
        get: function () { return this.yyx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "ggg", {
        get: function () { return this.yyy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "rrrr", {
        get: function () { return this.xxxx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "rrrg", {
        get: function () { return this.xxxy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "rrgr", {
        get: function () { return this.xxyx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "rrgg", {
        get: function () { return this.xxyy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "rgrr", {
        get: function () { return this.xyxx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "rgrg", {
        get: function () { return this.xyxy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "rggr", {
        get: function () { return this.xyyx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "rggg", {
        get: function () { return this.xyyy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "grrr", {
        get: function () { return this.yxxx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "grrg", {
        get: function () { return this.yxxy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "grgr", {
        get: function () { return this.yxyx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "grgg", {
        get: function () { return this.yxyy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "ggrr", {
        get: function () { return this.yyxx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "ggrg", {
        get: function () { return this.yyxy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "gggr", {
        get: function () { return this.yyyx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "gggg", {
        get: function () { return this.yyyy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "ss", {
        get: function () { return this.xx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "tt", {
        get: function () { return this.yy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "sss", {
        get: function () { return this.xxx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "sst", {
        get: function () { return this.xxy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "sts", {
        get: function () { return this.xyx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "stt", {
        get: function () { return this.xyy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "tss", {
        get: function () { return this.yxx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "tst", {
        get: function () { return this.yxy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "tts", {
        get: function () { return this.yyx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "ttt", {
        get: function () { return this.yyy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "ssss", {
        get: function () { return this.xxxx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "ssst", {
        get: function () { return this.xxxy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "ssts", {
        get: function () { return this.xxyx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "sstt", {
        get: function () { return this.xxyy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "stss", {
        get: function () { return this.xyxx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "stst", {
        get: function () { return this.xyxy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "stts", {
        get: function () { return this.xyyx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "sttt", {
        get: function () { return this.xyyy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "tsss", {
        get: function () { return this.yxxx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "tsst", {
        get: function () { return this.yxxy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "tsts", {
        get: function () { return this.yxyx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "tstt", {
        get: function () { return this.yxyy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "ttss", {
        get: function () { return this.yyxx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "ttst", {
        get: function () { return this.yyxy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "ttts", {
        get: function () { return this.yyyx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "tttt", {
        get: function () { return this.yyyy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "length", {
        // endregion
        get: function () {
            return Math.sqrt(this.squaredLength);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "squaredLength", {
        get: function () {
            var x = this.x, y = this.y;
            return (x * x + y * y);
        },
        enumerable: true,
        configurable: true
    });
    Vector2.prototype.at = function (index) {
        return this.values[index];
    };
    Vector2.prototype.reset = function () {
        this.x = 0;
        this.y = 0;
    };
    Vector2.prototype.copy = function (out) {
        if (!out) {
            return new Vector2(this.values[0], this.values[1]);
        }
        out.x = this.x;
        out.y = this.y;
        return out;
    };
    Vector2.prototype.setValues = function (x, y) {
        this.values[0] = x;
        this.values[1] = y;
        return this;
    };
    Vector2.prototype.setFrom = function (v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    };
    Vector2.prototype.splat = function (arg) {
        this.values[0] = arg;
        this.values[1] = arg;
        return this;
    };
    Vector2.prototype.negate = function () {
        this.values[0] = -this.values[0];
        this.values[1] = -this.values[1];
        return this;
    };
    Vector2.prototype.absolute = function () {
        this.values[0] = Math.abs(this.values[0]);
        this.values[1] = Math.abs(this.values[1]);
    };
    Vector2.prototype.equals = function (vector, threshold) {
        if (threshold === void 0) { threshold = common_1.EPSILON; }
        if (Math.abs(this.x - vector.x) > threshold) {
            return false;
        }
        if (Math.abs(this.y - vector.y) > threshold) {
            return false;
        }
        return true;
    };
    Vector2.prototype.add = function (vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    };
    Vector2.prototype.subtract = function (vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    };
    Vector2.prototype.multiply = function (vector) {
        this.x *= vector.x;
        this.y *= vector.y;
        return this;
    };
    Vector2.prototype.divide = function (vector) {
        this.x /= vector.x;
        this.y /= vector.y;
        return this;
    };
    /**
     * Math.ceil the components of a vec2
     *
     * @param {vec2} out the receiving vector
     * @returns {vec2} out
     */
    Vector2.prototype.ceil = function (out) {
        if (out === void 0) { out = null; }
        if (!out) {
            out = this;
        }
        out.x = Math.ceil(this.x);
        out.y = Math.ceil(this.y);
        return out;
    };
    /**
     * Math.floor the components of a vec2
     *
     * @param {vec2} out the receiving vector
     * @returns {vec2} out
     */
    Vector2.prototype.floor = function (out) {
        if (out === void 0) { out = null; }
        if (!out) {
            out = this;
        }
        out.x = Math.floor(this.x);
        out.y = Math.floor(this.y);
        return out;
    };
    /**
     * Math.round the components of a vec2
     *
     * @param {vec2} out the receiving vector
     * @returns {vec2} out
     */
    Vector2.prototype.round = function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    };
    Vector2.prototype.roundToZero = function () {
        this.values[0] = this.values[0] < 0 ? Math.ceil(this.values[0]) : Math.floor(this.values[0]);
        this.values[1] = this.values[1] < 0 ? Math.ceil(this.values[1]) : Math.floor(this.values[1]);
    };
    Vector2.prototype.clamp = function (min, max) {
        this.values[0] = common_1.clamp(this.values[0], min.values[0], max.values[0]);
        this.values[1] = common_1.clamp(this.values[1], min.values[1], max.values[1]);
        return this;
    };
    Vector2.prototype.clampScalar = function (min, max) {
        this.values[0] = common_1.clamp(this.values[0], min, max);
        this.values[1] = common_1.clamp(this.values[1], min, max);
        return this;
    };
    Vector2.prototype.scale = function (value, out) {
        if (out === void 0) { out = null; }
        if (!out) {
            out = this;
        }
        out.x *= value;
        out.y *= value;
        return out;
    };
    Vector2.prototype.scaled = function (value) {
        return this.clone().scale(value);
    };
    Vector2.prototype.normalize = function (out) {
        if (out === void 0) { out = null; }
        if (!out) {
            out = this;
        }
        var length = this.length;
        if (length === 1) {
            return this;
        }
        else if (length === 0) {
            out.x = 0;
            out.y = 0;
            return out;
        }
        else {
            length = 1.0 / length;
            out.x *= length;
            out.y *= length;
            return out;
        }
    };
    Vector2.prototype.normalized = function () {
        return this.clone().normalize();
    };
    Vector2.prototype.distanceTo = function (arg) {
        return Math.sqrt(this.distanceToSquared(arg));
    };
    Vector2.prototype.distanceToSquared = function (arg) {
        var dx = this.x - arg.x;
        var dy = this.y - arg.y;
        return dx * dx + dy * dy;
    };
    Vector2.prototype.angleTo = function (other) {
        return Vector2.angle(this, other);
    };
    Vector2.prototype.angleToSigned = function (other) {
        return Vector2.angleSigned(this, other);
    };
    Vector2.prototype.dot = function (other) {
        return Vector2.dot(this, other);
    };
    Vector2.prototype.multiplyMatrix2 = function (matrix, out) {
        if (out === void 0) { out = null; }
        if (!out) {
            this.copy(out);
        }
        return matrix.transform(out);
    };
    Vector2.prototype.reflect = function (normal) {
        return this.sub(normal.scaled(2 * normal.dot(this)));
    };
    Vector2.prototype.refleted = function (normal) {
        return this.clone().reflect(normal);
    };
    /**
     * 相对误差
     */
    Vector2.prototype.relativeError = function (correct) {
        var correctNorm = correct.length;
        var diffNorm = (this.clone().sub(correct)).length;
        return diffNorm / correctNorm;
    };
    /**
     * 绝对误差
     */
    Vector2.prototype.absoluteError = function (correct) {
        return (this.clone().sub(correct)).length;
    };
    Vector2.prototype.vertical = function (flag, out) {
        if (!out) {
            out = this;
        }
        var x = this.x;
        var y = this.y;
        if (flag) {
            out.x = y;
            out.y = -1 * x;
        }
        else {
            out.x = -1 * y;
            out.y = x;
        }
        return out;
    };
    Vector2.prototype.clone = function () {
        return this.copy();
    };
    Vector2.cross = function (vector, vector2) {
        return vector.x * vector2.y - vector.y * vector2.x;
    };
    Vector2.dot = function (vector, vector2) {
        return vector.x * vector2.x + vector.y * vector2.y;
    };
    Vector2.distance = function (vector, vector2) {
        return Math.sqrt(this.squaredDistance(vector, vector2));
    };
    Vector2.squaredDistance = function (vector, vector2) {
        var x = vector2.x - vector.x, y = vector2.y - vector.y;
        return (x * x + y * y);
    };
    Vector2.direction = function (vector, vector2, out) {
        if (out === void 0) { out = null; }
        if (!out) {
            out = new Vector2();
        }
        var x = vector.x - vector2.x, y = vector.y - vector2.y;
        var length = Math.sqrt(x * x + y * y);
        if (length === 0) {
            out.x = 0;
            out.y = 0;
            return out;
        }
        length = 1 / length;
        out.x = x * length;
        out.y = y * length;
        return out;
    };
    Vector2.mix = function (vector, vector2, time, out) {
        if (out === void 0) { out = null; }
        if (!out) {
            out = new Vector2();
        }
        var x = vector.x, y = vector.y;
        var x2 = vector2.x, y2 = vector2.y;
        out.x = x + time * (x2 - x);
        out.y = y + time * (y2 - y);
        return out;
    };
    Vector2.sum = function (vector, vector2, out) {
        if (out === void 0) { out = null; }
        if (!out) {
            out = new Vector2();
        }
        out.x = vector.x + vector2.x;
        out.y = vector.y + vector2.y;
        return out;
    };
    Vector2.difference = function (vector, vector2, out) {
        if (out === void 0) { out = null; }
        if (!out) {
            out = new Vector2();
        }
        out.x = vector.x - vector2.x;
        out.y = vector.y - vector2.y;
        return out;
    };
    Vector2.product = function (vector, vector2, out) {
        if (out === void 0) { out = null; }
        if (!out) {
            out = new Vector2();
        }
        out.x = vector.x * vector2.x;
        out.y = vector.y * vector2.y;
        return out;
    };
    Vector2.quotient = function (vector, vector2, out) {
        if (out === void 0) { out = null; }
        if (!out) {
            out = new Vector2();
        }
        out.x = vector.x / vector2.x;
        out.y = vector.y / vector2.y;
        return out;
    };
    /**
     * Returns the minimum of two vec2's
     *
     * @param {vec2} a the first operand
     * @param {vec2} b the second operand
     * @param {vec2} out the receiving vector
     * @returns {vec2} out
     */
    Vector2.min = function (a, b, out) {
        if (out === void 0) { out = null; }
        if (!out) {
            out = new Vector2();
        }
        out.x = Math.min(a.x, b.x);
        out.y = Math.min(a.y, b.y);
        return out;
    };
    /**
     * Returns the maximum of two vec2's
     *
     * @param {vec2} a the first operand
     * @param {vec2} b the second operand
     * @param {vec2} out the receiving vector
     * @returns {vec2} out
     */
    Vector2.max = function (a, b, out) {
        if (out === void 0) { out = null; }
        if (!out) {
            out = new Vector2();
        }
        out.x = Math.max(a.x, b.x);
        out.y = Math.max(a.y, b.y);
        return out;
    };
    Vector2.lerp = function (a, b, t, out) {
        if (out === void 0) { out = null; }
        if (!out) {
            out = new Vector2();
        }
        var ax = a.x;
        var ay = a.y;
        out.x = ax + t * (b.x - ax);
        out.y = ay + t * (b.y - ay);
        return out;
    };
    Vector2.angle = function (v1, v2) {
        if (v1.values[0] === v2.values[0] && v1.values[1] === v2.values[1]) {
            return 0;
        }
        var theta = Vector2.dot(v1, v2) / (v1.length * v2.length);
        return Math.acos(Math.max(Math.min(theta, -1), 1));
    };
    Vector2.angleSigned = function (v1, v2) {
        if (v1.values[0] === v2.values[0] && v1.values[1] === v2.values[1]) {
            return 0;
        }
        var s = Vector2.cross(v1, v2);
        var c = Vector2.dot(v1, v2);
        return Math.atan2(s, c);
    };
    return Vector2;
}());
exports.Vector2 = Vector2;
//# sourceMappingURL=vector2.js.map