"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var piecewise_1 = require("../interpolate/piecewise");
function interpolatePiecewise(values, interpolate) {
    return function (t) {
        return new piecewise_1.InterpolatePiecewise(interpolate).interpolate(values).getResult(t);
    };
}
exports.interpolatePiecewise = interpolatePiecewise;
//# sourceMappingURL=interpolate-piecewise.js.map