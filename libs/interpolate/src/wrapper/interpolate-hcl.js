"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hcl_1 = require("../interpolate/hcl");
function interpolateHcl(start, end) {
    return function (t) {
        return new hcl_1.InterpolateHcl().interpolate(start, end).getResult(t);
    };
}
exports.interpolateHcl = interpolateHcl;
function interpolateHclLong(start, end) {
    return function (t) {
        return new hcl_1.InterpolateHclLong().interpolate(start, end).getResult(t);
    };
}
exports.interpolateHclLong = interpolateHclLong;
//# sourceMappingURL=interpolate-hcl.js.map