"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("@gradii/color");
var color_2 = require("./color");
var hue_1 = require("./hue");
var InterpolateHsl = /** @class */ (function () {
    function InterpolateHsl() {
    }
    InterpolateHsl.prototype.interpolate = function (start, end) {
        var _start = color_1.Hsl.create(start);
        var _end = color_1.Hsl.create(end);
        this.h = new hue_1.InterpolateHue().interpolate(_start.h, _end.h);
        this.s = new color_2.InterpolateColor().interpolate(_start.s, _end.s);
        this.l = new color_2.InterpolateColor().interpolate(_start.l, _end.l);
        this.opacity = new color_2.InterpolateColor().interpolate(_start.opacity, _end.opacity);
        return this;
    };
    InterpolateHsl.prototype.getResult = function (t) {
        return new color_1.Hsl(this.h.getResult(t), this.s.getResult(t), this.l.getResult(t), this.opacity.getResult(t));
    };
    return InterpolateHsl;
}());
exports.InterpolateHsl = InterpolateHsl;
var InterpolateHslLong = /** @class */ (function (_super) {
    __extends(InterpolateHslLong, _super);
    function InterpolateHslLong() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InterpolateHslLong.prototype.interpolate = function (start, end) {
        var _start = color_1.Hsl.create(start);
        var _end = color_1.Hsl.create(end);
        this.h = new color_2.InterpolateColor().interpolate(_start.h, _end.h);
        this.s = new color_2.InterpolateColor().interpolate(_start.s, _end.s);
        this.l = new color_2.InterpolateColor().interpolate(_start.l, _end.l);
        this.opacity = new color_2.InterpolateColor().interpolate(_start.opacity, _end.opacity);
        return this;
    };
    return InterpolateHslLong;
}(InterpolateHsl));
exports.InterpolateHslLong = InterpolateHslLong;
//# sourceMappingURL=hsl.js.map