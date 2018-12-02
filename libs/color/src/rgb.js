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
var const_1 = require("./const");
var helper_1 = require("./helper");
var Rgb = /** @class */ (function (_super) {
    __extends(Rgb, _super);
    // @formatter:on
    function Rgb(r, g, b, opacity) {
        if (opacity === void 0) { opacity = 1; }
        var _this = _super.call(this) || this;
        _this.r = r;
        _this.g = g;
        _this.b = b;
        _this.opacity = opacity;
        return _this;
    }
    Object.defineProperty(Rgb.prototype, "r", {
        // @formatter:off
        get: function () { return this._r; },
        set: function (value) { this._r = helper_1.clamp(value, 0, 255); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rgb.prototype, "g", {
        get: function () { return this._g; },
        set: function (value) { this._g = helper_1.clamp(value, 0, 255); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rgb.prototype, "b", {
        get: function () { return this._b; },
        set: function (value) { this._b = helper_1.clamp(value, 0, 255); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rgb.prototype, "opacity", {
        get: function () { return this._opacity; },
        set: function (value) { this._opacity = helper_1.clamp(value, 0, 1); },
        enumerable: true,
        configurable: true
    });
    Rgb.prototype.brighter = function (k) {
        k = k == null ? const_1.brighter : Math.pow(const_1.brighter, k);
        return new Rgb(this._r * k, this._g * k, this._b * k, this.opacity);
    };
    Rgb.prototype.darker = function (k) {
        k = k == null ? const_1.darker : Math.pow(const_1.darker, k);
        return new Rgb(this._r * k, this._g * k, this._b * k, this.opacity);
    };
    Rgb.prototype.rgb = function () {
        return this;
    };
    // public displayable() {
    //   return (0 <= this._r && this._r <= 255)
    //     && (0 <= this._g && this._g <= 255)
    //     && (0 <= this._b && this._b <= 255)
    //     && (0 <= this.opacity && this.opacity <= 1);
    // }
    Rgb.prototype.hex = function () {
        return "#" + helper_1.hex(this._r) + helper_1.hex(this._g) + helper_1.hex(this._b);
    };
    Rgb.prototype.toString = function () {
        var a = this.opacity;
        a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
        return (a === 1 ? 'rgb(' : 'rgba(')
            + Math.max(0, Math.min(255, Math.round(this._r) || 0)) + ', '
            + Math.max(0, Math.min(255, Math.round(this._g) || 0)) + ', '
            + Math.max(0, Math.min(255, Math.round(this._b) || 0))
            + (a === 1 ? ')' : ', ' + a + ')');
    };
    Rgb.create = function (o) {
        if (!(o instanceof color_1.Color)) {
            o = helper_1.create(o);
        }
        if (!o) {
            return new Rgb;
        }
        o = o.rgb();
        return new Rgb(o.r, o._g, o.b, o.opacity);
    };
    return Rgb;
}(color_1.Color));
exports.Rgb = Rgb;
function rgbn(n) {
    return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}
exports.rgbn = rgbn;
function rgba(r, g, b, a) {
    if (a <= 0) {
        r = g = b = NaN;
    }
    return new Rgb(r, g, b, a);
}
exports.rgba = rgba;
function rgb(r, g, b, a) {
    if (arguments.length === 1) {
        return Rgb.create(r);
    }
    return new Rgb(r, g, b, a);
}
exports.rgb = rgb;
//# sourceMappingURL=rgb.js.map