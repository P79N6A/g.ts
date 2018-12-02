"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var interpolate_value_1 = require("../wrapper/interpolate-value");
var InterpolateObject = /** @class */ (function () {
    function InterpolateObject() {
        this.c = {};
        this.i = {};
    }
    InterpolateObject.prototype.interpolate = function (a, b) {
        if (a === null || typeof a !== 'object') {
            a = {};
        }
        if (b === null || typeof b !== 'object') {
            b = {};
        }
        for (var k in b) {
            if (k in a) {
                this.i[k] = interpolate_value_1.interpolateValue(a[k], b[k]);
            }
            else {
                this.c[k] = b[k];
            }
        }
        return this;
    };
    InterpolateObject.prototype.getResult = function (t) {
        for (var _i = 0, _a = Object.entries(this.i); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], val = _b[1];
            this.c[key] = val(t);
        }
        ;
        return this.c;
    };
    return InterpolateObject;
}());
exports.InterpolateObject = InterpolateObject;
//# sourceMappingURL=object.js.map