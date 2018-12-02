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
var interpolate_cubehelix_1 = require("../src/wrapper/interpolate-cubehelix");
describe('test interpolate cubehelix', function () {
    it('interpolateCubehelix(a, b) converts a and b to Cubehelix colors', function () {
        expect(public_api_1.interpolateCubehelix('steelblue', 'brown')(0) + '').toBe(color_1.rgb('steelblue') + '');
        expect(public_api_1.interpolateCubehelix('steelblue', color_1.Hcl.create('brown'))(1) + '').toBe(color_1.rgb('brown') + '');
        expect(public_api_1.interpolateCubehelix('steelblue', color_1.Rgb.create('brown'))(1) + '').toBe(color_1.rgb('brown') + '');
    });
    it('interpolateCubehelix(a, b) interpolates in Cubehelix and returns an RGB string', function () {
        expect(public_api_1.interpolateCubehelix('steelblue', '#f00')(0.2) + '').toBe('rgb(88, 100, 218)');
        expect(public_api_1.interpolateCubehelix('rgba(70, 130, 180, 1)', 'rgba(255, 0, 0, 0.2)')(0.2) + '').toBe('rgba(88, 100, 218, 0.84)');
    });
    it('interpolateCubehelix.gamma(3)(a, b) returns the expected values', function () {
        expect(interpolate_cubehelix_1.interpolateCubehelixFactory(3)('steelblue', '#f00')(0.2) + '').toBe('rgb(96, 107, 228)');
    });
    it('interpolateCubehelix.gamma(g) coerces the specified gamma to a number', function () {
        expect(interpolate_cubehelix_1.interpolateCubehelixFactory(+{ valueOf: function () { return 3; } })('steelblue', '#f00')(0.2) + '').toBe('rgb(96, 107, 228)');
    });
    it('interpolateCubehelix(a, b) is equivalent to interpolateCubehelix.gamma(1)(a, b)', function () {
        var i0 = interpolate_cubehelix_1.interpolateCubehelixFactory(1)('purple', 'orange'), i1 = public_api_1.interpolateCubehelix('purple', 'orange');
        expect(i1(0.0)).toEqual(i0(0.0));
        expect(i1(0.2)).toEqual(i0(0.2));
        expect(i1(0.4)).toEqual(i0(0.4));
        expect(i1(0.6)).toEqual(i0(0.6));
        expect(i1(0.8)).toEqual(i0(0.8));
        expect(i1(1.0)).toEqual(i0(1.0));
    });
    it('interpolateCubehelix(a, b) uses the right path when interpolating hue difference greater than 180°', function () {
        var i = public_api_1.interpolateCubehelix('purple', 'orange');
        expect(i(0.0) + '').toBe('rgb(128, 0, 128)');
        expect(i(0.2) + '').toBe('rgb(63, 54, 234)');
        expect(i(0.4) + '').toBe('rgb(0, 151, 217)');
        expect(i(0.6) + '').toBe('rgb(0, 223, 83)');
        expect(i(0.8) + '').toBe('rgb(79, 219, 0)');
        expect(i(1.0) + '').toBe('rgb(255, 165, 0)');
    });
    it('interpolateCubehelix(a, b) uses a’s hue when b’s hue is undefined', function () {
        expect(public_api_1.interpolateCubehelix('#f60', color_1.cubehelix(NaN, NaN, 0))(0.5) + '').toBe('rgb(162, 41, 0)');
        expect(public_api_1.interpolateCubehelix('#6f0', color_1.cubehelix(NaN, NaN, 0))(0.5) + '').toBe('rgb(3, 173, 0)');
    });
    it('interpolateCubehelix(a, b) uses b’s hue when a’s hue is undefined', function () {
        expect(public_api_1.interpolateCubehelix(color_1.cubehelix(NaN, NaN, 0), '#f60')(0.5) + '').toBe('rgb(162, 41, 0)');
        expect(public_api_1.interpolateCubehelix(color_1.cubehelix(NaN, NaN, 0), '#6f0')(0.5) + '').toBe('rgb(3, 173, 0)');
    });
    it('interpolateCubehelix(a, b) uses a’s chroma when b’s chroma is undefined', function () {
        expect(public_api_1.interpolateCubehelix('#ccc', color_1.cubehelix(NaN, NaN, 0))(0.5) + '').toBe('rgb(102, 102, 102)');
        expect(public_api_1.interpolateCubehelix('#f00', color_1.cubehelix(NaN, NaN, 0))(0.5) + '').toBe('rgb(147, 0, 0)');
    });
    it('interpolateCubehelix(a, b) uses b’s chroma when a’s chroma is undefined', function () {
        expect(public_api_1.interpolateCubehelix(color_1.cubehelix(NaN, NaN, 0), '#ccc')(0.5) + '').toBe('rgb(102, 102, 102)');
        expect(public_api_1.interpolateCubehelix(color_1.cubehelix(NaN, NaN, 0), '#f00')(0.5) + '').toBe('rgb(147, 0, 0)');
    });
    it('interpolateCubehelix(a, b) uses b’s luminance when a’s luminance is undefined', function () {
        expect(public_api_1.interpolateCubehelix(null, color_1.cubehelix(20, 1.5, 0.5))(0.5) + '').toBe('rgb(248, 93, 0)');
    });
    it('interpolateCubehelix(a, b) uses a’s luminance when b’s luminance is undefined', function () {
        expect(public_api_1.interpolateCubehelix(color_1.cubehelix(20, 1.5, 0.5), null)(0.5) + '').toBe('rgb(248, 93, 0)');
    });
});
//# sourceMappingURL=cubehelix.spec.js.map