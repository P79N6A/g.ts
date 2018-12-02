"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rgb_1 = require("../interpolate/rgb");
function interpolateRgb(start, end, gamma) {
    return function (t) {
        return new rgb_1.InterpolateRgb(gamma).interpolate(start, end).getResult(t);
    };
}
exports.interpolateRgb = interpolateRgb;
function interpolateRgbFactory(gamma) {
    return function (start, end) {
        return function (t) {
            return new rgb_1.InterpolateRgb(gamma).interpolate(start, end).getResult(t);
        };
    };
}
exports.interpolateRgbFactory = interpolateRgbFactory;
function interpolateRgbBSpline(colors) {
    return function (t) {
        return new rgb_1.InterpolateRgbBSpline().interpolate(colors).getResult(t);
    };
}
exports.interpolateRgbBSpline = interpolateRgbBSpline;
function interpolateRgbBSplineClosed(colors) {
    return function (t) {
        return new rgb_1.InterpolateRgbBSplineClosed().interpolate(colors).getResult(t);
    };
}
exports.interpolateRgbBSplineClosed = interpolateRgbBSplineClosed;
//# sourceMappingURL=interpolate-rgb.js.map