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
var color_2 = require("./color");
var InterpolateLab = /** @class */ (function () {
    function InterpolateLab() {
    }
    InterpolateLab.prototype.interpolate = function (start, end) {
        var _start = color_1.Lab.create(start);
        var _end = color_1.Lab.create(end);
        this.l = new color_2.InterpolateColor().interpolate(_start.l, _end.l);
        this.a = new color_2.InterpolateColor().interpolate(_start.a, _end.a);
        this.b = new color_2.InterpolateColor().interpolate(_start.b, _end.b);
        this.opacity = new color_2.InterpolateColor().interpolate(_start.opacity, _end.opacity);
        return this;
    };
    InterpolateLab.prototype.getResult = function (t) {
        return new color_1.Lab(this.l.getResult(t), this.a.getResult(t), this.b.getResult(t), this.opacity.getResult(t));
    };
    return InterpolateLab;
}());
exports.InterpolateLab = InterpolateLab;
//# sourceMappingURL=lab.js.map