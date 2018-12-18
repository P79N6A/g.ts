/*
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 *
 */

import { ArcShape } from '@gradii/g/common';

describe('test shape annotation', () => {
  let s;

  beforeEach(() => {
    s = new ArcShape()
  });

  it('shape should create', () => {
    expect(s instanceof ArcShape).toBe(true)
  });

});
