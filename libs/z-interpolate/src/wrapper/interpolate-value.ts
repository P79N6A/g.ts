/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2010-2016 Mike Bostock (https://github.com/d3/d3-interpolate)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

import {Color} from '@gradii/z-color';
import {InterpolateArray} from '../interpolate/array';
import {InterpolateConstant} from '../interpolate/constant';
import {InterpolateDate} from '../interpolate/date';
import {InterpolateNumber} from '../interpolate/number';
import {InterpolateObject} from '../interpolate/object';
import {InterpolateRgb} from '../interpolate/rgb';
import {InterpolateString} from '../interpolate/string';

export function interpolateValue(a, b) {
  let t = typeof b, c;
  if (b === null || t === 'boolean') {
    return new InterpolateConstant(b);
  } else if (t === 'number') {
    return new InterpolateNumber().interpolate(a, b);
  } else if (t === 'string') {
    if (c = Color.create(b)) {
      return new InterpolateRgb().interpolate(a, c);
    } else {
      return new InterpolateString().interpolate(a, b);
    }
  } else if (b instanceof Color) {
    return new InterpolateRgb().interpolate(a, b);
  } else if (b instanceof Date) {
    return new InterpolateDate().interpolate(a, b);
  } else if (Array.isArray(b)) {
    return new InterpolateArray().interpolate(a, b);
  } else if (typeof b.valueOf !== 'function' && typeof b.toString !== 'function' || isNaN(b)) {
    return new InterpolateObject().interpolate(a, b);
  } else {
    return new InterpolateNumber().interpolate(a, b);
  }
}
