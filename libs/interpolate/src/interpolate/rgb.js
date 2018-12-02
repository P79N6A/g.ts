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
var b_spline_1 = require("./b-spline");
var b_spline_closed_1 = require("./b-spline-closed");
var color_2 = require("./color");
var InterpolateRgb = /** @class */ (function () {
    function InterpolateRgb(_gamma) {
        if (_gamma === void 0) { _gamma = 1; }
        this._gamma = _gamma;
    }
    InterpolateRgb.prototype.interpolate = function (start, end) {
        var _start = color_1.Rgb.create(start);
        var _end = color_1.Rgb.create(end);
        this.iR = new color_2.InterpolateColor(this._gamma).interpolate(_start.r, _end.r);
        this.iG = new color_2.InterpolateColor(this._gamma).interpolate(_start.g, _end.g);
        this.iB = new color_2.InterpolateColor(this._gamma).interpolate(_start.b, _end.b);
        this.iOpacity = new color_2.InterpolateColor().interpolate(_start.opacity, _end.opacity);
        return this;
    };
    InterpolateRgb.prototype.getResult = function (t) {
        return new color_1.Rgb(this.iR.getResult(t), this.iG.getResult(t), this.iB.getResult(t), this.iOpacity.getResult(t));
    };
    return InterpolateRgb;
}());
exports.InterpolateRgb = InterpolateRgb;
var InterpolateRgbBSpline = /** @class */ (function () {
    function InterpolateRgbBSpline() {
    }
    InterpolateRgbBSpline.prototype.interpolate = function (colors) {
        var n = colors.length;
        var r = new Array(n), g = new Array(n), b = new Array(n), i, color;
        for (i = 0; i < n; ++i) {
            color = color_1.Rgb.create(colors[i]);
            r[i] = color.r || 0;
            g[i] = color.g || 0;
            b[i] = color.b || 0;
        }
        this.sR = new b_spline_1.InterpolateBSpline().interpolate(r);
        this.sG = new b_spline_1.InterpolateBSpline().interpolate(g);
        this.sB = new b_spline_1.InterpolateBSpline().interpolate(b);
        return this;
    };
    InterpolateRgbBSpline.prototype.getResult = function (t) {
        return new color_1.Rgb(this.sR.getResult(t), this.sG.getResult(t), this.sB.getResult(t), 1);
    };
    return InterpolateRgbBSpline;
}());
exports.InterpolateRgbBSpline = InterpolateRgbBSpline;
var InterpolateRgbBSplineClosed = /** @class */ (function (_super) {
    __extends(InterpolateRgbBSplineClosed, _super);
    function InterpolateRgbBSplineClosed() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InterpolateRgbBSplineClosed.prototype.interpolate = function (colors) {
        var n = colors.length;
        var r = new Array(n), g = new Array(n), b = new Array(n), i, color;
        for (i = 0; i < n; ++i) {
            color = color_1.Rgb.create(colors[i]);
            r[i] = color.r || 0;
            g[i] = color.g || 0;
            b[i] = color.b || 0;
        }
        this.sR = new b_spline_closed_1.InterpolateBSplineClosed().interpolate(r);
        this.sG = new b_spline_closed_1.InterpolateBSplineClosed().interpolate(g);
        this.sB = new b_spline_closed_1.InterpolateBSplineClosed().interpolate(b);
        return this;
    };
    return InterpolateRgbBSplineClosed;
}(InterpolateRgbBSpline));
exports.InterpolateRgbBSplineClosed = InterpolateRgbBSplineClosed;
//# sourceMappingURL=rgb.js.map