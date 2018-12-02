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
var const_1 = require("./const");
var rgb_1 = require("./rgb");
var A = -0.14861, B = +1.78277, C = -0.29227, D = -0.90649, E = +1.97294, ED = E * D, EB = E * B, BC_DA = B * C - D * A;
var Cubehelix = /** @class */ (function (_super) {
    __extends(Cubehelix, _super);
    function Cubehelix(h, s, l, opacity) {
        if (opacity === void 0) { opacity = 1; }
        var _this = _super.call(this) || this;
        _this.h = h;
        _this.s = s;
        _this.l = l;
        _this.opacity = opacity;
        return _this;
    }
    Cubehelix.prototype.brighter = function (k) {
        k = k == null ? const_1.brighter : Math.pow(const_1.brighter, k);
        return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
    };
    Cubehelix.prototype.darker = function (k) {
        if (k === void 0) { k = 1; }
        k = k == null ? const_1.darker : Math.pow(const_1.darker, k);
        return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
    };
    Cubehelix.prototype.rgb = function () {
        var h = isNaN(this.h) ? 0 : (this.h + 120) * common_1.deg2rad, l = +this.l, a = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh = Math.cos(h), sinh = Math.sin(h);
        return new rgb_1.Rgb(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
    };
    Cubehelix.create = function (o) {
        if (o instanceof Cubehelix) {
            return new Cubehelix(o.h, o.s, o.l, o.opacity);
        }
        if (o instanceof color_1.Color) {
            o = o.rgb();
        }
        if (!(o instanceof rgb_1.Rgb)) {
            o = rgb_1.Rgb.create(o);
        }
        var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB), bl = b - l, k = (E * (g - l) - C * bl) / D, s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
        h = s ? Math.atan2(k, bl) * common_1.rad2deg - 120 : NaN;
        return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
    };
    return Cubehelix;
}(color_1.Color));
exports.Cubehelix = Cubehelix;
function cubehelix(h, s, l, opacity) {
    if (arguments.length === 1) {
        return Cubehelix.create(h);
    }
    return new Cubehelix(h, s, l, opacity);
}
exports.cubehelix = cubehelix;
//# sourceMappingURL=cubehelix.js.map