"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @private
 */
var CircleIn = /** @class */ (function () {
    function CircleIn() {
    }
    CircleIn.prototype.getRatio = function (p) {
        return -(Math.sqrt(1 - p * p) - 1);
    };
    return CircleIn;
}());
exports.CircleIn = CircleIn;
/**
 * @private
 */
var CircleOut = /** @class */ (function () {
    function CircleOut() {
    }
    CircleOut.prototype.getRatio = function (p) {
        return Math.sqrt(1 - (p -= 1) * p);
    };
    return CircleOut;
}());
exports.CircleOut = CircleOut;
/**
 * @private
 */
var CircleInOut = /** @class */ (function () {
    function CircleInOut() {
    }
    CircleInOut.prototype.getRatio = function (p) {
        if ((p *= 2) <= 1) {
            return (-(Math.sqrt(1 - p * p) - 1)) / 2;
        }
        else {
            return (Math.sqrt(1 - (p -= 2) * p) + 1) / 2;
        }
    };
    return CircleInOut;
}());
exports.CircleInOut = CircleInOut;
var EasingCircle = /** @class */ (function () {
    function EasingCircle() {
    }
    EasingCircle.easeIn = new CircleIn();
    EasingCircle.easeOut = new CircleOut();
    EasingCircle.easeInOut = new CircleInOut();
    return EasingCircle;
}());
exports.EasingCircle = EasingCircle;
//# sourceMappingURL=circle.js.map