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
var InterpolateArray = /** @class */ (function () {
    function InterpolateArray() {
    }
    InterpolateArray.prototype._init = function () {
        var nb = this.b ? this.b.length : 0;
        var na = this.a ? Math.min(nb, this.a.length) : 0;
        var x = new Array(na);
        var c = new Array(nb);
        var i;
        for (i = 0; i < na; ++i) {
            x[i] = interpolate_value_1.interpolateValue(this.a[i], this.b[i]);
        }
        for (; i < nb; ++i) {
            c[i] = this.b[i];
        }
        this._x = x;
        this._c = c;
    };
    InterpolateArray.prototype.interpolate = function (a, b) {
        this.a = a;
        this.b = b;
        this._init();
        return this;
    };
    InterpolateArray.prototype.getResult = function (t) {
        for (var i = 0; i < this._x.length; ++i) {
            this._c[i] = this._x[i](t);
        }
        return this._c;
    };
    return InterpolateArray;
}());
exports.InterpolateArray = InterpolateArray;
//# sourceMappingURL=array.js.map