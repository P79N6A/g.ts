"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var public_api_1 = require("../public-api");
describe('test interpolate array', function () {
    it('interpolateArray(a, b) interpolates defined elements in a and b', function () {
        expect(public_api_1.interpolateArray([2, 12], [4, 24])(0.5)).toEqual([3, 18]);
    });
    it('interpolateArray(a, b) interpolates nested objects and arrays', function () {
        expect(public_api_1.interpolateArray([[2, 12]], [[4, 24]])(0.5)).toEqual([[3, 18]]);
        expect(public_api_1.interpolateArray([{ foo: [2, 12] }], [{ foo: [4, 24] }])(0.5)).toEqual([{ foo: [3, 18] }]);
    });
    it('interpolateArray(a, b) ignores elements in a that are not in b', function () {
        expect(public_api_1.interpolateArray([2, 12, 12], [4, 24])(0.5)).toEqual([3, 18]);
    });
    it('interpolateArray(a, b) uses constant elements in b that are not in a', function () {
        expect(public_api_1.interpolateArray([2, 12], [4, 24, 12])(0.5)).toEqual([3, 18, 12]);
    });
    it('interpolateArray(a, b) treats undefined as an empty array', function () {
        expect(public_api_1.interpolateArray(undefined, [2, 12])(0.5)).toEqual([2, 12]);
        expect(public_api_1.interpolateArray([2, 12], undefined)(0.5)).toEqual([]);
        expect(public_api_1.interpolateArray(undefined, undefined)(0.5)).toEqual([]);
    });
    // it('interpolateArray(a, b) interpolates array-like objects', () => {
    //   let array = new Float64Array(2),
    //       args  = function (...args) {return args;}(2, 12);
    //   array[0]  = 2;
    //   array[1]  = 12;
    //   expect(interpolateArray(array, [4, 24])(0.5)).toEqual([3, 18]);
    //   expect(interpolateArray(args, [4, 24])(0.5)).toEqual([3, 18]);
    // });
});
//# sourceMappingURL=array.spec.js.map