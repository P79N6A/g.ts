"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var InterpolatePiecewise = /** @class */ (function () {
    function InterpolatePiecewise(interpolator) {
        this.interpolator = interpolator;
    }
    InterpolatePiecewise.prototype.interpolate = function (values) {
        this.values = values;
        var i = 0, n = values.length - 1, v = values[0];
        this.I = new Array(n < 0 ? 0 : n);
        while (i < n) {
            this.I[i] = this.interpolator(v, v = values[++i]);
        }
        return this;
    };
    InterpolatePiecewise.prototype.getResult = function (t) {
        var n = this.values.length - 1;
        var i = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
        return this.I[i](t - i);
    };
    return InterpolatePiecewise;
}());
exports.InterpolatePiecewise = InterpolatePiecewise;
//# sourceMappingURL=piecewise.js.map