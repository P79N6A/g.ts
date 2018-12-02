"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var InterpolateDate = /** @class */ (function () {
    function InterpolateDate() {
    }
    InterpolateDate.prototype.interpolate = function (a, b) {
        this.a = a;
        this.b = b;
        return this;
    };
    InterpolateDate.prototype.getResult = function (t) {
        var d = new Date;
        d.setTime(+this.a + (this.b - this.a) * t);
        return d;
    };
    return InterpolateDate;
}());
exports.InterpolateDate = InterpolateDate;
//# sourceMappingURL=date.js.map