"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matrix2_1 = require("../src/matrix2");
var vector2_1 = require("../src/vector2");
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2018 Google Inc. (https://github.com/google/vector_math.dart)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
var test_utils_1 = require("./test-utils");
describe('matrix2', function () {
    it('adjoint', function () {
        var input = [];
        var expectedOutput = [];
        input
            .push(test_utils_1.parseMatrix("0.830828627896291   0.549723608291140\n                               0.585264091152724   0.917193663829810"));
        expectedOutput
            .push(test_utils_1.parseMatrix(" 0.917193663829810  -0.549723608291140\n                               -0.585264091152724   0.830828627896291"));
        input
            .push(test_utils_1.parseMatrix("1    0\n                               0    1"));
        expectedOutput
            .push(test_utils_1.parseMatrix("1    0\n                               0    1"));
        expect(input.length === expectedOutput.length).toBe(true);
        for (var i = 0; i < input.length; i++) {
            var output = input[i].clone();
            output.scaleAdjoint(1);
            test_utils_1.relativeTest(output, expectedOutput[i]);
        }
    });
    it('determinant', function () {
        var input = [];
        var expectedOutput = [];
        input.push(test_utils_1.parseMatrix("0.830828627896291   0.549723608291140\n                                  0.585264091152724   0.917193663829810"));
        expectedOutput.push(0.440297265243183);
        expect(input.length == expectedOutput.length);
        for (var i = 0; i < input.length; i++) {
            var output = input[i].determinant();
            test_utils_1.relativeTest(output, expectedOutput[i]);
        }
    });
    it('transform', function () {
        var rot = matrix2_1.Matrix2.rotation(Math.PI / 4);
        var input = new vector2_1.Vector2(0.234245234259, 0.890723489233);
        var expected = new vector2_1.Vector2(rot.entry(0, 0) * input.x + rot.entry(0, 1) * input.y, rot.entry(1, 0) * input.x + rot.entry(1, 1) * input.y);
        var transExpected = new vector2_1.Vector2(rot.entry(0, 0) * input.x + rot.entry(1, 0) * input.y, rot.entry(0, 1) * input.x + rot.entry(1, 1) * input.y);
        test_utils_1.relativeTest(rot.transformed(input), expected);
        test_utils_1.relativeTest(rot.transposed().transformed(input), transExpected);
    });
    it('inversion', function () {
        var m = new matrix2_1.Matrix2(4, 3, 3, 2);
        var result = matrix2_1.Matrix2.zero();
        var det = result.copyInverse(m);
        expect(det).toBe(-1.0);
        expect(result.entry(0, 0)).toBe(-2.0);
        expect(result.entry(1, 0)).toBe(3.0);
        expect(result.entry(0, 1)).toBe(3.0);
        expect(result.entry(1, 1)).toBe(-4.0);
    });
    it('dot', function () {
        var matrix = new matrix2_1.Matrix2(1, 3, 2, 4);
        var v = new vector2_1.Vector2(3, 4);
        expect(matrix.dotRow(0, v)).toBe(15);
        expect(matrix.dotRow(1, v)).toBe(22);
        expect(matrix.dotColumn(0, v)).toBe(11);
        expect(matrix.dotColumn(1, v)).toBe(25);
    });
    it('scale', function () {
        var m = test_utils_1.parseMatrix("1  3\n                                          2  4");
        var n = m.scaled(2);
        expect(n.at(0)).toBe(2);
        expect(n.at(1)).toBe(6);
        expect(n.at(2)).toBe(4);
        expect(n.at(3)).toBe(8);
    });
    // it('solving', () => {
    //   expect(false).toBe(false)
    // })
    // it('equals', () => {
    // expect(false).toMatch()
    // });
    it('absolute', function () {
        var m = test_utils_1.parseMatrix("-1  -2\n                                         3  -4");
        var expected = test_utils_1.parseMatrix("1  2\n                                        3  4");
        var out = matrix2_1.Matrix2.zero();
        var result = matrix2_1.Matrix2.absolute(m, out);
        expect(result instanceof matrix2_1.Matrix2).toBe(true);
        test_utils_1.relativeTest(out, result);
        test_utils_1.relativeTest(out, expected);
    });
    it('add', function () {
        var input = [];
        var expectedOutput = [];
        var m = test_utils_1.parseMatrix("1   1\n                                 1   1");
        input
            .push(test_utils_1.parseMatrix("1   3\n                               4   5"));
        expectedOutput
            .push(test_utils_1.parseMatrix("2   4\n                               5   6"));
        expect(input.length == expectedOutput.length);
        for (var i = 0; i < input.length; i++) {
            var output = input[i].add(m);
            test_utils_1.relativeTest(output, expectedOutput[i]);
        }
    });
    it('sub', function () {
        var input = [];
        var expectedOutput = [];
        var m = test_utils_1.parseMatrix("1   1\n                                 1   1");
        input
            .push(test_utils_1.parseMatrix("2   4\n                               5   6"));
        expectedOutput
            .push(test_utils_1.parseMatrix("1   3\n                               4   5"));
        expect(input.length == expectedOutput.length);
        for (var i = 0; i < input.length; i++) {
            var output = input[i].sub(m);
            test_utils_1.relativeTest(output, expectedOutput[i]);
        }
    });
    it('multiply', function () {
        var input = [];
        var expectedOutput = [];
        var m = test_utils_1.parseMatrix("7   8\n                                 9   10");
        input
            .push(test_utils_1.parseMatrix("2   4\n                               5   6"));
        expectedOutput
            .push(test_utils_1.parseMatrix("50   56\n                               89  100"));
        expect(input.length == expectedOutput.length);
        for (var i = 0; i < input.length; i++) {
            var output = input[i].multiply(m);
            test_utils_1.relativeTest(output, expectedOutput[i]);
        }
    });
    it('transform', function () {
        var input = [];
        var expectedOutput = [];
        var v = test_utils_1.parseVector("7   8");
        input
            .push(test_utils_1.parseMatrix("2   4\n                               5   6"));
        expectedOutput
            .push(test_utils_1.parseVector("46  83"));
        expect(input.length == expectedOutput.length);
        for (var i = 0; i < input.length; i++) {
            var output = input[i].transform(v);
            test_utils_1.relativeTest(output, input[i]);
            test_utils_1.relativeTest(output, expectedOutput[i]);
        }
    });
    it('rotate', function () {
        var input = [];
        var expectedOutput = [];
        var r = Math.PI / 1.2;
        input
            .push(test_utils_1.parseMatrix("2   4\n                               5   6"));
        expectedOutput
            .push(test_utils_1.parseMatrix("0.267949  -4.4641\n                              -1.33013\t -7.69615"));
        expect(input.length == expectedOutput.length);
        var m = test_utils_1.parseMatrix("1  1\n                                 1  1");
        test_utils_1.relativeTest(m.clone().rotate(Math.PI / 2), new matrix2_1.Matrix2(1, -1, 1, -1));
        test_utils_1.relativeTest(m.clone().rotate(Math.PI / 4), new matrix2_1.Matrix2(Math.SQRT2, 0, Math.SQRT2, 0));
        test_utils_1.relativeTest(m.clone().rotate(Math.PI), new matrix2_1.Matrix2(-1, -1, -1, -1));
        for (var i = 0; i < input.length; i++) {
            var output = input[i].rotate(r);
            test_utils_1.relativeTest(output, input[i]);
            test_utils_1.relativeTest(output, expectedOutput[i]);
        }
    });
});
//# sourceMappingURL=matrix2.spec.js.map