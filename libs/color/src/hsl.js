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
var rgb_1 = require("./rgb");
function hsl2rgb(h, m1, m2) {
    return (h < 60
        ? m1 + (m2 - m1) * h / 60
        : h < 180
            ? m2
            : h < 240
                ? m1 + (m2 - m1) * (240 - h) / 60
                : m1) * 255;
}
var Hsl = /** @class */ (function (_super) {
    __extends(Hsl, _super);
    function Hsl(h, s, l, opacity) {
        if (opacity === void 0) { opacity = 1; }
        var _this = _super.call(this) || this;
        _this.h = h;
        _this.s = s;
        _this.l = l;
        _this.opacity = opacity;
        return _this;
    }
    Hsl.prototype.brighter = function (k) {
        k = k == null ? const_1.brighter : Math.pow(const_1.brighter, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
    };
    Hsl.prototype.darker = function (k) {
        k = k == null ? const_1.darker : Math.pow(const_1.darker, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
    };
    Hsl.prototype.rgb = function () {
        var h = this.h % 360 + (this.h < 0 ? 360 : 0), s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
        return new rgb_1.Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
    };
    Hsl.prototype.displayable = function () {
        return (0 <= this.s && this.s <= 1 || isNaN(this.s))
            && (0 <= this.l && this.l <= 1)
            && (0 <= this.opacity && this.opacity <= 1);
    };
    Hsl.create = function (o) {
        if (o instanceof Hsl) {
            return new Hsl(o.h, o.s, o.l, o.opacity);
        }
        if (!(o instanceof color_1.Color)) {
            o = helper_1.create(o);
        }
        if (!o) {
            return new Hsl;
        }
        if (o instanceof Hsl) {
            return o;
        }
        if (o instanceof color_1.Color) {
            o = o.rgb();
        }
        var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
        if (s) {
            if (r === max) {
                h = (g - b) / s + (g < b ? 6 : 0);
            }
            else if (g === max) {
                h = (b - r) / s + 2;
            }
            else {
                h = (r - g) / s + 4;
            }
            s /= l < 0.5 ? max + min : 2 - max - min;
            h *= 60;
        }
        else {
            s = l > 0 && l < 1 ? 0 : h;
        }
        return new Hsl(h, s, l, o.opacity);
    };
    return Hsl;
}(color_1.Color));
exports.Hsl = Hsl;
/**
 * @param h
 * @param s
 * @param l
 * @param a
 *
 * @internal
 */
function hsla(h, s, l, a) {
    if (a <= 0) {
        h = s = l = NaN;
    }
    else if (l <= 0 || l >= 1) {
        h = s = NaN;
    }
    else if (s <= 0) {
        h = NaN;
    }
    return new Hsl(h, s, l, a);
}
exports.hsla = hsla;
function hsl(h, s, l, a) {
    if (arguments.length === 1) {
        return Hsl.create(h);
    }
    return new Hsl(h, s, l, a);
}
exports.hsl = hsl;
//# sourceMappingURL=hsl.js.map