"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var string_1 = require("../interpolate/string");
function interpolateString(a, b) {
    return function (t) {
        return new string_1.InterpolateString().interpolate(a, b).getResult(t);
    };
}
exports.interpolateString = interpolateString;
//# sourceMappingURL=interpolate-string.js.map