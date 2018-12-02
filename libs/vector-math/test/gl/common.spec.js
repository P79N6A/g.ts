"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2018 Google Inc. (https://github.com/google/vector_math.dart)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*
* common.js unit test
*/
var common_1 = require("../../src/common");
describe('matrix', function () {
    var result;
    describe('toRadian', function () {
        beforeEach(function () {
            result = common_1.toRadian(180);
        });
        it('should return a value of 3.141592654(Math.PI)', function () {
            expect(result).toBeCloseTo(Math.PI);
        });
    });
    describe('equals', function () {
        var r0;
        var r1;
        var r2;
        beforeEach(function () {
            r0 = common_1.equals(1.0, 0.0);
            r1 = common_1.equals(1.0, 1.0);
            r2 = common_1.equals(1.0 + common_1.EPSILON / 2, 1.0);
        });
        it('should return false for different numbers', function () {
            expect(r0).toBe(false);
        });
        it('should return true for the same number', function () {
            expect(r1).toBe(true);
        });
        it('should return true for numbers that are close', function () {
            expect(r2).toBe(true);
        });
    });
});
//# sourceMappingURL=common.spec.js.map