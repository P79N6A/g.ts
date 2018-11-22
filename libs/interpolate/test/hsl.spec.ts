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

it('interpolateHsl(a, b) converts a and b to HSL colors', function (test) {
  expect(interpolate.interpolateHsl('steelblue', 'brown')(0)).toBe( color.rgb('steelblue') + '');
  expect(interpolate.interpolateHsl('steelblue', color.hsl('brown'))(1)).toBe( color.rgb('brown') + '');
  expect(interpolate.interpolateHsl('steelblue', color.rgb('brown'))(1)).toBe( color.rgb('brown') + '');

});

it('interpolateHsl(a, b) interpolates in HSL and returns an RGB string', function (test) {
  expect(interpolate.interpolateHsl('steelblue', '#f00')(0.2)).toBe( 'rgb(56, 61, 195)');
  expect(interpolate.interpolateHsl('rgba(70, 130, 180, 1)', 'rgba(255, 0, 0, 0.2)')(0.2)).toBe( 'rgba(56, 61, 195, 0.84)');

});

it('interpolateHsl(a, b) uses the shortest path when interpolating hue', function (test) {
  let i = interpolate.interpolateHsl('hsl(10,50%,50%)', 'hsl(350,50%,50%)');
  expect(i(0.0)).toBe( 'rgb(191, 85, 64)');
  expect(i(0.2)).toBe( 'rgb(191, 77, 64)');
  expect(i(0.4)).toBe( 'rgb(191, 68, 64)');
  expect(i(0.6)).toBe( 'rgb(191, 64, 68)');
  expect(i(0.8)).toBe( 'rgb(191, 64, 77)');
  expect(i(1.0)).toBe( 'rgb(191, 64, 85)');

});

it('interpolateHsl(a, b) uses a’s hue when b’s hue is undefined', function (test) {
  expect(interpolate.interpolateHsl('#f60', '#000')(0.5)).toBe( 'rgb(128, 51, 0)');
  expect(interpolate.interpolateHsl('#6f0', '#fff')(0.5)).toBe( 'rgb(179, 255, 128)');

});

it('interpolateHsl(a, b) uses b’s hue when a’s hue is undefined', function (test) {
  expect(interpolate.interpolateHsl('#000', '#f60')(0.5)).toBe( 'rgb(128, 51, 0)');
  expect(interpolate.interpolateHsl('#fff', '#6f0')(0.5)).toBe( 'rgb(179, 255, 128)');

});

it('interpolateHsl(a, b) uses a’s saturation when b’s saturation is undefined', function (test) {
  expect(interpolate.interpolateHsl('#ccc', '#000')(0.5)).toBe( 'rgb(102, 102, 102)');
  expect(interpolate.interpolateHsl('#f00', '#000')(0.5)).toBe( 'rgb(128, 0, 0)');

});

it('interpolateHsl(a, b) uses b’s saturation when a’s saturation is undefined', function (test) {
  expect(interpolate.interpolateHsl('#000', '#ccc')(0.5)).toBe( 'rgb(102, 102, 102)');
  expect(interpolate.interpolateHsl('#000', '#f00')(0.5)).toBe( 'rgb(128, 0, 0)');

});

it('interpolateHsl(a, b) uses b’s lightness when a’s lightness is undefined', function (test) {
  expect(interpolate.interpolateHsl(null, color.hsl(20, 1.0, 0.5))(0.5)).toBe( 'rgb(255, 85, 0)');

});

it('interpolateHsl(a, b) uses a’s lightness when b’s lightness is undefined', function (test) {
  expect(interpolate.interpolateHsl(color.hsl(20, 1.0, 0.5), null)(0.5)).toBe( 'rgb(255, 85, 0)');

});
