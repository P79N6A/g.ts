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
var vector2_1 = require("./vector2");
var Vector3 = /** @class */ (function () {
    function Vector3() {
        this.values = new Float32Array(3);
        // tslint:disable-next-line
        this.sub = this.subtract.bind(this);
        // tslint:disable-next-line
        this.mul = this.multiply.bind(this);
        // tslint:disable-next-line
        this.div = this.divide.bind(this);
        if (arguments.length === 1) {
            if (arguments[0]) {
                this.values[0] = arguments[0][0];
                this.values[1] = arguments[0][1];
                this.values[2] = arguments[0][2];
            }
        }
        else if (arguments.length === 3) {
            this.values[0] = arguments[0];
            this.values[1] = arguments[1];
            this.values[2] = arguments[2];
        }
        else {
            this.values[0] = 0;
            this.values[1] = 0;
            this.values[2] = 0;
        }
    }
    Object.defineProperty(Vector3.prototype, "x", {
        get: function () {
            return this.values[0];
        },
        set: function (value) {
            this.values[0] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "y", {
        get: function () {
            return this.values[1];
        },
        set: function (value) {
            this.values[1] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "z", {
        get: function () {
            return this.values[2];
        },
        set: function (value) {
            this.values[2] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "xy", {
        get: function () {
            return new vector2_1.Vector2(this.values[0], this.values[1]);
        },
        set: function (v) {
            this.values[0] = v.x;
            this.values[1] = v.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "xyz", {
        get: function () {
            return new Vector3(this.values[0], this.values[1], this.values[2]);
        },
        set: function (v) {
            this.values[0] = v.values[0];
            this.values[1] = v.values[1];
            this.values[2] = v.values[2];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "length", {
        get: function () {
            return Math.sqrt(this.squaredLength);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "squaredLength", {
        get: function () {
            var x = this.values[0], y = this.values[1], z = this.values[2];
            return (x * x + y * y + z * z);
        },
        enumerable: true,
        configurable: true
    });
    Vector3.prototype.at = function (index) {
        return this.values[index];
    };
    Vector3.prototype.reset = function () {
        this.values[0] = 0;
        this.values[1] = 0;
        this.values[2] = 0;
    };
    Vector3.prototype.copy = function (dest) {
        dest.values[0] = this.values[0];
        dest.values[1] = this.values[1];
        dest.values[2] = this.values[2];
        return dest;
    };
    Vector3.prototype.setFrom = function (v) {
        this.values[0] = v.values[0];
        this.values[1] = v.values[1];
        this.values[2] = v.values[2];
        return this;
    };
    Vector3.prototype.setValues = function (x, y, z) {
        this.values[0] = x;
        this.values[1] = y;
        this.values[2] = z;
        return this;
    };
    Vector3.prototype.splat = function (arg) {
        this.values[0] = arg;
        this.values[1] = arg;
        this.values[2] = arg;
        return this;
    };
    Vector3.prototype.negate = function (dest) {
        if (dest === void 0) { dest = null; }
        if (!dest) {
            dest = this;
        }
        dest.values[0] = -this.values[0];
        dest.values[1] = -this.values[1];
        dest.values[2] = -this.values[2];
        return dest;
    };
    Vector3.prototype.equals = function (vector, threshold) {
        if (threshold === void 0) { threshold = EPSILON; }
        if (Math.abs(this.values[0] - vector.values[0]) > threshold) {
            return false;
        }
        if (Math.abs(this.values[1] - vector.values[1]) > threshold) {
            return false;
        }
        if (Math.abs(this.values[2] - vector.values[2]) > threshold) {
            return false;
        }
        return true;
    };
    Vector3.prototype.add = function (vector) {
        this.values[0] += vector.values[0];
        this.values[1] += vector.values[1];
        this.values[2] += vector.values[2];
        return this;
    };
    Vector3.prototype.addScaled = function (vector, factor) {
        this.values[0] += vector.values[0] * factor;
        this.values[1] += vector.values[1] * factor;
        this.values[2] += vector.values[2] * factor;
        return this;
    };
    Vector3.prototype.subtract = function (vector) {
        this.values[0] -= vector.values[0];
        this.values[1] -= vector.values[1];
        this.values[2] -= vector.values[2];
        return this;
    };
    Vector3.prototype.multiply = function (vector) {
        this.values[0] *= vector.values[0];
        this.values[1] *= vector.values[1];
        this.values[2] *= vector.values[2];
        return this;
    };
    Vector3.prototype.divide = function (vector) {
        this.values[0] /= vector.values[0];
        this.values[1] /= vector.values[1];
        this.values[2] /= vector.values[2];
        return this;
    };
    Vector3.prototype.dot = function (v) {
        return Vector3.dot(this, v);
    };
    Vector3.prototype.scale = function (value, dest) {
        if (dest === void 0) { dest = null; }
        if (!dest) {
            dest = this;
        }
        dest.values[0] *= value;
        dest.values[1] *= value;
        dest.values[2] *= value;
        return dest;
    };
    Vector3.prototype.scaled = function (value) {
        return this.clone().scale(value);
    };
    Vector3.prototype.normalize = function () {
        var length = this.length;
        if (length === 1) {
            return this;
        }
        if (length === 0) {
            this.values[0] = 0;
            this.values[1] = 0;
            this.values[2] = 0;
            return this;
        }
        length = 1.0 / length;
        this.values[0] *= length;
        this.values[1] *= length;
        this.values[2] *= length;
        return this;
    };
    Vector3.prototype.normalized = function (dest) {
        return new Vector3().copy(dest).normalize();
    };
    Vector3.prototype.distanceTo = function (vector) {
        return Math.sqrt(this.distanceToSquared(vector));
    };
    Vector3.prototype.distanceToSquared = function (vector) {
        var x = this.values[0] - vector.values[0], y = this.values[1] - vector.values[1], z = this.values[2] - vector.values[2];
        return (x * x + y * y + z * z);
    };
    Vector3.prototype.angleTo = function (v) {
        if (this.values[0] === v.values[0] &&
            this.values[1] === v.values[1] &&
            this.values[2] === v.values[2]) {
            return 0;
        }
        var d = this.dot(v) / (this.length * v.length);
        return Math.acos(common_1.clamp(d, -1, 1));
    };
    Vector3.prototype.cross = function (vector) {
        var x = vector.values[0], y = vector.values[1], z = vector.values[2];
        var x2 = this.values[0], y2 = this.values[1], z2 = this.values[2];
        this.values[0] = y * z2 - z * y2;
        this.values[1] = z * x2 - x * z2;
        this.values[2] = x * y2 - y * x2;
        return this;
    };
    Vector3.prototype.crossInto = function (vector, out) {
        var x = vector.values[0], y = vector.values[1], z = vector.values[2];
        var x2 = this.values[0], y2 = this.values[1], z2 = this.values[2];
        out.values[0] = y * z2 - z * y2;
        out.values[1] = z * x2 - x * z2;
        out.values[2] = x * y2 - y * x2;
        return out;
    };
    Vector3.prototype.clone = function () {
        return this.copy(new Vector3());
    };
    Vector3.dot = function (vector, vector2) {
        var x = vector.values[0], y = vector.values[1], z = vector.values[2];
        var x2 = vector2.x, y2 = vector2.y, z2 = vector2.z;
        return (x * x2 + y * y2 + z * z2);
    };
    Vector3.direction = function (vector, vector2, dest) {
        if (dest === void 0) { dest = null; }
        if (!dest) {
            dest = new Vector3();
        }
        var x = vector.values[0] - vector2.x, y = vector.values[1] - vector2.y, z = vector.values[2] - vector2.z;
        var length = Math.sqrt(x * x + y * y + z * z);
        if (length === 0) {
            dest.values[0] = 0;
            dest.values[1] = 0;
            dest.values[2] = 0;
            return dest;
        }
        length = 1 / length;
        dest.values[0] = x * length;
        dest.values[1] = y * length;
        dest.values[2] = z * length;
        return dest;
    };
    /// Set the values of [result] to the minimum of [a] and [b] for each line.
    Vector3.min = function (a, b, result) {
        result.setValues(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z));
    };
    /// Set the values of [result] to the maximum of [a] and [b] for each line.
    Vector3.max = function (a, b, result) {
        result.setValues(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
    };
    Vector3.mix = function (vector, vector2, time, dest) {
        if (dest === void 0) { dest = null; }
        if (!dest) {
            dest = new Vector3();
        }
        dest.values[0] = vector.values[0] + time * (vector2.x - vector.values[0]);
        dest.values[1] = vector.values[1] + time * (vector2.y - vector.values[1]);
        dest.values[2] = vector.values[2] + time * (vector2.z - vector.values[2]);
        return dest;
    };
    Vector3.sum = function (vector, vector2, dest) {
        if (dest === void 0) { dest = null; }
        if (!dest) {
            dest = new Vector3();
        }
        dest.values[0] = vector.values[0] + vector2.x;
        dest.values[1] = vector.values[1] + vector2.y;
        dest.values[2] = vector.values[2] + vector2.z;
        return dest;
    };
    Vector3.difference = function (vector, vector2, dest) {
        if (dest === void 0) { dest = null; }
        if (!dest) {
            dest = new Vector3();
        }
        dest.values[0] = vector.values[0] - vector2.x;
        dest.values[1] = vector.values[1] - vector2.y;
        dest.values[2] = vector.values[2] - vector2.z;
        return dest;
    };
    Vector3.product = function (vector, vector2, dest) {
        if (dest === void 0) { dest = null; }
        if (!dest) {
            dest = new Vector3();
        }
        dest.values[0] = vector.values[0] * vector2.x;
        dest.values[1] = vector.values[1] * vector2.y;
        dest.values[2] = vector.values[2] * vector2.z;
        return dest;
    };
    Vector3.quotient = function (vector, vector2, dest) {
        if (dest === void 0) { dest = null; }
        if (!dest) {
            dest = new Vector3();
        }
        dest.values[0] = vector.values[0] / vector2.x;
        dest.values[1] = vector.values[1] / vector2.y;
        dest.values[2] = vector.values[2] / vector2.z;
        return dest;
    };
    Vector3.zero = function () {
        return new Vector3(0, 0, 0);
    };
    Vector3.up = new Vector3([0, 1, 0]);
    Vector3.right = new Vector3([1, 0, 0]);
    Vector3.forward = new Vector3([0, 0, 1]);
    return Vector3;
}());
exports.Vector3 = Vector3;
//# sourceMappingURL=vector3.js.map