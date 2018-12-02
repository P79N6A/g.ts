"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hcl_1 = require("../src/hcl");
var hsl_1 = require("../src/hsl");
var rgb_1 = require("../src/rgb");
function expectEqualRgb(rgb1, rgb2) {
    expect(rgb1.hex()).toBe(rgb2.hex());
    // expect(rgb1.r).toBe(rgb2.r);
    // expect(rgb1.g).toBe(rgb2.g);
    // expect(rgb1.b).toBe(rgb2.b);
}
exports.expectEqualRgb = expectEqualRgb;
function expectEqualRgba(rgba1, rgba2) {
    expect(rgba1.toString()).toBe(rgba2.toString());
}
exports.expectEqualRgba = expectEqualRgba;
function rgbEqual(actual, r, g, b, opacity) {
    expect(actual instanceof rgb_1.Rgb
        && (isNaN(r) ? isNaN(actual.r) && actual.r !== actual.r : Math.round(actual.r) === Math.round(r))
        && (isNaN(g) ? isNaN(actual.g) && actual.g !== actual.g : Math.round(actual.g) === Math.round(g))
        && (isNaN(b) ? isNaN(actual.b) && actual.b !== actual.b : Math.round(actual.b) === Math.round(b))
        && (isNaN(opacity) ? isNaN(actual.opacity) && actual.opacity !== actual.opacity : actual.opacity === opacity)).toBe(true);
    expect([Math.round(actual.r), Math.round(actual.g), Math.round(actual.b), actual.opacity])
        .toEqual([Math.round(r), Math.round(g), Math.round(b), opacity]);
}
exports.rgbEqual = rgbEqual;
function rgbStrictEqual(actual, r, g, b, opacity) {
    var equal = actual instanceof rgb_1.Rgb
        && (isNaN(r) ? isNaN(actual.r) /*&& actual.r !== actual.r*/ : actual.r === r)
        && (isNaN(g) ? isNaN(actual.g) /*&& actual.g !== actual.g*/ : actual.g === g)
        && (isNaN(b) ? isNaN(actual.b) /*&& actual.b !== actual.b*/ : actual.b === b)
        && (isNaN(opacity) ? isNaN(actual.opacity) /*&& actual.opacity !== actual.opacity*/ : actual.opacity === opacity);
    expect(equal).toBe(true);
    if (!equal) {
        expect([actual.r, actual.g, actual.b, actual.opacity]).toEqual([r, g, b, opacity]);
    }
}
exports.rgbStrictEqual = rgbStrictEqual;
function hslEqual(actual, h, s, l, opacity) {
    var equal = actual instanceof hsl_1.Hsl
        && (isNaN(h) ? isNaN(actual.h) /*&& actual.h !== actual.h*/ : h - 1e-6 <= actual.h && actual.h <= h + 1e-6)
        && (isNaN(s) ? isNaN(actual.s) /*&& actual.s !== actual.s*/ : s - 1e-6 <= actual.s && actual.s <= s + 1e-6)
        && (isNaN(l) ? isNaN(actual.l) /*&& actual.l !== actual.l*/ : l - 1e-6 <= actual.l && actual.l <= l + 1e-6)
        && (isNaN(opacity) ? isNaN(actual.opacity) /*&& actual.opacity !== actual.opacity*/ : actual.opacity === opacity);
    expect(equal).toBe(true);
    if (!equal) {
        expect([actual.h, actual.s, actual.l, actual.opacity]).toEqual([h, s, l, opacity]);
    }
}
exports.hslEqual = hslEqual;
function hclEqual(actual, h, c, l, opacity) {
    var equal = actual instanceof hcl_1.Hcl
        && (isNaN(h) ? isNaN(actual.h) /*&& actual.h !== actual.h*/ : h - 1e-6 <= actual.h && actual.h <= h + 1e-6)
        && (isNaN(c) ? isNaN(actual.c) /*&& actual.c !== actual.c*/ : c - 1e-6 <= actual.c && actual.c <= c + 1e-6)
        && (isNaN(l) ? isNaN(actual.l) /*&& actual.l !== actual.l*/ : l - 1e-6 <= actual.l && actual.l <= l + 1e-6)
        && (isNaN(opacity) ? isNaN(actual.opacity) /*&& actual.opacity !== actual.opacity*/ : actual.opacity === opacity);
    expect(equal).toBe(true);
    if (!equal) {
        expect([actual.h, actual.c, actual.l, actual.opacity]).toEqual([h, c, l, opacity]);
    }
}
exports.hclEqual = hclEqual;
//# sourceMappingURL=test-helper.js.map