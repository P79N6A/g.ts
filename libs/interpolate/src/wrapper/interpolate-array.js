"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var array_1 = require("../interpolate/array");
function interpolateArray(a, b) {
    return function (t) {
        return new array_1.InterpolateArray().interpolate(a, b).getResult(t);
    };
}
exports.interpolateArray = interpolateArray;
//# sourceMappingURL=interpolate-array.js.map