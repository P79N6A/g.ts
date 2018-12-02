"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = require("./const");
var hsl_1 = require("./hsl");
var rgb_1 = require("./rgb");
function hex(value) {
    value = Math.max(0, Math.min(255, Math.round(value) || 0));
    return value.toString(16).padStart(2, '0');
}
exports.hex = hex;
function create(format) {
    var m;
    format = ("" + format).trim().toLowerCase();
    if (m = const_1.reHex3.exec(format)) {
        m = parseInt(m[1], 16);
        return new rgb_1.Rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1);
    }
    else if (m = const_1.reHex6.exec(format)) {
        return rgb_1.rgbn(parseInt(m[1], 16));
    }
    else if (m = const_1.reRgbInteger.exec(format)) {
        return new rgb_1.Rgb(m[1], m[2], m[3], 1);
    }
    else if (m = const_1.reRgbPercent.exec(format)) {
        return new rgb_1.Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1);
    }
    else if (m = const_1.reRgbaInteger.exec(format)) {
        return rgb_1.rgba(m[1], m[2], m[3], m[4]);
    }
    else if (m = const_1.reRgbaPercent.exec(format)) {
        return rgb_1.rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]);
    }
    else if (m = const_1.reHslPercent.exec(format)) {
        return hsl_1.hsla(+m[1], m[2] / 100, m[3] / 100, 1);
    }
    else if (m = const_1.reHslaPercent.exec(format)) {
        return hsl_1.hsla(+m[1], m[2] / 100, m[3] / 100, +m[4]);
    }
    else if (const_1.named.hasOwnProperty(format)) {
        return rgb_1.rgbn(const_1.named[format]);
    }
    else if (format === 'transparent') {
        return new rgb_1.Rgb(NaN, NaN, NaN, 0);
    }
    return null;
}
exports.create = create;
function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}
exports.clamp = clamp;
//# sourceMappingURL=helper.js.map