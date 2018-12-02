"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b_spline_closed_1 = require("../interpolate/b-spline-closed");
function interpolateBSplineClosed(values) {
    return function (t) {
        return new b_spline_closed_1.InterpolateBSplineClosed().interpolate(values).getResult(t);
    };
}
exports.interpolateBSplineClosed = interpolateBSplineClosed;
//# sourceMappingURL=interpolate-b-spline-closed.js.map