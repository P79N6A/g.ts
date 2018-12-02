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
var InterpolateHcl = /** @class */ (function () {
    function InterpolateHcl() {
    }
    InterpolateHcl.prototype.interpolate = function (start, end) {
        var _start = color_1.Hcl.create(start);
        var _end = color_1.Hcl.create(end);
        this.h = new hue_1.InterpolateHue().interpolate(_start.h, _end.h);
        this.c = new color_2.InterpolateColor().interpolate(_start.c, _end.c);
        this.l = new color_2.InterpolateColor().interpolate(_start.l, _end.l);
        this.opacity = new color_2.InterpolateColor().interpolate(_start.opacity, _end.opacity);
        return this;
    };
    InterpolateHcl.prototype.getResult = function (t) {
        return new color_1.Hcl(this.h.getResult(t), this.c.getResult(t), this.l.getResult(t), this.opacity.getResult(t));
    };
    return InterpolateHcl;
}());
exports.InterpolateHcl = InterpolateHcl;
var InterpolateHclLong = /** @class */ (function (_super) {
    __extends(InterpolateHclLong, _super);
    function InterpolateHclLong() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InterpolateHclLong.prototype.interpolate = function (start, end) {
        var _start = color_1.Hcl.create(start);
        var _end = color_1.Hcl.create(end);
        this.h = new color_2.InterpolateColor().interpolate(_start.h, _end.h);
        this.c = new color_2.InterpolateColor().interpolate(_start.c, _end.c);
        this.l = new color_2.InterpolateColor().interpolate(_start.l, _end.l);
        this.opacity = new color_2.InterpolateColor().interpolate(_start.opacity, _end.opacity);
        return this;
    };
    return InterpolateHclLong;
}(InterpolateHcl));
exports.InterpolateHclLong = InterpolateHclLong;
//# sourceMappingURL=hcl.js.map