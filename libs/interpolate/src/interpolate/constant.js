"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var InterpolateConstant = /** @class */ (function () {
    function InterpolateConstant(x) {
        this.x = x;
    }
    InterpolateConstant.prototype.interpolate = function (x) {
        this.x = x;
        return this;
    };
    InterpolateConstant.prototype.getResult = function (t) {
        return this.x;
    };
    return InterpolateConstant;
}());
exports.InterpolateConstant = InterpolateConstant;
//# sourceMappingURL=constant.js.map