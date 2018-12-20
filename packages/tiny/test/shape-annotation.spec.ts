/*
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 *
 */


import { ArcShape } from '../../g/common/src/arc.shape';
import { reflector } from '../../g/core/src/reflection/reflection';

describe('test shape annotation', () => {
  let s;

  beforeEach(() => {
    s = new ArcShape();
  });

  it('shape should create', () => {
    expect(s instanceof ArcShape).toBe(true)
  });

  it('read annotation arc shape', () => {
    const annotations = reflector.annotations(s);
    console.log(annotations);
  })

});
