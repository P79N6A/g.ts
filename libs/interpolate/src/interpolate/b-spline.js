"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
var helper_1 = require("./helper");
var InterpolateBSpline = /** @class */ (function () {
    function InterpolateBSpline() {
    }
    InterpolateBSpline.prototype.interpolate = function (values) {
        this.values = values;
        return this;
    };
    InterpolateBSpline.prototype.getResult = function (t) {
        var values = this.values;
        var n = values.length - 1;
        var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
        return helper_1.bSpline((t - i / n) * n, v0, v1, v2, v3);
    };
    return InterpolateBSpline;
}());
exports.InterpolateBSpline = InterpolateBSpline;
//# sourceMappingURL=b-spline.js.map