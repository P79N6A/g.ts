/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

let it = require('tape'),
    interpolate = require('../');

require('./inDelta');

it('interpolateNumber(a, b) interpolates between two numbers a and b', function (test) {
  let i = interpolate.interpolateNumber(10, 42);
  expect(i(0.0)).toBeInDelta( 10.0);
  expect(i(0.1)).toBeInDelta( 13.2);
  expect(i(0.2)).toBeInDelta( 16.4);
  expect(i(0.3)).toBeInDelta( 19.6);
  expect(i(0.4)).toBeInDelta( 22.8);
  expect(i(0.5)).toBeInDelta( 26.0);
  expect(i(0.6)).toBeInDelta( 29.2);
  expect(i(0.7)).toBeInDelta( 32.4);
  expect(i(0.8)).toBeInDelta( 35.6);
  expect(i(0.9)).toBeInDelta( 38.8);
  expect(i(1.0)).toBeInDelta( 42.0);

});
