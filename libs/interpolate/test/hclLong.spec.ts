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

it('interpolateHclLong(a, b) converts a and b to HCL colors', function (test) {
  expect(interpolate.interpolateHclLong('steelblue', 'brown')(0)).toBe( color.rgb('steelblue') + '');
  expect(interpolate.interpolateHclLong('steelblue', color.hcl('brown'))(1)).toBe( color.rgb('brown') + '');
  expect(interpolate.interpolateHclLong('steelblue', color.rgb('brown'))(1)).toBe( color.rgb('brown') + '');

});

it('interpolateHclLong(a, b) interpolates in HCL and returns an RGB string', function (test) {
  expect(interpolate.interpolateHclLong('steelblue', '#f00')(0.2)).toBe( 'rgb(0, 144, 174)');
  expect(interpolate.interpolateHclLong('rgba(70, 130, 180, 1)', 'rgba(255, 0, 0, 0.2)')(0.2)).toBe( 'rgba(0, 144, 174, 0.84)');

});

it('interpolateHclLong(a, b) does not use the shortest path when interpolating hue', function (test) {
  let i = interpolate.interpolateHclLong(color.hcl(10, 50, 50), color.hcl(350, 50, 50));
  expect(i(0.0)).toBe( 'rgb(196, 79, 106)');
  expect(i(0.2)).toBe( 'rgb(156, 111, 29)');
  expect(i(0.4)).toBe( 'rgb(46, 135, 69)');
  expect(i(0.6)).toBe( 'rgb(0, 138, 165)');
  expect(i(0.8)).toBe( 'rgb(67, 118, 202)');
  expect(i(1.0)).toBe( 'rgb(189, 81, 135)');

});

it('interpolateHclLong(a, b) uses a’s hue when b’s hue is undefined', function (test) {
  expect(interpolate.interpolateHclLong('#f60', color.hcl(NaN, NaN, 0))(0.5)).toBe( 'rgb(155, 0, 0)');
  expect(interpolate.interpolateHclLong('#6f0', color.hcl(NaN, NaN, 0))(0.5)).toBe( 'rgb(0, 129, 0)');

});

it('interpolateHclLong(a, b) uses b’s hue when a’s hue is undefined', function (test) {
  expect(interpolate.interpolateHclLong(color.hcl(NaN, NaN, 0), '#f60')(0.5)).toBe( 'rgb(155, 0, 0)');
  expect(interpolate.interpolateHclLong(color.hcl(NaN, NaN, 0), '#6f0')(0.5)).toBe( 'rgb(0, 129, 0)');

});

it('interpolateHclLong(a, b) uses a’s chroma when b’s chroma is undefined', function (test) {
  expect(interpolate.interpolateHclLong('#ccc', color.hcl(NaN, NaN, 0))(0.5)).toBe( 'rgb(97, 97, 97)');
  expect(interpolate.interpolateHclLong('#f00', color.hcl(NaN, NaN, 0))(0.5)).toBe( 'rgb(166, 0, 0)');

});

it('interpolateHclLong(a, b) uses b’s chroma when a’s chroma is undefined', function (test) {
  expect(interpolate.interpolateHclLong(color.hcl(NaN, NaN, 0), '#ccc')(0.5)).toBe( 'rgb(97, 97, 97)');
  expect(interpolate.interpolateHclLong(color.hcl(NaN, NaN, 0), '#f00')(0.5)).toBe( 'rgb(166, 0, 0)');

});

it('interpolateHclLong(a, b) uses b’s luminance when a’s luminance is undefined', function (test) {
  expect(interpolate.interpolateHclLong(null, color.hcl(20, 80, 50))(0.5)).toBe( 'rgb(234, 19, 77)');

});

it('interpolateHclLong(a, b) uses a’s luminance when b’s luminance is undefined', function (test) {
  expect(interpolate.interpolateHclLong(color.hcl(20, 80, 50), null)(0.5)).toBe( 'rgb(234, 19, 77)');

});
