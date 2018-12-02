"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2018 Google Inc. (https://github.com/google/vector_math.dart)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
var vector3_1 = require("./vector3");
var Ray = /** @class */ (function () {
    function Ray(_origin, _direction) {
        if (_origin === void 0) { _origin = new vector3_1.Vector3(); }
        if (_direction === void 0) { _direction = new vector3_1.Vector3(); }
        this._origin = _origin;
        this._direction = _direction;
    }
    Object.defineProperty(Ray.prototype, "origin", {
        get: function () {
            return this._origin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ray.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        enumerable: true,
        configurable: true
    });
    Ray.prototype.copyFrom = function (other) {
        this._origin.setFrom(other._origin);
        this._direction.setFrom(other._direction);
    };
    Ray.prototype.at = function (t) {
        this._direction.scaled(t);
        this._direction.add(this._origin);
    };
    Ray.prototype.copyAt = function (other, t) {
        other
            .setFrom(this._direction)
            .scale(t)
            .add(this._origin);
    };
    Ray.copy = function (other) {
        return new Ray(other._origin.clone(), other._direction.clone());
    };
    Ray.originDirection = function (origin, direction) {
        return new Ray(origin.clone(), direction.clone());
    };
    return Ray;
}());
exports.Ray = Ray;
//# sourceMappingURL=ray.js.map