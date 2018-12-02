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
var elastic_1 = require("../src/elastic");
var generic_1 = require("./generic");
describe('easing elastic test suit', function () {
    it('easeElasticIn(t) returns the expected results', function () {
        expect(__1.EasingElastic.easingIn.getRatio(0.0)).toBeCloseTo(-0.000488, 6);
        expect(__1.EasingElastic.easingIn.getRatio(0.1)).toBeCloseTo(+0.001953, 6);
        expect(__1.EasingElastic.easingIn.getRatio(0.2)).toBeCloseTo(-0.001953, 6);
        expect(__1.EasingElastic.easingIn.getRatio(0.3)).toBeCloseTo(-0.003906, 6);
        expect(__1.EasingElastic.easingIn.getRatio(0.4)).toBeCloseTo(+0.015625, 6);
        expect(__1.EasingElastic.easingIn.getRatio(0.5)).toBeCloseTo(-0.015625, 6);
        expect(__1.EasingElastic.easingIn.getRatio(0.6)).toBeCloseTo(-0.031250, 6);
        expect(__1.EasingElastic.easingIn.getRatio(0.7)).toBeCloseTo(+0.125000, 6);
        expect(__1.EasingElastic.easingIn.getRatio(0.8)).toBeCloseTo(-0.125000, 6);
        expect(__1.EasingElastic.easingIn.getRatio(0.9)).toBeCloseTo(-0.250000, 6);
        expect(__1.EasingElastic.easingIn.getRatio(1.0)).toBeCloseTo(+1.000000, 6);
    });
    it('easeElasticIn(t) is the same as elasticIn.amplitude(1).period(0.3)(t)', function () {
        var customEaseElasticIn = new elastic_1.ElasticIn(1, .3);
        expect(__1.EasingElastic.easingIn.getRatio(0.1)).toBe(customEaseElasticIn.getRatio(0.1));
        expect(__1.EasingElastic.easingIn.getRatio(0.2)).toBe(customEaseElasticIn.getRatio(0.2));
        expect(__1.EasingElastic.easingIn.getRatio(0.3)).toBe(customEaseElasticIn.getRatio(0.3));
    });
    it('easeElasticIn.amplitude(a)(t) is the same as elasticIn(t) if a <= 1', function () {
        expect(new elastic_1.ElasticIn(-1).getRatio(0.1)).toBeCloseTo(__1.EasingElastic.easingIn.getRatio(0.1));
        expect(new elastic_1.ElasticIn(+0.4).getRatio(0.2)).toBeCloseTo(__1.EasingElastic.easingIn.getRatio(0.2));
        expect(new elastic_1.ElasticIn(+0.8).getRatio(0.3)).toBeCloseTo(__1.EasingElastic.easingIn.getRatio(0.3));
    });
    it('easeElasticIn.amplitude(1.3)(t) returns the expected results', function () {
        expect(new elastic_1.ElasticIn(1.3).getRatio(0.0)).toBeCloseTo(+0.000214, 6);
        expect(new elastic_1.ElasticIn(1.3).getRatio(0.1)).toBeCloseTo(+0.001953, 6);
        expect(new elastic_1.ElasticIn(1.3).getRatio(0.2)).toBeCloseTo(-0.004763, 6);
        expect(new elastic_1.ElasticIn(1.3).getRatio(0.3)).toBeCloseTo(+0.001714, 6);
        expect(new elastic_1.ElasticIn(1.3).getRatio(0.4)).toBeCloseTo(+0.015625, 6);
        expect(new elastic_1.ElasticIn(1.3).getRatio(0.5)).toBeCloseTo(-0.038105, 6);
        expect(new elastic_1.ElasticIn(1.3).getRatio(0.6)).toBeCloseTo(+0.013711, 6);
        expect(new elastic_1.ElasticIn(1.3).getRatio(0.7)).toBeCloseTo(+0.125000, 6);
        expect(new elastic_1.ElasticIn(1.3).getRatio(0.8)).toBeCloseTo(-0.304844, 6);
        expect(new elastic_1.ElasticIn(1.3).getRatio(0.9)).toBeCloseTo(+0.109687, 6);
        expect(new elastic_1.ElasticIn(1.3).getRatio(1.0)).toBeCloseTo(+1.000000, 6);
    });
    it('easeElasticIn.amplitude(1.5).period(1)(t) returns the expected results', function () {
        expect(new elastic_1.ElasticIn(1.5, 1).getRatio(0.0)).toBeCloseTo(+0.000977, 6);
        expect(new elastic_1.ElasticIn(1.5, 1).getRatio(0.1)).toBeCloseTo(+0.000297, 6);
        expect(new elastic_1.ElasticIn(1.5, 1).getRatio(0.2)).toBeCloseTo(-0.002946, 6);
        expect(new elastic_1.ElasticIn(1.5, 1).getRatio(0.3)).toBeCloseTo(-0.010721, 6);
        expect(new elastic_1.ElasticIn(1.5, 1).getRatio(0.4)).toBeCloseTo(-0.022909, 6);
        expect(new elastic_1.ElasticIn(1.5, 1).getRatio(0.5)).toBeCloseTo(-0.031250, 6);
        expect(new elastic_1.ElasticIn(1.5, 1).getRatio(0.6)).toBeCloseTo(-0.009491, 6);
        expect(new elastic_1.ElasticIn(1.5, 1).getRatio(0.7)).toBeCloseTo(+0.094287, 6);
        expect(new elastic_1.ElasticIn(1.5, 1).getRatio(0.8)).toBeCloseTo(+0.343083, 6);
        expect(new elastic_1.ElasticIn(1.5, 1).getRatio(0.9)).toBeCloseTo(+0.733090, 6);
        expect(new elastic_1.ElasticIn(1.5, 1).getRatio(1.0)).toBeCloseTo(+1.000000, 6);
    });
    it('easeElasticOut(t) returns the expected results', function () {
        var genericEaseOut = generic_1.genericOut(function (t) { return __1.EasingElastic.easingIn.getRatio(t); });
        expect(__1.EasingElastic.easingOut.getRatio(0.0)).toBeCloseTo(genericEaseOut(0.0));
        expect(__1.EasingElastic.easingOut.getRatio(0.1)).toBeCloseTo(genericEaseOut(0.1));
        expect(__1.EasingElastic.easingOut.getRatio(0.2)).toBeCloseTo(genericEaseOut(0.2));
        expect(__1.EasingElastic.easingOut.getRatio(0.3)).toBeCloseTo(genericEaseOut(0.3));
        expect(__1.EasingElastic.easingOut.getRatio(0.4)).toBeCloseTo(genericEaseOut(0.4));
        expect(__1.EasingElastic.easingOut.getRatio(0.5)).toBeCloseTo(genericEaseOut(0.5));
        expect(__1.EasingElastic.easingOut.getRatio(0.6)).toBeCloseTo(genericEaseOut(0.6));
        expect(__1.EasingElastic.easingOut.getRatio(0.7)).toBeCloseTo(genericEaseOut(0.7));
        expect(__1.EasingElastic.easingOut.getRatio(0.8)).toBeCloseTo(genericEaseOut(0.8));
        expect(__1.EasingElastic.easingOut.getRatio(0.9)).toBeCloseTo(genericEaseOut(0.9));
        expect(__1.EasingElastic.easingOut.getRatio(1.0)).toBeCloseTo(genericEaseOut(1.0));
    });
    it('easeElasticInOut(t) returns the expected results', function () {
        var genericEaseInOut = generic_1.genericInOut(function (t) { return __1.EasingElastic.easingIn.getRatio(t); });
        expect(__1.EasingElastic.easingInOut.getRatio(0.0)).toBeCloseTo(genericEaseInOut(0.0));
        expect(__1.EasingElastic.easingInOut.getRatio(0.1)).toBeCloseTo(genericEaseInOut(0.1));
        expect(__1.EasingElastic.easingInOut.getRatio(0.2)).toBeCloseTo(genericEaseInOut(0.2));
        expect(__1.EasingElastic.easingInOut.getRatio(0.3)).toBeCloseTo(genericEaseInOut(0.3));
        expect(__1.EasingElastic.easingInOut.getRatio(0.4)).toBeCloseTo(genericEaseInOut(0.4));
        expect(__1.EasingElastic.easingInOut.getRatio(0.5)).toBeCloseTo(genericEaseInOut(0.5));
        expect(__1.EasingElastic.easingInOut.getRatio(0.6)).toBeCloseTo(genericEaseInOut(0.6));
        expect(__1.EasingElastic.easingInOut.getRatio(0.7)).toBeCloseTo(genericEaseInOut(0.7));
        expect(__1.EasingElastic.easingInOut.getRatio(0.8)).toBeCloseTo(genericEaseInOut(0.8));
        expect(__1.EasingElastic.easingInOut.getRatio(0.9)).toBeCloseTo(genericEaseInOut(0.9));
        expect(__1.EasingElastic.easingInOut.getRatio(1.0)).toBeCloseTo(genericEaseInOut(1.0));
    });
});
//# sourceMappingURL=elastic.spec.js.map