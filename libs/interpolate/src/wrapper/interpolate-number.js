"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var number_1 = require("../interpolate/number");
function interpolateNumber(start, end) {
    return function (t) {
        return new number_1.InterpolateNumber().interpolate(start, end).getResult(t);
    };
}
exports.interpolateNumber = interpolateNumber;
//# sourceMappingURL=interpolate-number.js.map