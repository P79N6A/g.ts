"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hsl_1 = require("../interpolate/hsl");
function interpolateHsl(start, end) {
    return function (t) {
        return new hsl_1.InterpolateHsl().interpolate(start, end).getResult(t);
    };
}
exports.interpolateHsl = interpolateHsl;
function interpolateHslLong(start, end) {
    return function (t) {
        return new hsl_1.InterpolateHslLong().interpolate(start, end).getResult(t);
    };
}
exports.interpolateHslLong = interpolateHslLong;
//# sourceMappingURL=interpolate-hsl.js.map