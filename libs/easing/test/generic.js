"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is a test file for test easy function, whether is correct.
 * the formal easy function is a optimistic algorithm.
 */
function genericOut(easeIn) {
    return function (t) {
        return 1 - easeIn(1 - t);
    };
}
exports.genericOut = genericOut;
function genericInOut(easeIn) {
    return function (t) {
        return (t < 0.5 ? easeIn(t * 2) : (2 - easeIn((1 - t) * 2))) / 2;
    };
}
exports.genericInOut = genericInOut;
/**
 * following function is used for create a convenient easeIn Function
 */
function generateEasing(dummyCls) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return function (t) {
        var ins = dummyCls.constructor.apply(null, args);
        return ins.getRatio(t);
    };
}
exports.generateEasing = generateEasing;
//# sourceMappingURL=generic.js.map