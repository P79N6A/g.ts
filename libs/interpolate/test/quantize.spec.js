"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
var public_api_1 = require("../public-api");
describe('test interpolate quantize', function () {
    it('quantize(interpolate, n) returns n uniformly-spaced samples from the specified interpolator', function () {
        expect(public_api_1.quantize(public_api_1.interpolateNumber(0, 1), 5)).toEqual([
            0 / 4,
            1 / 4,
            2 / 4,
            3 / 4,
            4 / 4
        ]);
        expect(public_api_1.quantize(public_api_1.interpolateRgb('steelblue', 'brown'), 5).map(function (_) { return "" + _; })).toEqual([
            'rgb(70, 130, 180)',
            'rgb(94, 108, 146)',
            'rgb(118, 86, 111)',
            'rgb(141, 64, 77)',
            'rgb(165, 42, 42)'
        ]);
    });
});
//# sourceMappingURL=quantize.spec.js.map