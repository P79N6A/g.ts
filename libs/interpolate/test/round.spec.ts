/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

let it = require('tape'),
    interpolate = require('../');

it('interpolateRound(a, b) interpolates between two numbers a and b, and then rounds', function (test) {
  let i = interpolate.interpolateRound(10, 42);
  expect(i(0.0)).toBeEqual( 10);
  expect(i(0.1)).toBeEqual( 13);
  expect(i(0.2)).toBeEqual( 16);
  expect(i(0.3)).toBeEqual( 20);
  expect(i(0.4)).toBeEqual( 23);
  expect(i(0.5)).toBeEqual( 26);
  expect(i(0.6)).toBeEqual( 29);
  expect(i(0.7)).toBeEqual( 32);
  expect(i(0.8)).toBeEqual( 36);
  expect(i(0.9)).toBeEqual( 39);
  expect(i(1.0)).toBeEqual( 42);

});

it('interpolateRound(a, b) does not pre-round a and b', function (test) {
  let i = interpolate.interpolateRound(2.6, 3.6);
  expect(i(0.6)).toBeEqual( 3);

});
