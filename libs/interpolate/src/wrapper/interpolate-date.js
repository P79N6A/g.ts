"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_1 = require("../interpolate/date");
function interpolateDate(start, end) {
    return function (t) {
        return new date_1.InterpolateDate().interpolate(start, end).getResult(t);
    };
}
exports.interpolateDate = interpolateDate;
//# sourceMappingURL=interpolate-date.js.map