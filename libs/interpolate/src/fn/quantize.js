"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function quantize(interpolator, n) {
    var samples = new Array(n);
    for (var i = 0; i < n; ++i) {
        samples[i] = interpolator(i / (n - 1));
    }
    return samples;
}
exports.quantize = quantize;
function quantizeFactory(interpolateFactory, n) {
    var samples = new Array(n);
    for (var i = 0; i < n; ++i) {
        samples[i] = interpolateFactory.getResult(i / (n - 1));
    }
    return samples;
}
exports.quantizeFactory = quantizeFactory;
//# sourceMappingURL=quantize.js.map