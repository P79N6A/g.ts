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
var vector2_1 = require("./vector2");
var Aabb2 = /** @class */ (function () {
    function Aabb2() {
        if (arguments.length === 2) {
            this._min = arguments[0];
            this._max = arguments[1];
        }
        else {
            this._min = new vector2_1.Vector2();
            this._max = new vector2_1.Vector2();
        }
    }
    Object.defineProperty(Aabb2.prototype, "min", {
        get: function () {
            return this._min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Aabb2.prototype, "max", {
        get: function () {
            return this._max;
        },
        enumerable: true,
        configurable: true
    });
    Aabb2.prototype.setCenterAndHalfExtents = function (center, halfExtents) {
        this._min
            .setFrom(center)
            .subtract(halfExtents);
        this._max
            .setFrom(center)
            .subtract(halfExtents);
    };
    Aabb2.prototype.copyCenterAndHalfExtents = function (center, halfExtents) {
        center
            .setFrom(this._min)
            .add(this._max)
            .scale(0.5);
        halfExtents
            .setFrom(this._max)
            .sub(this._min)
            .scale(0.5);
    };
    Aabb2.prototype.copy = function (out) {
        if (!out) {
            out = new Aabb2();
        }
        out.copyFrom(this);
        return out;
    };
    Aabb2.prototype.copyFrom = function (other) {
        this._min.setFrom(other._min);
        this._max.setFrom(other._max);
        return this;
    };
    Aabb2.prototype.transform = function (m) {
        var center = new vector2_1.Vector2();
        var halfExtents = new vector2_1.Vector2();
        this.copyCenterAndHalfExtents(center, halfExtents);
        m.transformVector2(center);
        m.absoluteRotate2(halfExtents);
        this._min
            .setFrom(center)
            .sub(halfExtents);
        this._max
            .setFrom(center)
            .add(halfExtents);
        return this;
    };
    Aabb2.prototype.transformed = function (m, out) {
        if (!out) {
            out = new Aabb2();
        }
        out.copyFrom(this)
            .transform(m);
        return out;
    };
    Aabb2.prototype.rotate = function (m) {
        var center = new vector2_1.Vector2();
        var halfExtents = new vector2_1.Vector2();
        this.copyCenterAndHalfExtents(center, halfExtents);
        m.absoluteRotate2(halfExtents);
        this._min
            .setFrom(center)
            .sub(halfExtents);
        this._max
            .setFrom(center)
            .add(halfExtents);
        return this;
    };
    Aabb2.prototype.rotated = function (m) {
        return this.clone()
            .rotate(m);
    };
    Aabb2.prototype.hull = function (other) {
        vector2_1.Vector2.min(this._min, other._min, this._min);
        vector2_1.Vector2.max(this._max, other._max, this._max);
    };
    Aabb2.prototype.hullPoint = function (point) {
        vector2_1.Vector2.min(this._min, point, this._min);
        vector2_1.Vector2.max(this._max, point, this._max);
    };
    Aabb2.prototype.containsAabb2 = function (other) {
        var otherMin = other._min;
        var otherMax = other._max;
        return (this._min.x < otherMin.x) &&
            (this._min.y < otherMin.y) &&
            (this._max.x > otherMax.x) &&
            (this._max.y > otherMax.y);
    };
    Aabb2.prototype.containsVector2 = function (other) {
        return (this._min.x < other.x) &&
            (this._min.y < other.y) &&
            (this._max.x > other.x) &&
            (this._max.y > other.y);
    };
    Aabb2.prototype.intersectsWithAabb2 = function (other) {
        var otherMin = other._min;
        var otherMax = other._max;
        return (this._min.x <= otherMax.x) &&
            (this._min.y <= otherMax.y) &&
            (this._max.x >= otherMin.x) &&
            (this._max.y >= otherMin.y);
    };
    Aabb2.prototype.intersectsWithVector2 = function (other) {
        return (this._min.x <= other.x) &&
            (this._min.y <= other.y) &&
            (this._max.x >= other.x) &&
            (this._max.y >= other.y);
    };
    Aabb2.prototype.clone = function () {
        return this.copy();
    };
    Aabb2.minMax = function (min, max) {
        return new Aabb2(min, max);
    };
    return Aabb2;
}());
exports.Aabb2 = Aabb2;
//# sourceMappingURL=aabb2.js.map