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
var EasingCubic = /** @class */ (function () {
    function EasingCubic() {
    }
    EasingCubic.easeIn = poly_1.PolyIn.create(3);
    EasingCubic.easeOut = poly_1.PolyOut.create(3);
    EasingCubic.easeInOut = poly_1.PolyInOut.create(3);
    return EasingCubic;
}());
exports.EasingCubic = EasingCubic;
//# sourceMappingURL=cubic.js.map