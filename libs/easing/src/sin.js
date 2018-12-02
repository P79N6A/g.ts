"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var _HALF_PI = Math.PI / 2;
/**
 * @private
 */
var SinIn = /** @class */ (function () {
    function SinIn() {
    }
    SinIn.prototype.getRatio = function (p) {
        return -Math.cos(p * _HALF_PI) + 1;
    };
    return SinIn;
}());
exports.SinIn = SinIn;
/**
 * @private
 */
var SinOut = /** @class */ (function () {
    function SinOut() {
    }
    SinOut.prototype.getRatio = function (p) {
        return Math.sin(p * _HALF_PI);
    };
    return SinOut;
}());
exports.SinOut = SinOut;
/**
 * @private
 */
var SinInOut = /** @class */ (function () {
    function SinInOut() {
    }
    SinInOut.prototype.getRatio = function (p) {
        return -0.5 * (Math.cos(Math.PI * p) - 1);
    };
    return SinInOut;
}());
exports.SinInOut = SinInOut;
var EasingSin = /** @class */ (function () {
    function EasingSin() {
    }
    EasingSin.easeIn = new SinIn();
    EasingSin.easeOut = new SinOut();
    EasingSin.easeInOut = new SinInOut();
    return EasingSin;
}());
exports.EasingSin = EasingSin;
//# sourceMappingURL=sin.js.map