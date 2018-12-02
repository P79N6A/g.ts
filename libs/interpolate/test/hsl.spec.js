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
describe('test interpolate hsl', function () {
    it('interpolateHsl(a, b) converts a and b to HSL colors', function () {
        expect(public_api_1.interpolateHsl('steelblue', 'brown')(0) + '').toBe(color_1.rgb('steelblue') + '');
        expect(public_api_1.interpolateHsl('steelblue', color_1.hsl('brown'))(1) + '').toBe(color_1.rgb('brown') + '');
        expect(public_api_1.interpolateHsl('steelblue', color_1.rgb('brown'))(1) + '').toBe(color_1.rgb('brown') + '');
    });
    it('interpolateHsl(a, b) interpolates in HSL and returns an RGB string', function () {
        expect(public_api_1.interpolateHsl('steelblue', '#f00')(0.2) + '').toBe('rgb(56, 195, 162)');
        expect(public_api_1.interpolateHsl('rgba(70, 130, 180, 1)', 'rgba(255, 0, 0, 0.2)')(0.2) + '').toBe('rgba(56, 195, 162, 0.84)');
    });
    it('interpolateHsl(a, b) uses the negative path when interpolating hue', function () {
        var i = public_api_1.interpolateHsl('hsl(10,50%,50%)', 'hsl(-10,50%,50%)');
        expect(i(0.0) + '').toBe('rgb(191, 85, 64)');
        expect(i(0.2) + '').toBe('rgb(191, 77, 64)');
        expect(i(0.4) + '').toBe('rgb(191, 68, 64)');
        expect(i(0.6) + '').toBe('rgb(191, 64, 68)');
        expect(i(0.8) + '').toBe('rgb(191, 64, 77)');
        expect(i(1.0) + '').toBe('rgb(191, 64, 85)');
    });
    it('interpolateHsl(a, b) uses the linear path when interpolating hue', function () {
        var i = public_api_1.interpolateHsl('hsl(10,50%,50%)', 'hsl(350,50%,50%)');
        expect(i(0.0) + '').toBe('rgb(191, 85, 64)');
        expect(i(0.2) + '').toBe('rgb(153, 191, 64)');
        expect(i(0.4) + '').toBe('rgb(64, 191, 119)');
        expect(i(0.6) + '').toBe('rgb(64, 119, 191)');
        expect(i(0.8) + '').toBe('rgb(153, 64, 191)');
        expect(i(1.0) + '').toBe('rgb(191, 64, 85)');
    });
    it('interpolateHsl(a, b) uses a’s hue when b’s hue is undefined', function () {
        expect(public_api_1.interpolateHsl('#f60', '#000')(0.5) + '').toBe('rgb(128, 51, 0)');
        expect(public_api_1.interpolateHsl('#6f0', '#fff')(0.5) + '').toBe('rgb(179, 255, 128)');
    });
    it('interpolateHsl(a, b) uses b’s hue when a’s hue is undefined', function () {
        expect(public_api_1.interpolateHsl('#000', '#f60')(0.5) + '').toBe('rgb(128, 51, 0)');
        expect(public_api_1.interpolateHsl('#fff', '#6f0')(0.5) + '').toBe('rgb(179, 255, 128)');
    });
    it('interpolateHsl(a, b) uses a’s saturation when b’s saturation is undefined', function () {
        expect(public_api_1.interpolateHsl('#ccc', '#000')(0.5) + '').toBe('rgb(102, 102, 102)');
        expect(public_api_1.interpolateHsl('#f00', '#000')(0.5) + '').toBe('rgb(128, 0, 0)');
    });
    it('interpolateHsl(a, b) uses b’s saturation when a’s saturation is undefined', function () {
        expect(public_api_1.interpolateHsl('#000', '#ccc')(0.5) + '').toBe('rgb(102, 102, 102)');
        expect(public_api_1.interpolateHsl('#000', '#f00')(0.5) + '').toBe('rgb(128, 0, 0)');
    });
    it('interpolateHsl(a, b) uses b’s lightness when a’s lightness is undefined', function () {
        expect(public_api_1.interpolateHsl(null, color_1.hsl(20, 1.0, 0.5))(0.5) + '').toBe('rgb(255, 85, 0)');
    });
    it('interpolateHsl(a, b) uses a’s lightness when b’s lightness is undefined', function () {
        expect(public_api_1.interpolateHsl(color_1.hsl(20, 1.0, 0.5), null)(0.5) + '').toBe('rgb(255, 85, 0)');
    });
});
//# sourceMappingURL=hsl.spec.js.map