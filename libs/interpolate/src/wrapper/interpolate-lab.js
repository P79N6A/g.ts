"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lab_1 = require("../interpolate/lab");
function interpolateLab(start, end) {
    return function (t) {
        return new lab_1.InterpolateLab().interpolate(start, end).getResult(t);
    };
}
exports.interpolateLab = interpolateLab;
//# sourceMappingURL=interpolate-lab.js.map