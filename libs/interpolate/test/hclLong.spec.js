"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("@gradii/color");
var public_api_1 = require("../public-api");
describe('test interpolate hcl long', function () {
    it('interpolateHclLong(a, b) converts a and b to HCL colors', function () {
        expect(public_api_1.interpolateHclLong('steelblue', 'brown')(0) + '').toBe(color_1.rgb('steelblue') + '');
        expect(public_api_1.interpolateHclLong('steelblue', color_1.hcl('brown'))(1) + '').toBe(color_1.rgb('brown') + '');
        expect(public_api_1.interpolateHclLong('steelblue', color_1.rgb('brown'))(1) + '').toBe(color_1.rgb('brown') + '');
    });
    it('interpolateHclLong(a, b) interpolates in HCL and returns an RGB string', function () {
        expect(public_api_1.interpolateHclLong('steelblue', '#f00')(0.2) + '').toBe('rgb(0, 144, 174)');
        expect(public_api_1.interpolateHclLong('rgba(70, 130, 180, 1)', 'rgba(255, 0, 0, 0.2)')(0.2) + '').toBe('rgba(0, 144, 174, 0.84)');
    });
    it('interpolateHclLong(a, b) does not use the shortest path when interpolating hue', function () {
        var i = public_api_1.interpolateHclLong(color_1.hcl(10, 50, 50), color_1.hcl(350, 50, 50));
        expect(i(0.0) + '').toBe('rgb(196, 79, 106)');
        expect(i(0.2) + '').toBe('rgb(156, 111, 29)');
        expect(i(0.4) + '').toBe('rgb(46, 135, 69)');
        expect(i(0.6) + '').toBe('rgb(0, 138, 165)');
        expect(i(0.8) + '').toBe('rgb(67, 118, 202)');
        expect(i(1.0) + '').toBe('rgb(189, 81, 135)');
    });
    it('interpolateHclLong(a, b) uses a’s hue when b’s hue is undefined', function () {
        expect(public_api_1.interpolateHclLong('#f60', color_1.hcl(NaN, NaN, 0))(0.5) + '').toBe('rgb(155, 0, 0)');
        expect(public_api_1.interpolateHclLong('#6f0', color_1.hcl(NaN, NaN, 0))(0.5) + '').toBe('rgb(0, 129, 0)');
    });
    it('interpolateHclLong(a, b) uses b’s hue when a’s hue is undefined', function () {
        expect(public_api_1.interpolateHclLong(color_1.hcl(NaN, NaN, 0), '#f60')(0.5) + '').toBe('rgb(155, 0, 0)');
        expect(public_api_1.interpolateHclLong(color_1.hcl(NaN, NaN, 0), '#6f0')(0.5) + '').toBe('rgb(0, 129, 0)');
    });
    it('interpolateHclLong(a, b) uses a’s chroma when b’s chroma is undefined', function () {
        expect(public_api_1.interpolateHclLong('#ccc', color_1.hcl(NaN, NaN, 0))(0.5) + '').toBe('rgb(97, 97, 97)');
        expect(public_api_1.interpolateHclLong('#f00', color_1.hcl(NaN, NaN, 0))(0.5) + '').toBe('rgb(166, 0, 0)');
    });
    it('interpolateHclLong(a, b) uses b’s chroma when a’s chroma is undefined', function () {
        expect(public_api_1.interpolateHclLong(color_1.hcl(NaN, NaN, 0), '#ccc')(0.5) + '').toBe('rgb(97, 97, 97)');
        expect(public_api_1.interpolateHclLong(color_1.hcl(NaN, NaN, 0), '#f00')(0.5) + '').toBe('rgb(166, 0, 0)');
    });
    it('interpolateHclLong(a, b) uses b’s luminance when a’s luminance is undefined', function () {
        expect(public_api_1.interpolateHclLong(null, color_1.hcl(20, 80, 50))(0.5) + '').toBe('rgb(234, 19, 77)');
    });
    it('interpolateHclLong(a, b) uses a’s luminance when b’s luminance is undefined', function () {
        expect(public_api_1.interpolateHclLong(color_1.hcl(20, 80, 50), null)(0.5) + '').toBe('rgb(234, 19, 77)');
    });
});
//# sourceMappingURL=hclLong.spec.js.map