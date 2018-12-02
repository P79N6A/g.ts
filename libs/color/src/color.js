"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Color = /** @class */ (function () {
    function Color() {
    }
    Color.prototype.displayable = function () {
        return this.rgb().displayable();
    };
    Color.prototype.hex = function () {
        return this.rgb().hex();
    };
    Color.prototype.toString = function () {
        return this.rgb() + '';
    };
    return Color;
}());
exports.Color = Color;
//# sourceMappingURL=color.js.map