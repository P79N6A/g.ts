"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Overshoot = 1.70158;
/**
 * @private
 */
var BackIn = /** @class */ (function () {
    function BackIn(overshoot) {
        if (overshoot === void 0) { overshoot = Overshoot; }
        this.overshoot = overshoot;
    }
    BackIn.prototype.getRatio = function (p) {
        return p * p * ((this.overshoot + 1) * p - this.overshoot);
    };
    BackIn.create = function (overshoot) {
        if (overshoot === void 0) { overshoot = Overshoot; }
        return new BackIn(overshoot);
    };
    return BackIn;
}());
exports.BackIn = BackIn;
/**
 * @private
 */
var BackOut = /** @class */ (function () {
    function BackOut(overshoot) {
        if (overshoot === void 0) { overshoot = Overshoot; }
        this.overshoot = overshoot;
    }
    BackOut.prototype.getRatio = function (p) {
        return ((p = p - 1) * p * ((this.overshoot + 1) * p + this.overshoot) + 1);
    };
    BackOut.create = function (overshoot) {
        if (overshoot === void 0) { overshoot = Overshoot; }
        return new BackOut(overshoot);
    };
    return BackOut;
}());
exports.BackOut = BackOut;
/**
 * @private
 */
var BackInOut = /** @class */ (function () {
    function BackInOut(overshoot) {
        if (overshoot === void 0) { overshoot = Overshoot; }
        this.overshoot = overshoot;
    }
    BackInOut.prototype.getRatio = function (p) {
        return ((p *= 2) < 1) ? 0.5 * p * p * ((this.overshoot + 1) * p - this.overshoot) : 0.5 * ((p -= 2) * p * ((this.overshoot + 1) * p + this.overshoot) + 2);
    };
    BackInOut.create = function (overshoot) {
        if (overshoot === void 0) { overshoot = Overshoot; }
        return new BackInOut(overshoot);
    };
    return BackInOut;
}());
exports.BackInOut = BackInOut;
var EasingBack = /** @class */ (function () {
    function EasingBack() {
    }
    EasingBack.easeIn = new BackIn();
    EasingBack.easeOut = new BackOut();
    EasingBack.easeInOut = new BackInOut();
    return EasingBack;
}());
exports.EasingBack = EasingBack;
//# sourceMappingURL=back.js.map