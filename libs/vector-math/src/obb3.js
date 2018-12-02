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
var vector_math_1 = require("@gradii/vector-math");
var aabb3_1 = require("./aabb3");
var common_1 = require("./common");
var matrix3_1 = require("./matrix3");
var vector3_1 = require("./vector3");
var Obb3 = /** @class */ (function () {
    function Obb3() {
        if (arguments.length === 5) {
            this._center = arguments[0];
            this._halfExtents = arguments[1];
            this._axis0 = arguments[2];
            this._axis1 = arguments[3];
            this._axis2 = arguments[4];
        }
        else {
            this._center = vector3_1.Vector3.zero();
            this._halfExtents = vector3_1.Vector3.zero();
            this._axis0 = new vector3_1.Vector3(1, 0, 0);
            this._axis1 = new vector3_1.Vector3(0, 1, 0);
            this._axis2 = new vector3_1.Vector3(0, 0, 1);
        }
    }
    Object.defineProperty(Obb3.prototype, "center", {
        get: function () {
            return this._center;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Obb3.prototype, "halfExtents", {
        get: function () {
            return this._halfExtents;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Obb3.prototype, "axis0", {
        get: function () {
            return this._axis0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Obb3.prototype, "axis1", {
        get: function () {
            return this._axis1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Obb3.prototype, "axis2", {
        get: function () {
            return this._axis2;
        },
        enumerable: true,
        configurable: true
    });
    Obb3.prototype.copyFrom = function (other) {
        this._center.setFrom(other._center);
        this._halfExtents.setFrom(other._halfExtents);
        this._axis0.setFrom(other._axis0);
        this._axis1.setFrom(other._axis1);
        this._axis2.setFrom(other._axis2);
        return this;
    };
    Obb3.prototype.copy = function (other) {
        if (!other) {
            return new Obb3(this._center, this._halfExtents, this._axis0, this._axis1, this._axis2);
        }
        other._center.setFrom(this._center);
        other._halfExtents.setFrom(this._halfExtents);
        other._axis0.setFrom(this._axis0);
        other._axis1.setFrom(this._axis1);
        other._axis2.setFrom(this._axis2);
        return other;
    };
    Obb3.prototype.resetRotation = function () {
        this._axis0.setValues(1.0, 0.0, 0.0);
        this._axis1.setValues(0.0, 1.0, 0.0);
        this._axis2.setValues(0.0, 0.0, 1.0);
        return this;
    };
    Obb3.prototype.translate = function (offset) {
        this._center.add(offset);
        return this;
    };
    Obb3.prototype.rotate = function (m) {
        m.transformVector3(this._axis0.scale(this._halfExtents.x)).normalize();
        m.transformVector3(this._axis1.scale(this._halfExtents.y)).normalize();
        m.transformVector3(this._axis2.scale(this._halfExtents.z)).normalize();
        this._halfExtents.setValues(this._axis0.length, this._axis1.length, this._axis2.length);
        return this;
    };
    Obb3.prototype.transform = function (m) {
        m.transform3(this._center);
        m.rotate3(this._axis0.scale(this._halfExtents.x)).normalize();
        m.rotate3(this._axis1.scale(this._halfExtents.y)).normalize();
        m.rotate3(this._axis2.scale(this._halfExtents.z)).normalize();
        this._halfExtents.setValues(this._axis0.length, this._axis1.length, this._axis2.length);
        return this;
    };
    Obb3.prototype.copyCorner = function (cornerIndex, corner) {
        corner.setFrom(this._center);
        switch (cornerIndex) {
            case 0:
                corner.addScaled(this._axis0, -this._halfExtents.x);
                corner.addScaled(this._axis1, -this._halfExtents.y);
                corner.addScaled(this._axis2, -this._halfExtents.z);
                break;
            case 1:
                corner.addScaled(this._axis0, -this._halfExtents.x);
                corner.addScaled(this._axis1, -this._halfExtents.y);
                corner.addScaled(this._axis2, this._halfExtents.z);
                break;
            case 2:
                corner.addScaled(this._axis0, -this._halfExtents.x);
                corner.addScaled(this._axis1, this._halfExtents.y);
                corner.addScaled(this._axis2, -this._halfExtents.z);
                break;
            case 3:
                corner.addScaled(this._axis0, -this._halfExtents.x);
                corner.addScaled(this._axis1, this._halfExtents.y);
                corner.addScaled(this._axis2, this._halfExtents.z);
                break;
            case 4:
                corner.addScaled(this._axis0, this._halfExtents.x);
                corner.addScaled(this._axis1, -this._halfExtents.y);
                corner.addScaled(this._axis2, -this._halfExtents.z);
                break;
            case 5:
                corner.addScaled(this._axis0, this._halfExtents.x);
                corner.addScaled(this._axis1, -this._halfExtents.y);
                corner.addScaled(this._axis2, this._halfExtents.z);
                break;
            case 6:
                corner.addScaled(this._axis0, this._halfExtents.x);
                corner.addScaled(this._axis1, this._halfExtents.y);
                corner.addScaled(this._axis2, -this._halfExtents.z);
                break;
            case 7:
                corner.addScaled(this._axis0, this._halfExtents.x);
                corner.addScaled(this._axis1, this._halfExtents.y);
                corner.addScaled(this._axis2, this._halfExtents.z);
                break;
        }
    };
    Obb3.prototype.closestPointTo = function (p, q) {
        var d = p.clone().sub(this._center);
        q.setFrom(this._center);
        var dist;
        dist = vector3_1.Vector3.dot(d, this._axis0);
        dist = common_1.clamp(dist, -this._halfExtents.x, this._halfExtents.x);
        q.addScaled(this._axis0, dist);
        dist = vector3_1.Vector3.dot(d, this._axis1);
        dist = common_1.clamp(dist, -this._halfExtents.y, this._halfExtents.y);
        q.addScaled(this._axis1, dist);
        dist = vector3_1.Vector3.dot(d, this._axis2);
        dist = common_1.clamp(dist, -this._halfExtents.z, this._halfExtents.z);
        q.addScaled(this._axis2, dist);
        return this;
    };
    Obb3.prototype.intersectsWithObb3 = function (other, epsilon) {
        if (epsilon === void 0) { epsilon = common_1.EPSILON; }
        Obb3._r.setValues(this._axis0.dot(other._axis0), this._axis0.dot(other._axis1), this._axis0.dot(other._axis2), this._axis1.dot(other._axis0), this._axis1.dot(other._axis1), this._axis1.dot(other._axis2), this._axis2.dot(other._axis0), this._axis2.dot(other._axis1), this._axis2.dot(other._axis2));
        Obb3._t
            .setFrom(other._center)
            .sub(this._center);
        Obb3._t
            .setValues(Obb3._t.dot(this._axis0), Obb3._t.dot(this._axis1), Obb3._t.dot(this._axis2));
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                Obb3._absR.setEntry(i, j, Math.abs(Obb3._r.entry(i, j)) + epsilon);
            }
        }
        var ra, rb;
        // Test axes L = A0, L = A1, L = A2
        for (var i = 0; i < 3; i++) {
            ra = this._halfExtents[i];
            rb = other._halfExtents[0] * Obb3._absR.entry(i, 0) +
                other._halfExtents[1] * Obb3._absR.entry(i, 1) +
                other._halfExtents[2] * Obb3._absR.entry(i, 2);
            if (Obb3._t[i].abs() > ra + rb) {
                return false;
            }
        }
        // Test axes L = B0, L = B1, L = B2
        for (var i = 0; i < 3; i++) {
            ra = this._halfExtents[0] * Obb3._absR.entry(0, i) +
                this._halfExtents[1] * Obb3._absR.entry(1, i) +
                this._halfExtents[2] * Obb3._absR.entry(2, i);
            rb = other._halfExtents[i];
            if (Math.abs(Obb3._t[0] * Obb3._r.entry(0, i) +
                Obb3._t[1] * Obb3._r.entry(1, i) +
                Obb3._t[2] * Obb3._r.entry(2, i)) >
                ra + rb) {
                return false;
            }
        }
        // Test axis L = A0 x B0
        ra = this._halfExtents[1] * Obb3._absR.entry(2, 0) +
            this._halfExtents[2] * Obb3._absR.entry(1, 0);
        rb = other._halfExtents[1] * Obb3._absR.entry(0, 2) +
            other._halfExtents[2] * Obb3._absR.entry(0, 1);
        if (Math.abs(Obb3._t[2] * Obb3._r.entry(1, 0) - Obb3._t[1] * Obb3._r.entry(2, 0)) > ra + rb) {
            return false;
        }
        // Test axis L = A0 x B1
        ra = this._halfExtents[1] * Obb3._absR.entry(2, 1) +
            this._halfExtents[2] * Obb3._absR.entry(1, 1);
        rb = other._halfExtents[0] * Obb3._absR.entry(0, 2) +
            other._halfExtents[2] * Obb3._absR.entry(0, 0);
        if (Math.abs(Obb3._t[2] * Obb3._r.entry(1, 1) - Obb3._t[1] * Obb3._r.entry(2, 1)) > ra + rb) {
            return false;
        }
        // Test axis L = A0 x B2
        ra = this._halfExtents[1] * Obb3._absR.entry(2, 2) +
            this._halfExtents[2] * Obb3._absR.entry(1, 2);
        rb = other._halfExtents[0] * Obb3._absR.entry(0, 1) +
            other._halfExtents[1] * Obb3._absR.entry(0, 0);
        if (Math.abs(Obb3._t[2] * Obb3._r.entry(1, 2) - Obb3._t[1] * Obb3._r.entry(2, 2)) > ra + rb) {
            return false;
        }
        // Test axis L = A1 x B0
        ra = this._halfExtents[0] * Obb3._absR.entry(2, 0) +
            this._halfExtents[2] * Obb3._absR.entry(0, 0);
        rb = other._halfExtents[1] * Obb3._absR.entry(1, 2) +
            other._halfExtents[2] * Obb3._absR.entry(1, 1);
        if (Math.abs(Obb3._t[0] * Obb3._r.entry(2, 0) - Obb3._t[2] * Obb3._r.entry(0, 0)) > ra + rb) {
            return false;
        }
        // Test axis L = A1 x B1
        ra = this._halfExtents[0] * Obb3._absR.entry(2, 1) +
            this._halfExtents[2] * Obb3._absR.entry(0, 1);
        rb = other._halfExtents[0] * Obb3._absR.entry(1, 2) +
            other._halfExtents[2] * Obb3._absR.entry(1, 0);
        if (Math.abs(Obb3._t[0] * Obb3._r.entry(2, 1) - Obb3._t[2] * Obb3._r.entry(0, 1)) > ra + rb) {
            return false;
        }
        // Test axis L = A1 x B2
        ra = this._halfExtents[0] * Obb3._absR.entry(2, 2) +
            this._halfExtents[2] * Obb3._absR.entry(0, 2);
        rb = other._halfExtents[0] * Obb3._absR.entry(1, 1) +
            other._halfExtents[1] * Obb3._absR.entry(1, 0);
        if (Math.abs(Obb3._t[0] * Obb3._r.entry(2, 2) - Obb3._t[2] * Obb3._r.entry(0, 2)) > ra + rb) {
            return false;
        }
        // Test axis L = A2 x B0
        ra = this._halfExtents[0] * Obb3._absR.entry(1, 0) +
            this._halfExtents[1] * Obb3._absR.entry(0, 0);
        rb = other._halfExtents[1] * Obb3._absR.entry(2, 2) +
            other._halfExtents[2] * Obb3._absR.entry(2, 1);
        if (Math.abs(Obb3._t[1] * Obb3._r.entry(0, 0) - Obb3._t[0] * Obb3._r.entry(1, 0)) > ra + rb) {
            return false;
        }
        // Test axis L = A2 x B1
        ra = this._halfExtents[0] * Obb3._absR.entry(1, 1) +
            this._halfExtents[1] * Obb3._absR.entry(0, 1);
        rb = other._halfExtents[0] * Obb3._absR.entry(2, 2) +
            other._halfExtents[2] * Obb3._absR.entry(2, 0);
        if (Math.abs(Obb3._t[1] * Obb3._r.entry(0, 1) - Obb3._t[0] * Obb3._r.entry(1, 1)) > ra + rb) {
            return false;
        }
        // Test axis L = A2 x B2
        ra = this._halfExtents[0] * Obb3._absR.entry(1, 2) +
            this._halfExtents[1] * Obb3._absR.entry(0, 2);
        rb = other._halfExtents[0] * Obb3._absR.entry(2, 1) +
            other._halfExtents[1] * Obb3._absR.entry(2, 0);
        if (Math.abs(Obb3._t[1] * Obb3._r.entry(0, 2) - Obb3._t[0] * Obb3._r.entry(1, 2)) > ra + rb) {
            return false;
        }
        // Since no separating axis is found, the OBBs must be intersecting
        return true;
    };
    Obb3.prototype.intersectsWithVector3 = function (other) {
        Obb3._vector.setFrom(other)
            .sub(this._center)
            .setValues(Obb3._vector.dot(this._axis0), Obb3._vector.dot(this._axis1), Obb3._vector.dot(this._axis2));
        Obb3._aabb3.setCenterAndHalfExtents(Obb3._zeroVector, this._halfExtents);
        return Obb3._aabb3.intersectsWithVector3(Obb3._vector);
    };
    Obb3._r = new matrix3_1.Matrix3(); // tslint:disable-line
    Obb3._absR = new matrix3_1.Matrix3(); // tslint:disable-line
    Obb3._t = new vector3_1.Vector3(); // tslint:disable-line
    Obb3._triangle = new vector_math_1.Triangle(); //tslint:disable-line
    Obb3._aabb3 = new aabb3_1.Aabb3(); //tslint:disable-line
    Obb3._zeroVector = vector3_1.Vector3.zero(); //tslint:disable-line
    // public intersectsWithTriangle(other: Triangle, result: IntersectionResult) {
    //   Obb3._triangle.copyFrom(other);
    //
    //   Obb3._triangle.point0
    //     .sub(this._center)
    //     .setValues(
    //       Obb3._triangle.point0.dot(this._axis0),
    //       Obb3._triangle.point0.dot(this._axis1),
    //       Obb3._triangle.point0.dot(this._axis2)
    //     );
    //
    //   Obb3._triangle.point1
    //     .sub(this._center)
    //     .setValues(
    //       Obb3._triangle.point1.dot(this._axis0),
    //       Obb3._triangle.point1.dot(this._axis1),
    //       Obb3._triangle.point1.dot(this._axis2)
    //     );
    //
    //   Obb3._triangle.point2
    //     .sub(this._center)
    //     .setValues(
    //       Obb3._triangle.point2.dot(this._axis0),
    //       Obb3._triangle.point2.dot(this._axis1),
    //       Obb3._triangle.point2.dot(this._axis2)
    //     );
    //
    //   Obb3._aabb3.setCenterAndHalfExtents(Obb3._zeroVector, this._halfExtents);
    //
    //   return Obb3._aabb3.intersectsWithTriangle(Obb3._triangle, result);
    // }
    Obb3._vector = new vector3_1.Vector3(); //tslint:disable-line
    return Obb3;
}());
exports.Obb3 = Obb3;
//# sourceMappingURL=obb3.js.map