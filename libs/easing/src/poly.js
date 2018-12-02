"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Exponent = 3;
/**
 * @private
 */
var PolyIn = /** @class */ (function () {
    function PolyIn(exponent) {
        if (exponent === void 0) { exponent = Exponent; }
        this.exponent = exponent;
    }
    PolyIn.prototype.getRatio = function (p) {
        return Math.pow(p, this.exponent);
    };
    PolyIn.create = function (exponent) {
        return new PolyIn(exponent);
    };
    return PolyIn;
}());
exports.PolyIn = PolyIn;
/**
 * @private
 */
var PolyOut = /** @class */ (function () {
    function PolyOut(exponent) {
        if (exponent === void 0) { exponent = Exponent; }
        this.exponent = exponent;
    }
    PolyOut.prototype.getRatio = function (p) {
        return 1 - Math.pow(1 - p, this.exponent);
    };
    PolyOut.create = function (exponent) {
        return new PolyOut(exponent);
    };
    return PolyOut;
}());
exports.PolyOut = PolyOut;
/**
 * @private
 */
var PolyInOut = /** @class */ (function () {
    function PolyInOut(exponent) {
        if (exponent === void 0) { exponent = Exponent; }
        this.exponent = exponent;
    }
    PolyInOut.prototype.getRatio = function (p) {
        if ((p *= 2) <= 1) {
            return Math.pow(p, this.exponent) / 2;
        }
        else {
            return (2 - Math.pow(2 - p, this.exponent)) / 2;
        }
    };
    PolyInOut.create = function (exponent) {
        return new PolyInOut(exponent);
    };
    return PolyInOut;
}());
exports.PolyInOut = PolyInOut;
var EasingPoly = /** @class */ (function () {
    function EasingPoly() {
    }
    EasingPoly.easeIn = new PolyIn();
    EasingPoly.easeOut = new PolyOut();
    EasingPoly.easeInOut = new PolyInOut();
    return EasingPoly;
}());
exports.EasingPoly = EasingPoly;
//# sourceMappingURL=poly.js.map