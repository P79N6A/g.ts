"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cubehelix_1 = require("../interpolate/cubehelix");
function interpolateCubehelixFactory(gramma) {
    return function (start, end) {
        return function (t) {
            return new cubehelix_1.InterpolateCubehelix(gramma).interpolate(start, end).getResult(t);
        };
    };
}
exports.interpolateCubehelixFactory = interpolateCubehelixFactory;
function interpolateCubehelixLongFactory(gramma) {
    return function (start, end) {
        return function (t) {
            return new cubehelix_1.InterpolateCubehelixLong(gramma).interpolate(start, end).getResult(t);
        };
    };
}
exports.interpolateCubehelixLongFactory = interpolateCubehelixLongFactory;
function interpolateCubehelix(start, end, gramma) {
    return function (t) {
        return new cubehelix_1.InterpolateCubehelix(gramma).interpolate(start, end).getResult(t);
    };
}
exports.interpolateCubehelix = interpolateCubehelix;
function interpolateCubehelixLong(start, end, gramma) {
    return function (t) {
        return new cubehelix_1.InterpolateCubehelixLong(gramma).interpolate(start, end).getResult(t);
    };
}
exports.interpolateCubehelixLong = interpolateCubehelixLong;
//# sourceMappingURL=interpolate-cubehelix.js.map