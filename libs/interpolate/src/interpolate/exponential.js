"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var InterpolateExponential = /** @class */ (function () {
    function InterpolateExponential(y) {
        this.y = y;
    }
    InterpolateExponential.prototype.interpolate = function (a, b) {
        this.a = a;
        this.b = b;
        return this;
    };
    InterpolateExponential.prototype.getResult = function (t) {
        var a = Math.pow(this.a, this.y);
        var b = Math.pow(this.b, this.y);
        return Math.pow(a + t * (b - a), 1 / this.y);
    };
    return InterpolateExponential;
}());
exports.InterpolateExponential = InterpolateExponential;
//# sourceMappingURL=exponential.js.map