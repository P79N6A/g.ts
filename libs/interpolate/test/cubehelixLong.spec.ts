/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

let it = require('tape'),
    color = require('d3-color'),
    interpolate = require('../');

it('interpolateCubehelixLong(a, b) converts a and b to Cubehelix colors', function (test) {
  expect(interpolate.interpolateCubehelixLong('steelblue', 'brown')(0)).toBe( color.rgb('steelblue') + '');
  expect(interpolate.interpolateCubehelixLong('steelblue', color.hcl('brown'))(1)).toBe( color.rgb('brown') + '');
  expect(interpolate.interpolateCubehelixLong('steelblue', color.rgb('brown'))(1)).toBe( color.rgb('brown') + '');

});

it('interpolateCubehelixLong(a, b) interpolates in Cubehelix and returns an RGB string', function (test) {
  expect(interpolate.interpolateCubehelixLong('steelblue', '#f00')(0.2)).toBe( 'rgb(88, 100, 218)');
  expect(interpolate.interpolateCubehelixLong('rgba(70, 130, 180, 1)', 'rgba(255, 0, 0, 0.2)')(0.2)).toBe( 'rgba(88, 100, 218, 0.84)');

});

it('interpolateCubehelixLong.gamma(3)(a, b) returns the expected values', function (test) {
  expect(interpolate.interpolateCubehelixLong.gamma(3)('steelblue', '#f00')(0.2)).toBe( 'rgb(96, 107, 228)');

});

it('interpolateCubehelixLong.gamma(g) coerces the specified gamma to a number', function (test) {
  expect(interpolate.interpolateCubehelixLong.gamma({ valueOf() {return 3;} })('steelblue', '#f00')(0.2)).toBe( 'rgb(96, 107, 228)');

});

it('interpolateCubehelixLong(a, b) is equivalent to interpolateCubehelixLong.gamma(1)(a, b)', function (test) {
  let i0 = interpolate.interpolateCubehelixLong.gamma(1)('purple', 'orange'),
      i1 = interpolate.interpolateCubehelixLong('purple', 'orange');
  expect(i1(0.0)).toBe( i0(0.0));
  expect(i1(0.2)).toBe( i0(0.2));
  expect(i1(0.4)).toBe( i0(0.4));
  expect(i1(0.6)).toBe( i0(0.6));
  expect(i1(0.8)).toBe( i0(0.8));
  expect(i1(1.0)).toBe( i0(1.0));

});
it('interpolateCubehelixLong(a, b) uses the longest path when interpolating hue difference greater than 180°', function (test) {
  let i = interpolate.interpolateCubehelixLong('purple', 'orange');
  expect(i(0.0)).toBe( 'rgb(128, 0, 128)');
  expect(i(0.2)).toBe( 'rgb(63, 54, 234)');
  expect(i(0.4)).toBe( 'rgb(0, 151, 217)');
  expect(i(0.6)).toBe( 'rgb(0, 223, 83)');
  expect(i(0.8)).toBe( 'rgb(79, 219, 0)');
  expect(i(1.0)).toBe( 'rgb(255, 165, 0)');

});

it('interpolateCubehelixLong(a, b) uses a’s hue when b’s hue is undefined', function (test) {
  expect(interpolate.interpolateCubehelixLong('#f60', color.hcl(NaN, NaN, 0))(0.5)).toBe( 'rgb(162, 41, 0)');
  expect(interpolate.interpolateCubehelixLong('#6f0', color.hcl(NaN, NaN, 0))(0.5)).toBe( 'rgb(3, 173, 0)');

});

it('interpolateCubehelixLong(a, b) uses b’s hue when a’s hue is undefined', function (test) {
  expect(interpolate.interpolateCubehelixLong(color.hcl(NaN, NaN, 0), '#f60')(0.5)).toBe( 'rgb(162, 41, 0)');
  expect(interpolate.interpolateCubehelixLong(color.hcl(NaN, NaN, 0), '#6f0')(0.5)).toBe( 'rgb(3, 173, 0)');

});

it('interpolateCubehelixLong(a, b) uses a’s chroma when b’s chroma is undefined', function (test) {
  expect(interpolate.interpolateCubehelixLong('#ccc', color.hcl(NaN, NaN, 0))(0.5)).toBe( 'rgb(102, 102, 102)');
  expect(interpolate.interpolateCubehelixLong('#f00', color.hcl(NaN, NaN, 0))(0.5)).toBe( 'rgb(147, 0, 0)');

});

it('interpolateCubehelixLong(a, b) uses b’s chroma when a’s chroma is undefined', function (test) {
  expect(interpolate.interpolateCubehelixLong(color.hcl(NaN, NaN, 0), '#ccc')(0.5)).toBe( 'rgb(102, 102, 102)');
  expect(interpolate.interpolateCubehelixLong(color.hcl(NaN, NaN, 0), '#f00')(0.5)).toBe( 'rgb(147, 0, 0)');

});

it('interpolateCubehelixLong(a, b) uses b’s luminance when a’s luminance is undefined', function (test) {
  expect(interpolate.interpolateCubehelixLong(null, color.cubehelix(20, 1.5, 0.5))(0.5)).toBe( 'rgb(248, 93, 0)');

});

it('interpolateCubehelixLong(a, b) uses a’s luminance when b’s luminance is undefined', function (test) {
  expect(interpolate.interpolateCubehelixLong(color.cubehelix(20, 1.5, 0.5), null)(0.5)).toBe( 'rgb(248, 93, 0)');

});
