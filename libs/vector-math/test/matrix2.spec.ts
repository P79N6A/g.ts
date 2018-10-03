import { Matrix2 } from '../src/matrix2';
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2018 Google Inc. (https://github.com/google/vector_math.dart)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
import { parseMatrix, relativeTest } from '../testing/test-utils';

describe('matrix2', () => {
  it('adjoint', () => {
    let input          = [];
    let expectedOutput = [];

    input
      .push(parseMatrix(`0.830828627896291   0.549723608291140
                               0.585264091152724   0.917193663829810`));

    expectedOutput
      .push(parseMatrix(` 0.917193663829810  -0.549723608291140
                               -0.585264091152724   0.830828627896291`));

    input
      .push(parseMatrix(`1    0
                               0    1`));

    expectedOutput
      .push(parseMatrix(`1    0
                               0    1`));

    expect(input.length === expectedOutput.length).toBe(true);

    for (let i = 0; i < input.length; i++) {
      let output = input[i].clone();
      (output as Matrix2).scaleAdjoint(1);
      relativeTest(output, expectedOutput[i]);
    }
  });

  it('determinant', () => {
    let input          = [];
    let expectedOutput = [];

    input.push(parseMatrix(`0.830828627896291   0.549723608291140
                                  0.585264091152724   0.917193663829810`));
    expectedOutput.push(0.440297265243183);

    expect(input.length == expectedOutput.length);

    for (let i = 0; i < input.length; i++) {
        const output = input[i].determinant();
        relativeTest(output, expectedOutput[i]);
    }
  });
});
