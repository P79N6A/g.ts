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
var EasingQuad = /** @class */ (function () {
    function EasingQuad() {
    }
    EasingQuad.easeIn = poly_1.PolyIn.create(2);
    EasingQuad.easeOut = poly_1.PolyOut.create(2);
    EasingQuad.easeInOut = poly_1.PolyInOut.create(2);
    return EasingQuad;
}());
exports.EasingQuad = EasingQuad;
//# sourceMappingURL=quad.js.map