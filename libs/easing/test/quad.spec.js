"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
var __1 = require("..");
var generic_1 = require("./generic");
describe('easing quad test suit', function () {
    it('easeQuadIn(t) returns the expected results', function () {
        expect(__1.EasingQuad.easeIn.getRatio(0.0)).toBeCloseTo(0.00, 6);
        expect(__1.EasingQuad.easeIn.getRatio(0.1)).toBeCloseTo(0.01, 6);
        expect(__1.EasingQuad.easeIn.getRatio(0.2)).toBeCloseTo(0.04, 6);
        expect(__1.EasingQuad.easeIn.getRatio(0.3)).toBeCloseTo(0.09, 6);
        expect(__1.EasingQuad.easeIn.getRatio(0.4)).toBeCloseTo(0.16, 6);
        expect(__1.EasingQuad.easeIn.getRatio(0.5)).toBeCloseTo(0.25, 6);
        expect(__1.EasingQuad.easeIn.getRatio(0.6)).toBeCloseTo(0.36, 6);
        expect(__1.EasingQuad.easeIn.getRatio(0.7)).toBeCloseTo(0.49, 6);
        expect(__1.EasingQuad.easeIn.getRatio(0.8)).toBeCloseTo(0.64, 6);
        expect(__1.EasingQuad.easeIn.getRatio(0.9)).toBeCloseTo(0.81, 6);
        expect(__1.EasingQuad.easeIn.getRatio(1.0)).toBeCloseTo(1.00, 6);
    });
    it('easeQuadOut(t) returns the expected results', function () {
        var genericEaseOut = generic_1.genericOut(function (t) { return __1.EasingQuad.easeIn.getRatio(t); });
        expect(__1.EasingQuad.easeOut.getRatio(0.0)).toBeCloseTo(genericEaseOut(0.0), 6);
        expect(__1.EasingQuad.easeOut.getRatio(0.1)).toBeCloseTo(genericEaseOut(0.1), 6);
        expect(__1.EasingQuad.easeOut.getRatio(0.2)).toBeCloseTo(genericEaseOut(0.2), 6);
        expect(__1.EasingQuad.easeOut.getRatio(0.3)).toBeCloseTo(genericEaseOut(0.3), 6);
        expect(__1.EasingQuad.easeOut.getRatio(0.4)).toBeCloseTo(genericEaseOut(0.4), 6);
        expect(__1.EasingQuad.easeOut.getRatio(0.5)).toBeCloseTo(genericEaseOut(0.5), 6);
        expect(__1.EasingQuad.easeOut.getRatio(0.6)).toBeCloseTo(genericEaseOut(0.6), 6);
        expect(__1.EasingQuad.easeOut.getRatio(0.7)).toBeCloseTo(genericEaseOut(0.7), 6);
        expect(__1.EasingQuad.easeOut.getRatio(0.8)).toBeCloseTo(genericEaseOut(0.8), 6);
        expect(__1.EasingQuad.easeOut.getRatio(0.9)).toBeCloseTo(genericEaseOut(0.9), 6);
        expect(__1.EasingQuad.easeOut.getRatio(1.0)).toBeCloseTo(genericEaseOut(1.0), 6);
    });
    it('easeQuadInOut(t) returns the expected results', function () {
        var genericEaseInOut = generic_1.genericInOut(function (t) { return __1.EasingQuad.easeIn.getRatio(t); });
        expect(__1.EasingQuad.easeInOut.getRatio(0.0)).toBeCloseTo(genericEaseInOut(0.0), 6);
        expect(__1.EasingQuad.easeInOut.getRatio(0.1)).toBeCloseTo(genericEaseInOut(0.1), 6);
        expect(__1.EasingQuad.easeInOut.getRatio(0.2)).toBeCloseTo(genericEaseInOut(0.2), 6);
        expect(__1.EasingQuad.easeInOut.getRatio(0.3)).toBeCloseTo(genericEaseInOut(0.3), 6);
        expect(__1.EasingQuad.easeInOut.getRatio(0.4)).toBeCloseTo(genericEaseInOut(0.4), 6);
        expect(__1.EasingQuad.easeInOut.getRatio(0.5)).toBeCloseTo(genericEaseInOut(0.5), 6);
        expect(__1.EasingQuad.easeInOut.getRatio(0.6)).toBeCloseTo(genericEaseInOut(0.6), 6);
        expect(__1.EasingQuad.easeInOut.getRatio(0.7)).toBeCloseTo(genericEaseInOut(0.7), 6);
        expect(__1.EasingQuad.easeInOut.getRatio(0.8)).toBeCloseTo(genericEaseInOut(0.8), 6);
        expect(__1.EasingQuad.easeInOut.getRatio(0.9)).toBeCloseTo(genericEaseInOut(0.9), 6);
        expect(__1.EasingQuad.easeInOut.getRatio(1.0)).toBeCloseTo(genericEaseInOut(1.0), 6);
    });
});
//# sourceMappingURL=quad.spec.js.map