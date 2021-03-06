/*
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 *
 */


import { ArcShape } from '@gradii/g/common';
import { reflector } from '../../g/core/src/di/reflection/reflection';

describe('test shape annotation', () => {
  let s;

  beforeEach(() => {
    s = new ArcShape();
  });

  it('shape should create', () => {
    expect(s instanceof ArcShape).toBeTruthy();
  });

  it('read annotation arc shape', () => {
    const annotations = reflector.annotations(s);
    expect(annotations instanceof Array).toBeTruthy();
  });

  it('read annotation arc shape no skip', () => {
    const annotations = reflector.annotations(s);
    expect(annotations instanceof Array).toBeTruthy();
  })


});
