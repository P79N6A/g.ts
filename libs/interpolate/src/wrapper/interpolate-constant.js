"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("../interpolate/constant");
function interpolateConstant(x) {
    return function (t) {
        return new constant_1.InterpolateConstant(x).getResult(t);
    };
}
exports.interpolateConstant = interpolateConstant;
//# sourceMappingURL=interpolate-constant.js.map