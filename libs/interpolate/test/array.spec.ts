/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

describe('interpolateArray(a, b) interpolates defined elements in a and b', () => {
  expect(interpolate.interpolateArray([2, 12], [4, 24])(0.5)).toBeDeepEqual( [3, 18]);

});

describe('interpolateArray(a, b) interpolates nested objects and arrays', () => {
  expect(interpolate.interpolateArray([[2, 12]], [[4, 24]])(0.5)).toBeDeepEqual( [[3, 18]]);
  expect(interpolate.interpolateArray([{ foo: [2, 12] }], [{ foo: [4, 24] }])(0.5)).toBeDeepEqual( [{ foo: [3, 18] }]);

});

describe('interpolateArray(a, b) ignores elements in a that are not in b', () => {
  expect(interpolate.interpolateArray([2, 12, 12], [4, 24])(0.5)).toBeDeepEqual( [3, 18]);

});

describe('interpolateArray(a, b) uses constant elements in b that are not in a', () => {
  expect(interpolate.interpolateArray([2, 12], [4, 24, 12])(0.5)).toBeDeepEqual( [3, 18, 12]);

});

describe('interpolateArray(a, b) treats undefined as an empty array', () => {
  expect(interpolate.interpolateArray(undefined, [2, 12])(0.5)).toBeDeepEqual( [2, 12]);
  expect(interpolate.interpolateArray([2, 12], undefined)(0.5)).toBeDeepEqual( []);
  expect(interpolate.interpolateArray(undefined, undefined)(0.5)).toBeDeepEqual( []);

});

describe('interpolateArray(a, b) interpolates array-like objects', () => {
  let array = new Float64Array(2),
      args = function () {return arguments;}(2, 12);
  array[0] = 2;
  array[1] = 12;
  expect(interpolate.interpolateArray(array, [4, 24])(0.5)).toBeDeepEqual( [3, 18]);
  expect(interpolate.interpolateArray(args, [4, 24])(0.5)).toBeDeepEqual( [3, 18]);

});
