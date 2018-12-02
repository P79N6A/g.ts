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
var Vector4 = /** @class */ (function () {
    function Vector4() {
        this.values = new Float32Array(4);
        // tslint:disable-next-line
        this.sub = this.subtract.bind(this);
        // tslint:disable-next-line
        this.mul = this.multiply.bind(this);
        // tslint:disable-next-line
        this.div = this.divide.bind(this);
        if (arguments.length === 1) {
            if (arguments[0]) {
                this.xyzw = arguments[0];
            }
        }
        else if (arguments.length === 4) {
            this.values[0] = arguments[0];
            this.values[1] = arguments[1];
            this.values[2] = arguments[2];
            this.values[3] = arguments[3];
        }
        else {
            this.values[0] = 0;
            this.values[1] = 0;
            this.values[2] = 0;
            this.values[3] = 0;
        }
    }
    Object.defineProperty(Vector4.prototype, "x", {
        get: function () {
            return this.values[0];
        },
        set: function (value) {
            this.values[0] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4.prototype, "y", {
        get: function () {
            return this.values[1];
        },
        set: function (value) {
            this.values[1] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4.prototype, "z", {
        get: function () {
            return this.values[2];
        },
        set: function (value) {
            this.values[2] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4.prototype, "w", {
        get: function () {
            return this.values[3];
        },
        set: function (value) {
            this.values[3] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4.prototype, "xy", {
        get: function () {
            return [
                this.values[0],
                this.values[1],
            ];
        },
        set: function (values) {
            this.values[0] = values[0];
            this.values[1] = values[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4.prototype, "xyz", {
        get: function () {
            return [
                this.values[0],
                this.values[1],
                this.values[2],
            ];
        },
        set: function (values) {
            this.values[0] = values[0];
            this.values[1] = values[1];
            this.values[2] = values[2];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4.prototype, "xyzw", {
        get: function () {
            return [
                this.values[0],
                this.values[1],
                this.values[2],
                this.values[3],
            ];
        },
        set: function (values) {
            this.values[0] = values[0];
            this.values[1] = values[1];
            this.values[2] = values[2];
            this.values[3] = values[3];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4.prototype, "r", {
        get: function () {
            return this.values[0];
        },
        set: function (value) {
            this.values[0] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4.prototype, "g", {
        get: function () {
            return this.values[1];
        },
        set: function (value) {
            this.values[1] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4.prototype, "b", {
        get: function () {
            return this.values[2];
        },
        set: function (value) {
            this.values[2] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4.prototype, "a", {
        get: function () {
            return this.values[3];
        },
        set: function (value) {
            this.values[3] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4.prototype, "rg", {
        get: function () {
            return [
                this.values[0],
                this.values[1],
            ];
        },
        set: function (values) {
            this.values[0] = values[0];
            this.values[1] = values[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4.prototype, "rgb", {
        get: function () {
            return [
                this.values[0],
                this.values[1],
                this.values[2],
            ];
        },
        set: function (values) {
            this.values[0] = values[0];
            this.values[1] = values[1];
            this.values[2] = values[2];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4.prototype, "rgba", {
        get: function () {
            return [
                this.values[0],
                this.values[1],
                this.values[2],
                this.values[3],
            ];
        },
        set: function (values) {
            this.values[0] = values[0];
            this.values[1] = values[1];
            this.values[2] = values[2];
            this.values[3] = values[3];
        },
        enumerable: true,
        configurable: true
    });
    Vector4.prototype.at = function (index) {
        return this.values[index];
    };
    Vector4.prototype.reset = function () {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 0;
    };
    Vector4.prototype.copy = function (dest) {
        if (dest === void 0) { dest = null; }
        if (!dest) {
            return new Vector4(this.values[0], this.values[1], this.values[2], this.values[3]);
        }
        dest.values[0] = this.values[0];
        dest.values[1] = this.values[1];
        dest.values[2] = this.values[2];
        dest.values[3] = this.values[3];
        return dest;
    };
    Vector4.prototype.setValues = function (x, y, z, w) {
        this.values[0] = x;
        this.values[1] = y;
        this.values[2] = z;
        this.values[3] = w;
        return this;
    };
    Vector4.prototype.setIdentity = function () {
        this.values[0] = 0.0;
        this.values[1] = 0.0;
        this.values[2] = 0.0;
        this.values[3] = 1.0;
        return this;
    };
    Vector4.prototype.setFrom = function (other) {
        this.values[0] = other.values[0];
        this.values[1] = other.values[1];
        this.values[2] = other.values[2];
        this.values[3] = other.values[3];
        return this;
    };
    Vector4.prototype.splat = function (arg) {
        this.values[0] = arg;
        this.values[1] = arg;
        this.values[2] = arg;
        this.values[3] = arg;
        return this;
    };
    Vector4.prototype.negate = function (dest) {
        if (dest === void 0) { dest = null; }
        if (!dest) {
            dest = this;
        }
        dest.x = -this.x;
        dest.y = -this.y;
        dest.z = -this.z;
        dest.w = -this.w;
        return dest;
    };
    Vector4.prototype.equals = function (vector, threshold) {
        if (threshold === void 0) { threshold = EPSILON; }
        if (Math.abs(this.x - vector.x) > threshold) {
            return false;
        }
        if (Math.abs(this.y - vector.y) > threshold) {
            return false;
        }
        if (Math.abs(this.z - vector.z) > threshold) {
            return false;
        }
        if (Math.abs(this.w - vector.w) > threshold) {
            return false;
        }
        return true;
    };
    Vector4.prototype.length = function () {
        return Math.sqrt(this.squaredLength());
    };
    Vector4.prototype.squaredLength = function () {
        var x = this.x, y = this.y, z = this.z, w = this.w;
        return (x * x + y * y + z * z + w * w);
    };
    Vector4.prototype.add = function (vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
        this.w += vector.w;
        return this;
    };
    Vector4.prototype.subtract = function (vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        this.z -= vector.z;
        this.w -= vector.w;
        return this;
    };
    Vector4.prototype.multiply = function (vector) {
        this.x *= vector.x;
        this.y *= vector.y;
        this.z *= vector.z;
        this.w *= vector.w;
        return this;
    };
    Vector4.prototype.divide = function (vector) {
        this.x /= vector.x;
        this.y /= vector.y;
        this.z /= vector.z;
        this.w /= vector.w;
        return this;
    };
    Vector4.prototype.scale = function (value, dest) {
        if (dest === void 0) { dest = null; }
        if (!dest) {
            dest = this;
        }
        dest.x *= value;
        dest.y *= value;
        dest.z *= value;
        dest.w *= value;
        return dest;
    };
    Vector4.prototype.normalize = function () {
        var length = this.length();
        if (length === 1) {
            return this;
        }
        if (length === 0) {
            this.values[0] *= 0;
            this.values[1] *= 0;
            this.values[2] *= 0;
            this.values[3] *= 0;
            return this;
        }
        length = 1.0 / length;
        this.values[0] *= length;
        this.values[1] *= length;
        this.values[2] *= length;
        this.values[3] *= length;
        return this;
    };
    Vector4.mix = function (vector, vector2, time, dest) {
        if (dest === void 0) { dest = null; }
        if (!dest) {
            dest = new Vector4();
        }
        dest.x = vector.x + time * (vector2.x - vector.x);
        dest.y = vector.y + time * (vector2.y - vector.y);
        dest.z = vector.z + time * (vector2.z - vector.z);
        dest.w = vector.w + time * (vector2.w - vector.w);
        return dest;
    };
    Vector4.sum = function (vector, vector2, dest) {
        if (dest === void 0) { dest = null; }
        if (!dest) {
            dest = new Vector4();
        }
        dest.x = vector.x + vector2.x;
        dest.y = vector.y + vector2.y;
        dest.z = vector.z + vector2.z;
        dest.w = vector.w + vector2.w;
        return dest;
    };
    Vector4.difference = function (vector, vector2, dest) {
        if (dest === void 0) { dest = null; }
        if (!dest) {
            dest = new Vector4();
        }
        dest.x = vector.x - vector2.x;
        dest.y = vector.y - vector2.y;
        dest.z = vector.z - vector2.z;
        dest.w = vector.w - vector2.w;
        return dest;
    };
    Vector4.product = function (vector, vector2, dest) {
        if (dest === void 0) { dest = null; }
        if (!dest) {
            dest = new Vector4();
        }
        dest.x = vector.x * vector2.x;
        dest.y = vector.y * vector2.y;
        dest.z = vector.z * vector2.z;
        dest.w = vector.w * vector2.w;
        return dest;
    };
    Vector4.quotient = function (vector, vector2, dest) {
        if (!dest) {
            dest = new Vector4();
        }
        dest.x = vector.x / vector2.x;
        dest.y = vector.y / vector2.y;
        dest.z = vector.z / vector2.z;
        dest.w = vector.w / vector2.w;
        return dest;
    };
    Vector4.zero = new Vector4([0, 0, 0, 1]);
    return Vector4;
}());
exports.Vector4 = Vector4;
//# sourceMappingURL=vector4.js.map