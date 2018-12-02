"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
var vector3_1 = require("./vector3");
var Plane = /** @class */ (function () {
    function Plane() {
        if (arguments.length === 1 && arguments[0] instanceof Plane) {
            this._normal = arguments[0]._normal.clone();
            this._constant = arguments[0]._constant;
        }
        else if (arguments.length === 4) {
            this._normal = new vector3_1.Vector3(arguments[0], arguments[1], arguments[2]);
            this._constant = arguments[3];
        }
        else if (arguments.length === 2) {
            this._normal = arguments[0].clone();
            this._constant = arguments[1];
        }
        else {
            this._normal = new vector3_1.Vector3();
            this._constant = 0;
        }
    }
    Object.defineProperty(Plane.prototype, "normal", {
        get: function () {
            return this._normal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Plane.prototype, "constant", {
        get: function () {
            return this._constant;
        },
        set: function (value) {
            this._constant = value;
        },
        enumerable: true,
        configurable: true
    });
    Plane.prototype.normalize = function () {
        var inverseLength = 1 / this._normal.length;
        this._normal.scale(inverseLength);
        this._constant *= inverseLength;
    };
    Plane.prototype.distanceToVector3 = function (point) {
        return this._normal.dot(point) + this._constant;
    };
    return Plane;
}());
exports.Plane = Plane;
//# sourceMappingURL=plane.js.map