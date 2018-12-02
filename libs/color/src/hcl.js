"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable triple-equals
var color_1 = require("./color");
var common_1 = require("./common");
var lab_1 = require("./lab");
var K = 18;
var Hcl = /** @class */ (function (_super) {
    __extends(Hcl, _super);
    function Hcl(h, c, l, opacity) {
        if (opacity === void 0) { opacity = 1; }
        var _this = _super.call(this) || this;
        _this.h = h;
        _this.c = c;
        _this.l = l;
        _this.opacity = opacity;
        return _this;
    }
    Hcl.prototype.brighter = function (k) {
        if (k === void 0) { k = 1; }
        return new Hcl(this.h, this.c, this.l + K * k, this.opacity);
    };
    Hcl.prototype.darker = function (k) {
        if (k === void 0) { k = 1; }
        return new Hcl(this.h, this.c, this.l - K * k, this.opacity);
    };
    Hcl.prototype.rgb = function () {
        return lab_1.Lab.create(this).rgb();
    };
    Hcl.create = function (o) {
        if (o instanceof Hcl) {
            return new Hcl(o.h, o.c, o.l, o.opacity);
        }
        if (!(o instanceof lab_1.Lab)) {
            o = lab_1.Lab.create(o);
        }
        if (o.a === 0 && o.b === 0) {
            return new Hcl(NaN, 0, o.l, o.opacity);
        }
        var h = Math.atan2(o.b, o.a) * common_1.rad2deg;
        return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
    };
    return Hcl;
}(color_1.Color));
exports.Hcl = Hcl;
function hcl(h, c, l, opacity) {
    if (arguments.length === 1) {
        return Hcl.create(h);
    }
    return new Hcl(h, c, l, opacity);
}
exports.hcl = hcl;
//# sourceMappingURL=hcl.js.map