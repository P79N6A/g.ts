/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2018 Google Inc. (https://github.com/google/vector_math.dart)
 * Copyright (c) 2017-2018 Alipay inc.
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
var EPSILON = 0.00001;
beforeEach(function () {
    jasmine.addMatchers({
        toBeEqualish: function () {
            return {
                compare: function (actual, expected) {
                    if (typeof actual === 'number') {
                        return { pass: Math.abs(actual - expected) < EPSILON };
                    }
                    if (actual.length !== expected.length) {
                        return { pass: false };
                    }
                    for (var i = 0; i < actual.length; i++) {
                        if (isNaN(actual[i]) !== isNaN(expected[i])) {
                            return { pass: false };
                        }
                        if (Math.abs(actual[i] - expected[i]) >= EPSILON) {
                            return { pass: false };
                        }
                    }
                    return { pass: true };
                },
            };
        },
    });
});
//# sourceMappingURL=custom-matchers.spec.js.map