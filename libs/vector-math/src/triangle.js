"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var vector3_1 = require("./vector3");
var Triangle = /** @class */ (function () {
    function Triangle() {
        if (arguments.length === 3) {
            this._point0 = arguments[0].clone();
            this._point1 = arguments[1].clone();
            this._point2 = arguments[2].clone();
        }
        else if (arguments.length === 1) {
            this._point0 = arguments[0].point0;
            this._point1 = arguments[1].point1;
            this._point2 = arguments[1].point2;
        }
        else {
            this._point0 = vector3_1.Vector3.zero();
            this._point1 = vector3_1.Vector3.zero();
            this._point2 = vector3_1.Vector3.zero();
        }
    }
    Object.defineProperty(Triangle.prototype, "point0", {
        get: function () {
            return this._point0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Triangle.prototype, "point1", {
        get: function () {
            return this._point1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Triangle.prototype, "point2", {
        get: function () {
            return this._point2;
        },
        enumerable: true,
        configurable: true
    });
    Triangle.prototype.copyNormalInto = function (normal) {
        var v0 = this._point0.clone().sub(this._point1);
        normal
            .setFrom(this._point2)
            .sub(this._point1)
            .cross(v0)
            .normalize();
        return normal;
    };
    Triangle.prototype.transform = function (t) {
        t.transform3(this._point0);
        t.transform3(this._point1);
        t.transform3(this._point2);
        return this;
    };
    Triangle.prototype.translate = function (offset) {
        this._point0.add(offset);
        this._point1.add(offset);
        this._point2.add(offset);
        return this;
    };
    return Triangle;
}());
exports.Triangle = Triangle;
//# sourceMappingURL=triangle.js.map