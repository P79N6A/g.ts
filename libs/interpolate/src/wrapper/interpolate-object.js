"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var object_1 = require("../interpolate/object");
function interpolateObject(start, end) {
    return function (t) {
        return new object_1.InterpolateObject().interpolate(start, end).getResult(t);
    };
}
exports.interpolateObject = interpolateObject;
//# sourceMappingURL=interpolate-object.js.map