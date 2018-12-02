"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("../interpolate/color");
function interpolateColor(a, b) {
    return function (t) {
        return new color_1.InterpolateColor().interpolate(a, b).getResult(t);
    };
}
exports.interpolateColor = interpolateColor;
//# sourceMappingURL=interpolate-color.js.map