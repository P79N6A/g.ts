"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("./helper");
var InterpolateBSplineClosed = /** @class */ (function () {
    function InterpolateBSplineClosed() {
    }
    InterpolateBSplineClosed.prototype.interpolate = function (values) {
        this.values = values;
        return this;
    };
    InterpolateBSplineClosed.prototype.getResult = function (t) {
        var values = this.values;
        var n = values.length;
        var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
        return helper_1.bSpline((t - i / n) * n, v0, v1, v2, v3);
    };
    return InterpolateBSplineClosed;
}());
exports.InterpolateBSplineClosed = InterpolateBSplineClosed;
//# sourceMappingURL=b-spline-closed.js.map