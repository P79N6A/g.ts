"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var linear_1 = require("./linear");
var InterpolateHue = /** @class */ (function () {
    function InterpolateHue() {
    }
    InterpolateHue.prototype.interpolate = function (a, b) {
        this.a = a % 360;
        this.b = b % 360;
        return this;
    };
    InterpolateHue.prototype.getResult = function (t) {
        if (this.b - this.a) {
            return new linear_1.InterpolateLinear()
                .interpolate(this.a, this.b)
                .getResult(t);
        }
        else {
            return isNaN(this.a) ? this.b : this.a;
        }
    };
    return InterpolateHue;
}());
exports.InterpolateHue = InterpolateHue;
//# sourceMappingURL=hue.js.map