"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function relativeError(calculated, correct) {
    if (typeof calculated == 'number' && typeof correct == 'number') {
        var diff = Math.abs(calculated - correct);
        return diff / correct;
    }
    return calculated.relativeError(correct);
}
exports.relativeError = relativeError;
function absoluteError(calculated, correct) {
    if (typeof calculated == 'number' && typeof correct == 'number') {
        var diff = Math.abs(calculated - correct);
        return diff;
    }
    return calculated.absoluteError(correct);
}
exports.absoluteError = absoluteError;
//# sourceMappingURL=error-helpers.js.map