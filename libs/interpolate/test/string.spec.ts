/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

let it = require('tape'),
    interpolate = require('../');

it('interpolateString(a, b) interpolates matching numbers in a and b', function (test) {
  expect(interpolate.interpolateString(' 10/20 30', '50/10 100 ')(0.2)).toBe( '18/18 44 ');
  expect(interpolate.interpolateString(' 10/20 30', '50/10 100 ')(0.4)).toBe( '26/16 58 ');

});

it('interpolateString(a, b) coerces a and b to strings', function (test) {
  expect(interpolate.interpolateString({ toString() {return '2px';} }, { toString() {return '12px';} })(0.25)).toBe( '4.5px');

});

it('interpolateString(a, b) preserves non-numbers in string b', function (test) {
  expect(interpolate.interpolateString(' 10/20 30', '50/10 foo ')(0.2)).toBe( '18/18 foo ');
  expect(interpolate.interpolateString(' 10/20 30', '50/10 foo ')(0.4)).toBe( '26/16 foo ');

});

it('interpolateString(a, b) preserves non-matching numbers in string b', function (test) {
  expect(interpolate.interpolateString(' 10/20 foo', '50/10 100 ')(0.2)).toBe( '18/18 100 ');
  expect(interpolate.interpolateString(' 10/20 bar', '50/10 100 ')(0.4)).toBe( '26/16 100 ');

});

it('interpolateString(a, b) preserves equal-value numbers in both strings', function (test) {
  expect(interpolate.interpolateString(' 10/20 100 20', '50/10 100, 20 ')(0.2)).toBe( '18/18 100, 20 ');
  expect(interpolate.interpolateString(' 10/20 100 20', '50/10 100, 20 ')(0.4)).toBe( '26/16 100, 20 ');

});

it('interpolateString(a, b) interpolates decimal notation correctly', function (test) {
  expect(interpolate.interpolateString('1.', '2.')(0.5)).toBe( '1.5');

});

it('interpolateString(a, b) interpolates exponent notation correctly', function (test) {
  expect(interpolate.interpolateString('1e+3', '1e+4')(0.5)).toBe( '5500');
  expect(interpolate.interpolateString('1e-3', '1e-4')(0.5)).toBe( '0.00055');
  expect(interpolate.interpolateString('1.e-3', '1.e-4')(0.5)).toBe( '0.00055');
  expect(interpolate.interpolateString('-1.e-3', '-1.e-4')(0.5)).toBe( '-0.00055');
  expect(interpolate.interpolateString('+1.e-3', '+1.e-4')(0.5)).toBe( '0.00055');
  expect(interpolate.interpolateString('.1e-2', '.1e-3')(0.5)).toBe( '0.00055');

});

it('interpolateString(a, b) with no numbers, returns the target string', function (test) {
  expect(interpolate.interpolateString('foo', 'bar')(0.5)).toBe( 'bar');
  expect(interpolate.interpolateString('foo', '')(0.5)).toBe( '');
  expect(interpolate.interpolateString('', 'bar')(0.5)).toBe( 'bar');
  expect(interpolate.interpolateString('', '')(0.5)).toBe( '');

});

it('interpolateString(a, b) with two numerically-equivalent numbers, returns the default format', function (test) {
  expect(interpolate.interpolateString('top: 1000px;', 'top: 1e3px;')(0.5)).toBe( 'top: 1000px;');
  expect(interpolate.interpolateString('top: 1e3px;', 'top: 1000px;')(0.5)).toBe( 'top: 1000px;');

});
