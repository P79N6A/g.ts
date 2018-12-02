"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var b1 = 4 / 11, b2 = 6 / 11, b3 = 8 / 11, b4 = 3 / 4, b5 = 9 / 11, b6 = 10 / 11, b7 = 15 / 16, b8 = 21 / 22, b9 = 63 / 64, b0 = 1 / b1 / b1;
/**
 * @private
 */
var BounceIn = /** @class */ (function () {
    function BounceIn() {
    }
    BounceIn.prototype.getRatio = function (p) {
        if ((p = 1 - p) < b1) {
            return 1 - (b0 * p * p);
        }
        else if (p < b3) {
            return 1 - (b0 * (p -= b2) * p + b4);
        }
        else if (p < b6) {
            return 1 - (b0 * (p -= b5) * p + b7);
        }
        else {
            return 1 - (b0 * (p -= b8) * p + b9);
        }
    };
    return BounceIn;
}());
exports.BounceIn = BounceIn;
/**
 * @private
 */
var BounceOut = /** @class */ (function () {
    function BounceOut() {
    }
    BounceOut.prototype.getRatio = function (p) {
        if (p < b1) {
            return b0 * p * p;
        }
        else if (p < b3) {
            return b0 * (p -= b2) * p + b4;
        }
        else if (p < b6) {
            return b0 * (p -= b5) * p + b7;
        }
        else {
            return b0 * (p -= b8) * p + b9;
        }
    };
    return BounceOut;
}());
exports.BounceOut = BounceOut;
/**
 * @private
 */
var BounceInOut = /** @class */ (function () {
    function BounceInOut() {
    }
    BounceInOut.prototype.getRatio = function (p) {
        var invert;
        if (p < 0.5) {
            invert = true;
            p = 1 - (p * 2);
        }
        else {
            p = (p * 2) - 1;
        }
        if (p < b1) {
            p = b0 * p * p;
        }
        else if (p < b3) {
            p = b0 * (p -= b2) * p + b4;
        }
        else if (p < b6) {
            p = b0 * (p -= b5) * p + b7;
        }
        else {
            p = b0 * (p -= b8) * p + b9;
        }
        return invert ? (1 - p) * 0.5 : p * 0.5 + 0.5;
    };
    return BounceInOut;
}());
exports.BounceInOut = BounceInOut;
var EasingBounce = /** @class */ (function () {
    function EasingBounce() {
    }
    EasingBounce.easeIn = new BounceIn();
    EasingBounce.easeOut = new BounceOut();
    EasingBounce.easeInOut = new BounceInOut();
    return EasingBounce;
}());
exports.EasingBounce = EasingBounce;
//# sourceMappingURL=bounce.js.map