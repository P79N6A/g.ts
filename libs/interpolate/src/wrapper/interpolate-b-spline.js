"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b_spline_1 = require("../interpolate/b-spline");
function interpolateBSpline(values) {
    return function (t) {
        return new b_spline_1.InterpolateBSpline().interpolate(values).getResult(t);
    };
}
exports.interpolateBSpline = interpolateBSpline;
//# sourceMappingURL=interpolate-b-spline.js.map