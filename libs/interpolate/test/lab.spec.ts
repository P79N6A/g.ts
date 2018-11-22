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

it('interpolateLab(a, b) converts a and b to Lab colors', function (test) {
  expect(interpolate.interpolateLab('steelblue', 'brown')(0)).toBe( color.rgb('steelblue') + '');
  expect(interpolate.interpolateLab('steelblue', color.hsl('brown'))(1)).toBe( color.rgb('brown') + '');
  expect(interpolate.interpolateLab('steelblue', color.rgb('brown'))(1)).toBe( color.rgb('brown') + '');

});

it('interpolateLab(a, b) interpolates in Lab and returns an RGB string', function (test) {
  expect(interpolate.interpolateLab('steelblue', '#f00')(0.2)).toBe( 'rgb(138, 119, 147)');
  expect(interpolate.interpolateLab('rgba(70, 130, 180, 1)', 'rgba(255, 0, 0, 0.2)')(0.2)).toBe( 'rgba(138, 119, 147, 0.84)');

});

it('interpolateLab(a, b) uses b’s channel value when a’s channel value is undefined', function (test) {
  expect(interpolate.interpolateLab(null, color.lab(20, 40, 60))(0.5)).toBe( color.lab(20, 40, 60) + '');
  expect(interpolate.interpolateLab(color.lab(NaN, 20, 40), color.lab(60, 80, 100))(0.5)).toBe( color.lab(60, 50, 70) + '');
  expect(interpolate.interpolateLab(color.lab(20, NaN, 40), color.lab(60, 80, 100))(0.5)).toBe( color.lab(40, 80, 70) + '');
  expect(interpolate.interpolateLab(color.lab(20, 40, NaN), color.lab(60, 80, 100))(0.5)).toBe( color.lab(40, 60, 100) + '');

});

it('interpolateLab(a, b) uses a’s channel value when b’s channel value is undefined', function (test) {
  expect(interpolate.interpolateLab(color.lab(20, 40, 60), null)(0.5)).toBe( color.lab(20, 40, 60) + '');
  expect(interpolate.interpolateLab(color.lab(60, 80, 100), color.lab(NaN, 20, 40))(0.5)).toBe( color.lab(60, 50, 70) + '');
  expect(interpolate.interpolateLab(color.lab(60, 80, 100), color.lab(20, NaN, 40))(0.5)).toBe( color.lab(40, 80, 70) + '');
  expect(interpolate.interpolateLab(color.lab(60, 80, 100), color.lab(20, 40, NaN))(0.5)).toBe( color.lab(40, 60, 100) + '');

});
