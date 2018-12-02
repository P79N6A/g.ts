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
var matrix4_1 = require("./matrix4");
var vector3_1 = require("./vector3");
var vector4_1 = require("./vector4");
var Quaternion = /** @class */ (function () {
    function Quaternion(values) {
        if (values === void 0) { values = null; }
        this.values = new Float32Array(4);
        if (values) {
            this.xyzw = values;
        }
    }
    Object.defineProperty(Quaternion.prototype, "x", {
        get: function () {
            return this.values[0];
        },
        set: function (value) {
            this.values[0] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "y", {
        get: function () {
            return this.values[1];
        },
        set: function (value) {
            this.values[1] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "z", {
        get: function () {
            return this.values[2];
        },
        set: function (value) {
            this.values[2] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "w", {
        get: function () {
            return this.values[3];
        },
        set: function (value) {
            this.values[3] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "xy", {
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
    Object.defineProperty(Quaternion.prototype, "xyz", {
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
    Object.defineProperty(Quaternion.prototype, "xyzw", {
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
    Quaternion.prototype.at = function (index) {
        return this.values[index];
    };
    Quaternion.prototype.reset = function () {
        for (var i = 0; i < 4; i++) {
            this.values[i] = 0;
        }
    };
    Quaternion.prototype.copy = function (out) {
        if (out === void 0) { out = null; }
        if (!out) {
            out = new Quaternion();
        }
        for (var i = 0; i < 4; i++) {
            out.values[i] = this.values[i];
        }
        return out;
    };
    Quaternion.prototype.roll = function () {
        var x = this.x, y = this.y, z = this.z, w = this.w;
        return Math.atan2(2.0 * (x * y + w * z), w * w + x * x - y * y - z * z);
    };
    Quaternion.prototype.pitch = function () {
        var x = this.x, y = this.y, z = this.z, w = this.w;
        return Math.atan2(2.0 * (y * z + w * x), w * w - x * x - y * y + z * z);
    };
    Quaternion.prototype.yaw = function () {
        return Math.asin(2.0 * (this.x * this.z - this.w * this.y));
    };
    Quaternion.prototype.equals = function (vector, threshold) {
        if (threshold === void 0) { threshold = EPSILON; }
        for (var i = 0; i < 4; i++) {
            if (Math.abs(this.values[i] - vector.at(i)) > threshold) {
                return false;
            }
        }
        return true;
    };
    Quaternion.prototype.identity = function () {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 1;
        return this;
    };
    Quaternion.prototype.inverse = function () {
        var dot = Quaternion.dot(this, this);
        if (!dot) {
            this.xyzw = [0, 0, 0, 0];
            return this;
        }
        var invDot = dot ? 1.0 / dot : 0;
        this.x *= -invDot;
        this.y *= -invDot;
        this.z *= -invDot;
        this.w *= invDot;
        return this;
    };
    Quaternion.prototype.conjugate = function () {
        this.values[0] *= -1;
        this.values[1] *= -1;
        this.values[2] *= -1;
        return this;
    };
    Quaternion.prototype.length = function () {
        var x = this.x, y = this.y, z = this.z, w = this.w;
        return Math.sqrt(x * x + y * y + z * z + w * w);
    };
    Quaternion.prototype.normalize = function (out) {
        if (out === void 0) { out = null; }
        if (!out) {
            out = this;
        }
        var x = this.x, y = this.y, z = this.z, w = this.w;
        var length = Math.sqrt(x * x + y * y + z * z + w * w);
        if (!length) {
            out.x = 0;
            out.y = 0;
            out.z = 0;
            out.w = 0;
            return out;
        }
        length = 1 / length;
        out.x = x * length;
        out.y = y * length;
        out.z = z * length;
        out.w = w * length;
        return out;
    };
    Quaternion.prototype.add = function (other) {
        for (var i = 0; i < 4; i++) {
            this.values[i] += other.at(i);
        }
        return this;
    };
    /**
     * Multiplies with another {@class Quaternion}
     *
     * @param {Quaternion} other
     * @returns {Quaternion}
     */
    Quaternion.prototype.multiply = function (other) {
        var q1x = this.x, q1y = this.y, q1z = this.z, q1w = this.w;
        var q2x = other.x, q2y = other.y, q2z = other.z, q2w = other.w;
        this.x = q1x * q2w + q1w * q2x + q1y * q2z - q1z * q2y;
        this.y = q1y * q2w + q1w * q2y + q1z * q2x - q1x * q2z;
        this.z = q1z * q2w + q1w * q2z + q1x * q2y - q1y * q2x;
        this.w = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;
        return this;
    };
    Quaternion.prototype.multiplyVector3 = function (vector, out) {
        if (out === void 0) { out = null; }
        if (!out) {
            out = new vector3_1.Vector3();
        }
        var x = vector.x, y = vector.y, z = vector.z;
        var qx = this.x, qy = this.y, qz = this.z, qw = this.w;
        var ix = qw * x + qy * z - qz * y, iy = qw * y + qz * x - qx * z, iz = qw * z + qx * y - qy * x, iw = -qx * x - qy * y - qz * z;
        out.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        out.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        out.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        return out;
    };
    /**
     * Rotates a Quaternion by the given angle about the X axis
     *
     * @param {number} rad
     */
    Quaternion.prototype.rotateX = function (rad) {
        rad *= 0.5;
        var ax = this.x;
        var ay = this.y;
        var az = this.z;
        var aw = this.w;
        var bx = Math.sin(rad);
        var bw = Math.cos(rad);
        this.x = ax * bw + aw * bx;
        this.y = ay * bw + az * bx;
        this.z = az * bw - ay * bx;
        this.w = aw * bw - ax * bx;
        return this;
    };
    /**
     * Rotates a Quaternion by the given angle about the Y axis
     *
     * @param {number} rad angle (in radians) to rotate
     * @returns {Quaternion} out
     */
    Quaternion.prototype.rotateY = function (rad) {
        rad *= 0.5;
        var ax = this.x;
        var ay = this.y;
        var az = this.z;
        var aw = this.w;
        var by = Math.sin(rad);
        var bw = Math.cos(rad);
        this.x = ax * bw - az * by;
        this.y = ay * bw + aw * by;
        this.z = az * bw + ax * by;
        this.w = aw * bw - ay * by;
        return this;
    };
    /**
     * Rotates a Quaternion by the given angle about the Z axis
     *
     * @param {number} rad angle (in radians) to rotate
     * @returns {Quaternion}
     */
    Quaternion.prototype.rotateZ = function (rad) {
        rad *= 0.5;
        var ax = this.x;
        var ay = this.y;
        var az = this.z;
        var aw = this.w;
        var bz = Math.sin(rad);
        var bw = Math.cos(rad);
        this.x = ax * bw + ay * bz;
        this.y = ay * bw - ax * bz;
        this.z = az * bw + aw * bz;
        this.w = aw * bw - az * bz;
        return this;
    };
    /**
     * Calculates the W component of a quat from the X, Y, and Z components.
     * Assumes that Quaternion is 1 unit in length.
     * Any existing W component will be ignored.
     *
     * @returns {Quaternion}
     */
    Quaternion.prototype.calculateW = function (a) {
        var x = this.x;
        var y = this.y;
        var z = this.z;
        this.w = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
        return this;
    };
    Quaternion.prototype.toMatrix3 = function (out) {
        if (out === void 0) { out = null; }
        if (!out) {
            out = new matrix3_1.Matrix3();
        }
        var x = this.x, y = this.y, z = this.z, w = this.w;
        var x2 = x + x, y2 = y + y, z2 = z + z;
        var xx = x * x2, xy = x * y2, xz = x * z2, yy = y * y2, yz = y * z2, zz = z * z2, wx = w * x2, wy = w * y2, wz = w * z2;
        out.init([
            1 - (yy + zz),
            xy + wz,
            xz - wy,
            xy - wz,
            1 - (xx + zz),
            yz + wx,
            xz + wy,
            yz - wx,
            1 - (xx + yy),
        ]);
        return out;
    };
    Quaternion.prototype.toMatrix4 = function (out) {
        if (out === void 0) { out = null; }
        if (!out) {
            out = new matrix4_1.Matrix4();
        }
        var x = this.x, y = this.y, z = this.z, w = this.w, x2 = x + x, y2 = y + y, z2 = z + z, xx = x * x2, xy = x * y2, xz = x * z2, yy = y * y2, yz = y * z2, zz = z * z2, wx = w * x2, wy = w * y2, wz = w * z2;
        out.init([
            1 - (yy + zz),
            xy + wz,
            xz - wy,
            0,
            xy - wz,
            1 - (xx + zz),
            yz + wx,
            0,
            xz + wy,
            yz - wx,
            1 - (xx + yy),
            0,
            0,
            0,
            0,
            1,
        ]);
        return out;
    };
    /**
     * Sets the specified Quaternion with values corresponding to the given
     * axes. Each axis is a Vector3 and is expected to be unit length and
     * perpendicular to all other specified axes.
     *
     * @param {vec3} view  the vector representing the viewing direction
     * @param {vec3} right the vector representing the local "right" direction
     * @param {vec3} up    the vector representing the local "up" direction
     * @returns {quat} out
     */
    Quaternion.prototype.setAxes = function (view, right, up) {
        var matr = new matrix3_1.Matrix3();
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];
        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];
        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];
        return Quaternion.fromMatrix3(matr).normalize();
    };
    /**
     * Sets a quat from the given angle and rotation axis,
     * then returns it.
     *
     * @param {vec3} axis the axis around which to rotate
     * @param {Number} rad the angle in radians
     * @returns {Quaternion}
     */
    Quaternion.prototype.setAxisAngle = function (axis, rad) {
        rad = rad * 0.5;
        var s = Math.sin(rad);
        this.values[0] = s * axis[0];
        this.values[1] = s * axis[1];
        this.values[2] = s * axis[2];
        this.values[3] = Math.cos(rad);
        return this;
    };
    /**
     * Gets the rotation axis and angle for a given
     *  Quaternion. If a Quaternion is created with
     *  setAxisAngle, this method will return the same
     *  values as providied in the original parameter list
     *  OR functionally equivalent values.
     * Example: The Quaternion formed by axis [0, 0, 1] and
     *  angle -90 is the same as the Quaternion formed by
     *  [0, 0, 1] and 270. This method favors the latter.
     * @return {Vector4}
     */
    Quaternion.prototype.getAxisAngle = function () {
        var rad = Math.acos(this.w) * 2.0;
        var s = Math.sin(rad / 2.0);
        if (s !== 0.0) {
            return new vector4_1.Vector4([
                this.x / s,
                this.y / s,
                this.z / s,
                rad,
            ]);
        }
        else {
            // If s is zero, return any axis (no rotation - axis does not matter)
            return new vector4_1.Vector4([
                1, 0, 0, rad,
            ]);
        }
    };
    Quaternion.prototype.clone = function () {
        return this.copy();
    };
    // /**
    //  * Sets a Quaternion to represent the shortest rotation from one
    //  * vector to another.
    //  *
    //  * Both vectors are assumed to be unit length.
    //  *
    //  * @param {quat} out the receiving Quaternion.
    //  * @param {vec3} a the initial vector
    //  * @param {vec3} b the outination vector
    //  * @returns {quat} out
    //  */
    // public static rotationTo(a: Vector3, b: Vector3, out: Quaternion = null) {
    //   if (!out) {
    //     out = new Quaternion();
    //   }
    //
    //   const tmpvec3   = new Vector3();
    //   const xUnitVec3 = new Vector3([1, 0, 0]);
    //   const yUnitVec3 = new Vector3([0, 1, 0]);
    //
    //   const d = Vector3.dot(a, b);
    //   if (d < -0.999999) {
    //     Vector3.cross(xUnitVec3, a, tmpvec3);
    //     if (tmpvec3.length < 0.000001) {
    //       Vector3.cross(yUnitVec3, a, tmpvec3);
    //     }
    //     tmpvec3.normalize();
    //     out.setAxisAngle(tmpvec3, Math.PI);
    //     return out;
    //   } else if (d > 0.999999) {
    //     out[0] = 0;
    //     out[1] = 0;
    //     out[2] = 0;
    //     out[3] = 1;
    //     return out;
    //   } else {
    //     Vector3.cross(a, b, tmpvec3);
    //     out[0] = tmpvec3[0];
    //     out[1] = tmpvec3[1];
    //     out[2] = tmpvec3[2];
    //     out[3] = 1 + d;
    //     return out.normalize();
    //   }
    // }
    Quaternion.sum = function (q1, q2, out) {
        if (out === void 0) { out = null; }
        if (!out) {
            out = new Quaternion();
        }
        out.x = q1.x + q2.x;
        out.y = q1.y + q2.y;
        out.z = q1.z + q2.z;
        out.w = q1.w + q2.w;
        return out;
    };
    Quaternion.product = function (q1, q2, out) {
        if (out === void 0) { out = null; }
        if (!out) {
            out = new Quaternion();
        }
        var q1x = q1.x, q1y = q1.y, q1z = q1.z, q1w = q1.w, q2x = q2.x, q2y = q2.y, q2z = q2.z, q2w = q2.w;
        out.x = q1x * q2w + q1w * q2x + q1y * q2z - q1z * q2y;
        out.y = q1y * q2w + q1w * q2y + q1z * q2x - q1x * q2z;
        out.z = q1z * q2w + q1w * q2z + q1x * q2y - q1y * q2x;
        out.w = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;
        return out;
    };
    Quaternion.cross = function (q1, q2, out) {
        if (out === void 0) { out = null; }
        if (!out) {
            out = new Quaternion();
        }
        var q1x = q1.x, q1y = q1.y, q1z = q1.z, q1w = q1.w, q2x = q2.x, q2y = q2.y, q2z = q2.z, q2w = q2.w;
        out.x = q1w * q2z + q1z * q2w + q1x * q2y - q1y * q2x;
        out.y = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;
        out.z = q1w * q2x + q1x * q2w + q1y * q2z - q1z * q2y;
        out.w = q1w * q2y + q1y * q2w + q1z * q2x - q1x * q2z;
        return out;
    };
    Quaternion.shortMix = function (q1, q2, time, out) {
        if (out === void 0) { out = null; }
        if (!out) {
            out = new Quaternion();
        }
        if (time <= 0.0) {
            out.xyzw = q1.xyzw;
            return out;
        }
        else if (time >= 1.0) {
            out.xyzw = q2.xyzw;
            return out;
        }
        var cos = Quaternion.dot(q1, q2), q2a = q2.copy();
        if (cos < 0.0) {
            q2a.inverse();
            cos = -cos;
        }
        var k0, k1;
        if (cos > 0.9999) {
            k0 = 1 - time;
            k1 = 0 + time;
        }
        else {
            var sin = Math.sqrt(1 - cos * cos);
            var angle = Math.atan2(sin, cos);
            var oneOverSin = 1 / sin;
            k0 = Math.sin((1 - time) * angle) * oneOverSin;
            k1 = Math.sin((0 + time) * angle) * oneOverSin;
        }
        out.x = k0 * q1.x + k1 * q2a.x;
        out.y = k0 * q1.y + k1 * q2a.y;
        out.z = k0 * q1.z + k1 * q2a.z;
        out.w = k0 * q1.w + k1 * q2a.w;
        return out;
    };
    Quaternion.mix = function (q1, q2, time, out) {
        if (out === void 0) { out = null; }
        if (!out) {
            out = new Quaternion();
        }
        var cosHalfTheta = q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;
        if (Math.abs(cosHalfTheta) >= 1.0) {
            out.xyzw = q1.xyzw;
            return out;
        }
        var halfTheta = Math.acos(cosHalfTheta), sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);
        if (Math.abs(sinHalfTheta) < 0.001) {
            out.x = q1.x * 0.5 + q2.x * 0.5;
            out.y = q1.y * 0.5 + q2.y * 0.5;
            out.z = q1.z * 0.5 + q2.z * 0.5;
            out.w = q1.w * 0.5 + q2.w * 0.5;
            return out;
        }
        var ratioA = Math.sin((1 - time) * halfTheta) / sinHalfTheta, ratioB = Math.sin(time * halfTheta) / sinHalfTheta;
        out.x = q1.x * ratioA + q2.x * ratioB;
        out.y = q1.y * ratioA + q2.y * ratioB;
        out.z = q1.z * ratioA + q2.z * ratioB;
        out.w = q1.w * ratioA + q2.w * ratioB;
        return out;
    };
    Quaternion.fromAxis = function (axis, angle, out) {
        if (out === void 0) { out = null; }
        if (!out) {
            out = new Quaternion();
        }
        angle *= 0.5;
        var sin = Math.sin(angle);
        out.x = axis.x * sin;
        out.y = axis.y * sin;
        out.z = axis.z * sin;
        out.w = Math.cos(angle);
        return out;
    };
    Quaternion.dot = function (q1, q2) {
        return q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;
    };
    Quaternion.lerp = function (a, b, t, result) {
        if (result === void 0) { result = null; }
        if (!result) {
            result = new Quaternion();
        }
        var ax = a[0];
        var ay = a[1];
        var az = a[2];
        var aw = a[3];
        result[0] = ax + t * (b[0] - ax);
        result[1] = ay + t * (b[1] - ay);
        result[2] = az + t * (b[2] - az);
        result[3] = aw + t * (b[3] - aw);
        return result;
    };
    /**
     * Performs a spherical linear interpolation between two quat
     *
     * @param {quat} a the first operand
     * @param {quat} b the second operand
     * @param {Number} t interpolation amount between the two inputs
     * @param {quat} out the receiving Quaternion
     * @returns {quat} out
     */
    Quaternion.slerp = function (a, b, t, out) {
        if (out === void 0) { out = null; }
        // benchmarks:
        //    http://jsperf.com/quaternion-slerp-implementations
        if (!out) {
            out = new Quaternion();
        }
        var ax = a[0];
        var ay = a[1];
        var az = a[2];
        var aw = a[3];
        var bx = b[0];
        var by = b[1];
        var bz = b[2];
        var bw = b[3];
        var omega;
        var cosom;
        var sinom;
        var scale0;
        var scale1;
        // calc cosine
        cosom = ax * bx + ay * by + az * bz + aw * bw;
        // adjust signs (if necessary)
        if (cosom < 0.0) {
            cosom = -cosom;
            bx = -bx;
            by = -by;
            bz = -bz;
            bw = -bw;
        }
        // calculate coefficients
        if (1.0 - cosom > 0.000001) {
            // standard case (slerp)
            omega = Math.acos(cosom);
            sinom = Math.sin(omega);
            scale0 = Math.sin((1.0 - t) * omega) / sinom;
            scale1 = Math.sin(t * omega) / sinom;
        }
        else {
            // "from" and "to" quaternions are very close
            //  ... so we can do a linear interpolation
            scale0 = 1.0 - t;
            scale1 = t;
        }
        // calculate final values
        out[0] = scale0 * ax + scale1 * bx;
        out[1] = scale0 * ay + scale1 * by;
        out[2] = scale0 * az + scale1 * bz;
        out[3] = scale0 * aw + scale1 * bw;
        return out;
    };
    /**
     * Performs a spherical linear interpolation with two control points
     *
     * @param {quat} out the receiving Quaternion
     * @param {quat} a the first operand
     * @param {quat} b the second operand
     * @param {quat} c the third operand
     * @param {quat} d the fourth operand
     * @param {Number} t interpolation amount
     * @returns {quat} out
     */
    Quaternion.sqlerp = function (a, b, c, d, t, out) {
        if (out === void 0) { out = null; }
        if (!out) {
            out = new Quaternion();
        }
        var temp1 = new Quaternion();
        var temp2 = new Quaternion();
        Quaternion.slerp(a, d, t, temp1);
        Quaternion.slerp(b, c, t, temp2);
        Quaternion.slerp(temp1, temp2, 2 * t * (1 - t), out);
        return out;
    };
    /**
     * Creates a Quaternion from the given 3x3 rotation matrix.
     *
     * NOTE: The resultant Quaternion is not normalized, so you should be sure
     * to renormalize the Quaternion yourself where necessary.
     *
     * @param {Quaternion} out the receiving Quaternion
     * @param {Matrix3} m rotation matrix
     * @returns {Quaternion} out
     * @function
     */
    Quaternion.fromMatrix3 = function (m, out) {
        if (out === void 0) { out = null; }
        // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
        // article "Quaternion Calculus and Fast Animation".
        if (!out) {
            out = new Quaternion();
        }
        var fTrace = m[0] + m[4] + m[8];
        var fRoot;
        if (fTrace > 0.0) {
            // |w| > 1/2, may as well choose w > 1/2
            fRoot = Math.sqrt(fTrace + 1.0); // 2w
            out[3] = 0.5 * fRoot;
            fRoot = 0.5 / fRoot; // 1/(4w)
            out[0] = (m[5] - m[7]) * fRoot;
            out[1] = (m[6] - m[2]) * fRoot;
            out[2] = (m[1] - m[3]) * fRoot;
        }
        else {
            // |w| <= 1/2
            var i = 0;
            if (m[4] > m[0]) {
                i = 1;
            }
            if (m[8] > m[i * 3 + i]) {
                i = 2;
            }
            var j = (i + 1) % 3;
            var k = (i + 2) % 3;
            fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
            out[i] = 0.5 * fRoot;
            fRoot = 0.5 / fRoot;
            out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
            out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
            out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
        }
        return out;
    };
    return Quaternion;
}());
exports.Quaternion = Quaternion;
//# sourceMappingURL=quaternion.js.map