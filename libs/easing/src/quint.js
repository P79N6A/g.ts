"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var poly_1 = require("./poly");
var EasingQuint = /** @class */ (function () {
    function EasingQuint() {
    }
    EasingQuint.easeIn = poly_1.PolyIn.create(5);
    EasingQuint.easeOut = poly_1.PolyOut.create(5);
    EasingQuint.easeInOut = poly_1.PolyInOut.create(5);
    return EasingQuint;
}());
exports.EasingQuint = EasingQuint;
//# sourceMappingURL=quint.js.map