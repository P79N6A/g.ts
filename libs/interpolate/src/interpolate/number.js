"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var InterpolateNumber = /** @class */ (function () {
    function InterpolateNumber() {
    }
    InterpolateNumber.prototype.interpolate = function (a, b) {
        this.a = a;
        this.b = b;
        return this;
    };
    InterpolateNumber.prototype.getResult = function (t) {
        return this.a + (this.b - this.a) * t;
    };
    return InterpolateNumber;
}());
exports.InterpolateNumber = InterpolateNumber;
//# sourceMappingURL=number.js.map