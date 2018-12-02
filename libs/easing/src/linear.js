"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var EasingLinear = /** @class */ (function () {
    function EasingLinear() {
    }
    EasingLinear.prototype.getRatio = function (p) {
        return p;
    };
    EasingLinear.easeIn = new EasingLinear;
    EasingLinear.easeOut = EasingLinear.easeIn;
    EasingLinear.easeInOut = EasingLinear.easeIn;
    return EasingLinear;
}());
exports.EasingLinear = EasingLinear;
//# sourceMappingURL=linear.js.map