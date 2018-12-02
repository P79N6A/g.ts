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
var array_1 = require("../interpolate/array");
var constant_1 = require("../interpolate/constant");
var date_1 = require("../interpolate/date");
var number_1 = require("../interpolate/number");
var object_1 = require("../interpolate/object");
var rgb_1 = require("../interpolate/rgb");
var string_1 = require("../interpolate/string");
function interpolateValue(a, b) {
    return function (i) {
        var t = typeof b, c;
        if (b == null || t === 'boolean') {
            return new constant_1.InterpolateConstant(b).getResult(i);
        }
        else if (t === 'number') {
            return new number_1.InterpolateNumber().interpolate(+a, +b).getResult(i);
        }
        else if (t === 'string') {
            if (c = color_1.createColor(b)) {
                return new rgb_1.InterpolateRgb().interpolate(a, c).getResult(i);
            }
            else {
                return new string_1.InterpolateString().interpolate(a, b).getResult(i);
            }
        }
        else if (b instanceof color_1.Color) {
            return new rgb_1.InterpolateRgb().interpolate(a, b).getResult(i);
        }
        else if (b instanceof Date) {
            return new date_1.InterpolateDate().interpolate(a, b).getResult(i);
        }
        else if (Array.isArray(b)) {
            return new array_1.InterpolateArray().interpolate(a, b).getResult(i);
        }
        else if (typeof b.valueOf !== 'function' && typeof b.toString !== 'function' || isNaN(b)) {
            return new object_1.InterpolateObject().interpolate(a, b).getResult(i);
        }
        else {
            return new number_1.InterpolateNumber().interpolate(+a, +b).getResult(i);
        }
    };
}
exports.interpolateValue = interpolateValue;
//# sourceMappingURL=interpolate-value.js.map