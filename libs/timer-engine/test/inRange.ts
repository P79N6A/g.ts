/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2010-2016 Mike Bostock (https://github.com/d3/d3-timer)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

let tape = require('tape');

tape.Test.prototype.inRange = function (actual, expectedMin, expectedMax) {
  this._assert(expectedMin <= actual && actual <= expectedMax, {
    message: 'should be in range',
    operator: 'inRange',
    actual,
    expected: [expectedMin, expectedMax],
  });
};
