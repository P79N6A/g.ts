"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
var color_1 = require("@gradii/color");
var public_api_1 = require("../public-api");
var interpolate_rgb_1 = require("../src/wrapper/interpolate-rgb");
describe('test interpolate rgb', function () {
    it('interpolateRgb(a, b) converts a and b to RGB colors', function () {
        expect(public_api_1.interpolateRgb('steelblue', 'brown')(0) + '').toBe(color_1.rgb('steelblue') + '');
        expect(public_api_1.interpolateRgb('steelblue', color_1.Hsl.create('brown'))(1) + '').toBe(color_1.rgb('brown') + '');
        expect(public_api_1.interpolateRgb('steelblue', color_1.Rgb.create('brown'))(1) + '').toBe(color_1.rgb('brown') + '');
    });
    it('interpolateRgb(a, b) interpolates in RGB and returns an RGB string', function () {
        expect(public_api_1.interpolateRgb('steelblue', '#f00')(0.2) + '').toBe('rgb(107, 104, 144)');
        expect(public_api_1.interpolateRgb('rgba(70, 130, 180, 1)', 'rgba(255, 0, 0, 0.2)')(0.2) + '').toBe('rgba(107, 104, 144, 0.84)');
    });
    it('interpolateRgb(a, b) uses b’s channel value when a’s channel value is undefined', function () {
        expect(public_api_1.interpolateRgb(null, color_1.rgb(20, 40, 60))(0.5) + '').toBe(color_1.rgb(20, 40, 60) + '');
        expect(public_api_1.interpolateRgb(color_1.rgb(NaN, 20, 40), color_1.rgb(60, 80, 100))(0.5) + '').toBe(color_1.rgb(60, 50, 70) + '');
        expect(public_api_1.interpolateRgb(color_1.rgb(20, NaN, 40), color_1.rgb(60, 80, 100))(0.5) + '').toBe(color_1.rgb(40, 80, 70) + '');
        expect(public_api_1.interpolateRgb(color_1.rgb(20, 40, NaN), color_1.rgb(60, 80, 100))(0.5) + '').toBe(color_1.rgb(40, 60, 100) + '');
    });
    it('interpolateRgb(a, b) uses a’s channel value when b’s channel value is undefined', function () {
        expect(public_api_1.interpolateRgb(color_1.rgb(20, 40, 60), null)(0.5) + '').toBe(color_1.rgb(20, 40, 60) + '');
        expect(public_api_1.interpolateRgb(color_1.rgb(60, 80, 100), color_1.rgb(NaN, 20, 40))(0.5) + '').toBe(color_1.rgb(60, 50, 70) + '');
        expect(public_api_1.interpolateRgb(color_1.rgb(60, 80, 100), color_1.rgb(20, NaN, 40))(0.5) + '').toBe(color_1.rgb(40, 80, 70) + '');
        expect(public_api_1.interpolateRgb(color_1.rgb(60, 80, 100), color_1.rgb(20, 40, NaN))(0.5) + '').toBe(color_1.rgb(40, 60, 100) + '');
    });
    it('interpolateRgbFactory(3)(a, b) returns the expected values', function () {
        expect(interpolate_rgb_1.interpolateRgbFactory(3)('steelblue', '#f00')(0.2) + '').toBe('rgb(153, 121, 167)');
    });
    it('interpolateRgbFactory(3)(a, b) uses linear interpolation for opacity', function () {
        expect(interpolate_rgb_1.interpolateRgbFactory(3)('transparent', '#f00')(0.2) + '').toBe('rgba(255, 0, 0, 0.2)');
    });
    // it('interpolateRgb.gamma(g) coerces the specified gamma to a number', () => {
    //   expect(interpolateRgbFactory({valueOf() {return 3;}})('steelblue', '#f00')(0.2)).toBe('rgb(153, 121, 167)');
    // });
    it('interpolateRgb(a, b) is equivalent to interpolateRgb.gamma(1)(a, b)', function () {
        var i0 = interpolate_rgb_1.interpolateRgbFactory(1)('purple', 'orange'), i1 = public_api_1.interpolateRgb('purple', 'orange');
        expect(i1(0.0).toString()).toBe(i0(0.0).toString());
        expect(i1(0.2).toString()).toBe(i0(0.2).toString());
        expect(i1(0.4).toString()).toBe(i0(0.4).toString());
        expect(i1(0.6).toString()).toBe(i0(0.6).toString());
        expect(i1(0.8).toString()).toBe(i0(0.8).toString());
        expect(i1(1.0).toString()).toBe(i0(1.0).toString());
    });
});
//# sourceMappingURL=rgb.spec.js.map