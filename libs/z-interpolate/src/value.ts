/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2010-2016 Mike Bostock (https://github.com/d3/d3-interpolate)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

import {color} from 'd3-color';
import {interpolateArray} from './array';
import {interpolateConstant} from './constant';
import {interpolateDate} from './date';
import {interpolateNumber} from './number';
import {interpolateObject} from './object';
import {interpolateRgb} from './rgb';
import {interpolateString} from './string';

export function interpolateValue(a, b) {
  let t = typeof b, c;
  if (b === null || t === 'boolean') {
    return interpolateConstant(b);
  } else if (t === 'number') {
    return interpolateNumber(a, b);
  } else if (t === 'string') {
    return (c = color(b)) ? (b = c, interpolateRgb) : interpolateString;
  } else if (b instanceof color) {
    return interpolateRgb;
  } else if (b instanceof Date) {
    return interpolateDate;
  } else if (Array.isArray(b)) {
    return interpolateArray;
  } else if (typeof b.valueOf !== 'function' && typeof b.toString !== 'function' || isNaN(b)) {
    return interpolateObject;
  } else {
    return interpolateNumber(a, b);
  }
}
