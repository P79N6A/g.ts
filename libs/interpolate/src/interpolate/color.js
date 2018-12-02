"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var exponential_1 = require("./exponential");
var linear_1 = require("./linear");
var InterpolateColor = /** @class */ (function () {
    function InterpolateColor(gamma) {
        if (gamma === void 0) { gamma = 1; }
        this.gamma = gamma;
    }
    InterpolateColor.prototype.interpolate = function (a, b) {
        this.a = a;
        this.b = b;
        return this;
    };
    InterpolateColor.prototype.getResult = function (t) {
        if (this.gamma === 1) {
            if (this.b - this.a) {
                return new linear_1.InterpolateLinear()
                    .interpolate(this.a, this.b)
                    .getResult(t);
            }
            else {
                return isNaN(this.a) ? this.b : this.a;
            }
        }
        else {
            if (this.b - this.a) {
                return new exponential_1.InterpolateExponential(this.gamma)
                    .interpolate(this.a, this.b)
                    .getResult(t);
            }
            else {
                return isNaN(this.a) ? this.b : this.a;
            }
        }
    };
    return InterpolateColor;
}());
exports.InterpolateColor = InterpolateColor;
//# sourceMappingURL=color.js.map