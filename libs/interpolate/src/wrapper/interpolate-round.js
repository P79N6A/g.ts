"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var round_1 = require("../interpolate/round");
function interpolateRound(a, b) {
    return function (t) {
        return new round_1.InterpolateRound().interpolate(a, b).getResult(t);
    };
}
exports.interpolateRound = interpolateRound;
//# sourceMappingURL=interpolate-round.js.map