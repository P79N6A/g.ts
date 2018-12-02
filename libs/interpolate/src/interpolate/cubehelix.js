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
var InterpolateCubehelix = /** @class */ (function () {
    function InterpolateCubehelix(gamma) {
        if (gamma === void 0) { gamma = 1; }
        this.gamma = gamma;
    }
    InterpolateCubehelix.prototype.interpolate = function (start, end) {
        var _start = color_1.Cubehelix.create(start);
        var _end = color_1.Cubehelix.create(end);
        this.h = new hue_1.InterpolateHue().interpolate(_start.h, _end.h);
        this.s = new color_2.InterpolateColor().interpolate(_start.s, _end.s);
        this.l = new color_2.InterpolateColor().interpolate(_start.l, _end.l);
        this.opacity = new color_2.InterpolateColor().interpolate(_start.opacity, _end.opacity);
        return this;
    };
    InterpolateCubehelix.prototype.getResult = function (t) {
        return new color_1.Cubehelix(this.h.getResult(t), this.s.getResult(t), this.l.getResult(Math.pow(t, this.gamma)), this.opacity.getResult(t));
    };
    return InterpolateCubehelix;
}());
exports.InterpolateCubehelix = InterpolateCubehelix;
var InterpolateCubehelixLong = /** @class */ (function (_super) {
    __extends(InterpolateCubehelixLong, _super);
    function InterpolateCubehelixLong(gamma) {
        return _super.call(this, gamma) || this;
    }
    InterpolateCubehelixLong.prototype.interpolate = function (start, end) {
        var _start = color_1.Cubehelix.create(start);
        var _end = color_1.Cubehelix.create(end);
        this.h = new color_2.InterpolateColor().interpolate(_start.h, _end.h);
        this.s = new color_2.InterpolateColor().interpolate(_start.s, _end.s);
        this.l = new color_2.InterpolateColor().interpolate(_start.l, _end.l);
        this.opacity = new color_2.InterpolateColor().interpolate(_start.opacity, _end.opacity);
        return this;
    };
    return InterpolateCubehelixLong;
}(InterpolateCubehelix));
exports.InterpolateCubehelixLong = InterpolateCubehelixLong;
//# sourceMappingURL=cubehelix.js.map