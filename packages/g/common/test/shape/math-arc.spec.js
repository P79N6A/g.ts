"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
exports.__esModule = true;
var arc_1 = require("../../../src/math/arc");
describe('Arc math', function () {
    it('nearAngle', function () {
        var angle = Util.toRadian(20);
        var startAngle = Util.toRadian(0);
        var endAngle = Util.toRadian(90);
        expect(Util.isNumberEqual(Util.toDegree(arc_1.ArcMath.nearAngle(angle, startAngle, endAngle)), 20)).toBe(true);
    });
    it('nearAngle1', function () {
        var angle = Util.toRadian(-20);
        var startAngle = Util.toRadian(0);
        var endAngle = Util.toRadian(90);
        expect(Util.isNumberEqual(Util.toDegree(arc_1.ArcMath.nearAngle(angle, startAngle, endAngle)), 0)).toBe(true);
    });
    it('nearAngle2', function () {
        var angle = Util.toRadian(110);
        var startAngle = Util.toRadian(90);
        var endAngle = Util.toRadian(-30);
        expect(Util.isNumberEqual(Util.toDegree(arc_1.ArcMath.nearAngle(angle, startAngle, endAngle)), 110)).toBe(true);
    });
    it('nearAngle3', function () {
        var angle = Util.toRadian(110);
        var startAngle = Util.toRadian(90);
        var endAngle = Util.toRadian(-30);
        expect(Util.isNumberEqual(Util.toDegree(arc_1.ArcMath.nearAngle(angle, startAngle, endAngle)), 110)).toBe(true);
    });
    it('nearAngle4', function () {
        var angle = Util.toRadian(110);
        var startAngle = Util.toRadian(90);
        var endAngle = Util.toRadian(-30);
        expect(Util.isNumberEqual(Util.toDegree(arc_1.ArcMath.nearAngle(angle, startAngle, endAngle, true)), 90)).toBe(true);
    });
    // it('nearAngle', function() {
    //   const angle = Util.toRadian(30);
    //   const startAngle = Util.toRadian(0);
    //   const endAngle = Util.toRadian(360);
    // });
    it('arcProjectPoint', function () {
        expect(Util.isNumberEqual(arc_1.ArcMath.pointDistance(10, 10, 10, -Math.PI / 2, Math.PI / 2, false, 20, 0), Math.sqrt(2) * 10 - 10)).toBe(true);
    });
});
