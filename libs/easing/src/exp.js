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
var ExpIn = /** @class */ (function () {
    function ExpIn() {
    }
    ExpIn.prototype.getRatio = function (p) {
        return p === 0.0 ? p : Math.pow(2.0, 10.0 * (p - 1.0));
    };
    return ExpIn;
}());
exports.ExpIn = ExpIn;
/**
 * @private
 */
var ExpOut = /** @class */ (function () {
    function ExpOut() {
    }
    ExpOut.prototype.getRatio = function (p) {
        return p === 1.0 ? 1 : 1 - Math.pow(2, -10 * p);
    };
    return ExpOut;
}());
exports.ExpOut = ExpOut;
/**
 * @private
 */
var ExpInOut = /** @class */ (function () {
    function ExpInOut() {
    }
    ExpInOut.prototype.getRatio = function (p) {
        return (p === 0.0 || p === 1.0)
            ? p
            : ((p *= 2) < 1)
                ? 0.5 * Math.pow(2, 10 * (p - 1))
                : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
    };
    return ExpInOut;
}());
exports.ExpInOut = ExpInOut;
var EasingExp = /** @class */ (function () {
    function EasingExp() {
    }
    EasingExp.easeIn = new ExpIn();
    EasingExp.easeOut = new ExpOut();
    EasingExp.easeInOut = new ExpInOut();
    return EasingExp;
}());
exports.EasingExp = EasingExp;
//# sourceMappingURL=exp.js.map