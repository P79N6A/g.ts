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
describe('test interpolate lab', function () {
    it('interpolateLab(a, b) converts a and b to Lab colors', function () {
        expect(public_api_1.interpolateLab('steelblue', 'brown')(0) + '').toBe(color_1.rgb('steelblue') + '');
        expect(public_api_1.interpolateLab('steelblue', color_1.hsl('brown'))(1) + '').toBe(color_1.rgb('brown') + '');
        expect(public_api_1.interpolateLab('steelblue', color_1.rgb('brown'))(1) + '').toBe(color_1.rgb('brown') + '');
    });
    it('interpolateLab(a, b) interpolates in Lab and returns an RGB string', function () {
        expect(public_api_1.interpolateLab('steelblue', '#f00')(0.2) + '').toBe('rgb(138, 119, 147)');
        expect(public_api_1.interpolateLab('rgba(70, 130, 180, 1)', 'rgba(255, 0, 0, 0.2)')(0.2) + '').toBe('rgba(138, 119, 147, 0.84)');
    });
    it('interpolateLab(a, b) uses b’s channel value when a’s channel value is undefined', function () {
        expect(public_api_1.interpolateLab(null, color_1.lab(20, 40, 60))(0.5) + '').toBe(color_1.lab(20, 40, 60) + '');
        expect(public_api_1.interpolateLab(color_1.lab(NaN, 20, 40), color_1.lab(60, 80, 100))(0.5) + '').toBe(color_1.lab(60, 50, 70) + '');
        expect(public_api_1.interpolateLab(color_1.lab(20, NaN, 40), color_1.lab(60, 80, 100))(0.5) + '').toBe(color_1.lab(40, 80, 70) + '');
        expect(public_api_1.interpolateLab(color_1.lab(20, 40, NaN), color_1.lab(60, 80, 100))(0.5) + '').toBe(color_1.lab(40, 60, 100) + '');
    });
    it('interpolateLab(a, b) uses a’s channel value when b’s channel value is undefined', function () {
        expect(public_api_1.interpolateLab(color_1.lab(20, 40, 60), null)(0.5) + '').toBe(color_1.lab(20, 40, 60) + '');
        expect(public_api_1.interpolateLab(color_1.lab(60, 80, 100), color_1.lab(NaN, 20, 40))(0.5) + '').toBe(color_1.lab(60, 50, 70) + '');
        expect(public_api_1.interpolateLab(color_1.lab(60, 80, 100), color_1.lab(20, NaN, 40))(0.5) + '').toBe(color_1.lab(40, 80, 70) + '');
        expect(public_api_1.interpolateLab(color_1.lab(60, 80, 100), color_1.lab(20, 40, NaN))(0.5) + '').toBe(color_1.lab(40, 60, 100) + '');
    });
});
//# sourceMappingURL=lab.spec.js.map