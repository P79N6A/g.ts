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
var EasingQuart = /** @class */ (function () {
    function EasingQuart() {
    }
    EasingQuart.easeIn = poly_1.PolyIn.create(4);
    EasingQuart.easeOut = poly_1.PolyOut.create(4);
    EasingQuart.easeInOut = poly_1.PolyInOut.create(4);
    return EasingQuart;
}());
exports.EasingQuart = EasingQuart;
//# sourceMappingURL=quart.js.map